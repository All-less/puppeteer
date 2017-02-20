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
          // update value to return to graphql resolver
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

const refreshBackend = (id) => {
  let desc
  grpcClient.sanityCheck(id)
    .then(() => {
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
      return BackendModel.findOneAndUpdate(
        { id }, {
          service: desc.length > 20 ? (desc.slice(20) + '...') : desc,
          status: '运行中'
        }
      )
    })
    .then((doc) => {
      return doc
    })
    .catch((err) => {
      return BackendModel.findOneAndUpdate(
       { id }, { status: '已停止' }
      )
      .then((doc) => {
        return doc
      })
    })
}

// GraphQL resolvers for backends
const BackendResolver = {
  backendList: () => {
    return BackendModel.find().then((backends) => {
      return backends.map((backend) => {
        backend.id = backend._id.toString()
        return backend
      })
    })
  },
  createBackend: Promise.coroutine(function* ({ input }) {
    const { name, addr } = input
    const backend = yield createBackend(name, addr)
    return backend
  }),
  deleteBackend: Promise.coroutine(function* ({ id }) {
    return BackendModel.findByIdAndRemove(id)
      .then((doc) => (doc))
  }),
  refreshBackend: Promise.coroutine(function* ({ id }) {
    return refreshBackend(id)
  })
}

module.exports = {
  createBackend,
  resolver: BackendResolver
}
