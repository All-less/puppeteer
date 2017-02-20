const StepModel = require('../models/step').model

const StepResolver = {
  stepList: () => {
    return StepModel.find()
  }
}

module.exports = {
  resolver: StepResolver
}
