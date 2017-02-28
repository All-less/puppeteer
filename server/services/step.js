const StepModel = require('../models/step').model

const StepResolver = {
  stepList: () => StepModel.find()
}

module.exports = {
  resolver: StepResolver
}
