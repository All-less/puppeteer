const Promise = require('bluebird')
// here we means the database model of
// a machine learning model
const ModelModel = require('../models/model').model

const ModelResolver = {
  modelList: ({ userId }) => {
    return ModelModel.find({ user: userId })
  },
  renameModel: Promise.coroutine(function* ({ id, name }) {
    const model = yield ModelModel.find({ id })
    model.name = name
    return model.save()
  }),
  createModel: ({ model }) => {
    return (new ModelModel(model)).save()
  }
  /*
  updateModel({ id, model) => {
    return
  }
  */
}

module.exports = {
  resolver: ModelResolver
}
