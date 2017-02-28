const _ = require('lodash')
const execModel = require('./train')
// here we means the database model of
// a machine learning model
const ModelModel = require('../models/model').model

const ModelResolver = {
  modelList: ({ userId }) => ModelModel.find({ user: userId }),
  createModel: ({ userId, model }) => (new ModelModel(
      _.assign({}, model, { user: userId })
    )).save(),
  updateModel: ({ id, model }) => ModelModel.findById(id)
      .then((res) => {
        _.assign(res, model)
        return res.save()
      }),
  deleteModel: ({ id }) => ModelModel.findById(id)
      .then(res => res.remove()),
  runModel: ({ model }, req) => {
    setTimeout(() => {
      execModel(model, req.session.userId)
    }, 0)
    return 'SUBMIT_SUCCESS'
  }
}

module.exports = {
  resolver: ModelResolver
}
