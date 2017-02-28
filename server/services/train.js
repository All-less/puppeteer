const _ = require('lodash')
const { runStep } = require('../grpc')
const { send } = require('../websocket')

const phaseMap = {
  选择数据源: 'SOURCE',
  数据预处理: 'PREPROCESS',
  训练模型: 'TRAIN',
  模型评估: 'EVALUATE'
}

const execModel = (input, userId) => {
  // validate model configuration

  // convert to RunSpec
  const links = JSON.parse(input.links)
  const nodes = JSON.parse(input.nodes)
  const first = _.keys(nodes)[0]
  const steps = _.mapValues(nodes, (node, key) => ({
    id: key,
    name: node.step,
    next: [],
    prev: [],
    phase: phaseMap[node.phase],
    config: _.mapValues(node.config, field => field.value)
  }))
  _.forOwn(links, (link) => {
    steps[link.src.id].next.push(link.dst.id)
    steps[link.dst.id].prev.push(link.src.id)
  })

  const runSpec = {
    id: first,
    model: {
      id: _.uniqueId(),
      name: input.name,
      steps
    },
    extra: input.extra
  }

  const onNext = (value) => {
    send(userId, value)
  }
  const onComplete = () => {}

  // call backend through grpc
  runStep(nodes[first].backend, runSpec, onNext, onComplete)
}

module.exports = execModel
