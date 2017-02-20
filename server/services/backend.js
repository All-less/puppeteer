const Promise = require('bluebird')

const BackendModel = require('../models/backend').model
const StepModel = require('../models/step').model
const grpcClient = require('../grpc')

// initialize information about all backends
Promise.coroutine(function* () {
  yield StepModel.remove()
  const backends = yield BackendModel.find()
  backends.forEach((backend) => {
    initBackend(backend._id.toString(), backend.addr)
      .then(() => {
        backend.status = '运行中'
        return backend.save()
      })
      .catch((err) => {
        backend.status = '已停止'
        backend.save()
      })
  })
})()

const createBackend = Promise.coroutine(function* (name, addr) {
  const backend = {
    name,
    addr,
    status: '运行中',
    service: '未知'
  }
  yield (new BackendModel(backend))
    .save()
    .then((res) => {
      return initBackend(res._id.toString(), res.addr)
        .then((steps) => {
          const desc = steps.map((step) => step.name).join('、 ')
          res.service = desc.length > 20 ? (desc.slice(20) + '...') : desc
          // update value for graphql resolver
          backend.id = res._id.toString()
          backend.service = res.service
          return res.save()
        })
    })
  return backend
})

const initBackend = (id, addr) => {
  // initilize a new client for each backend
  grpcClient.newClient(id, addr)
  // check whether they are alive
  return grpcClient.sanityCheck(id)
    // TODO: maybe we need a version number to determine whether to update service description
    .then((res) => {
      // get supported steps
      return grpcClient.getSteps(id)
    })
    .then(({ steps }) => {
      // store all steps
      return StepModel.create(
        steps.map((step) => ({
          backend: id,
          name: step.name,
          config: JSON.stringify(step.config),
          phase: step.phase
        }))
      )
    })
}

/**
 * Refresh information related to the backend with specific id.
 *
 * @param  {String} id  the id of the backend
 * @return {Promise}    it will resolve to the updated backend
 */
const refreshBackend = (id) => {
  let desc
  return grpcClient.sanityCheck(id)
    .then(() => {
      // clear all steps
      return StepModel.remove({ backend: id })
    })
    .then(() => {
      return grpcClient.getSteps(id)
    })
    .then(({ steps }) => {
      desc = steps.map((step) => step.name).join('、 ')
      return StepModel.create(
        steps.map((step) => ({
          backend: id,
          name: step.name,
          config: JSON.stringify(step.config),
          phase: step.phase
        }))
      )
    })
    .then(() => {
      return BackendModel.findById(id)
    })
    .then((doc) => {
      doc.service = desc.length > 20 ? (desc.slice(20) + '...') : desc
      doc.status = '运行中'
      return doc.save()
    })
    .catch((err) => {
      return BackendModel.findById(id)
        .then((doc) => {
          doc.status = '已停止'
          return doc.save()
        })
    })
}

// GraphQL resolvers for backends
const BackendResolver = {
  backendList: () => {
    return BackendModel.find()
      .then((backends) => {
        return backends.map((backend) => {
          backend.id = backend._id.toString()
          return backend
        })
      })
  },
  createBackend: Promise.coroutine(function* ({ input }) {
    const { name, addr } = input
    return createBackend(name, addr)
  }),
  deleteBackend: Promise.coroutine(function* ({ id }) {
    yield StepModel.remove({ backend: id })
    const backend =  yield BackendModel.findById(id)
    yield backend.remove()
    return backend
  }),
  refreshBackend: Promise.coroutine(function* ({ id }) {
    return refreshBackend(id)
  })
}

module.exports = {
  createBackend,
  resolver: BackendResolver
}
