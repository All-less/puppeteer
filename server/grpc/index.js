const grpc = require('grpc')
const Promise = require('bluebird')

const PROTO_PATH = `${__dirname}/puppet.proto`
const puppetProto = grpc.load(PROTO_PATH).puppet


const clientMap = {}

const newClient = (name, addr) => {
  clientMap[name] = new puppetProto.Puppet(addr, grpc.credentials.createInsecure())
}

const sanityCheck = name => Promise.promisify(clientMap[name].sanityCheck.bind(clientMap[name]))({})

const getSteps = name => Promise.promisify(clientMap[name].getSteps.bind(clientMap[name]))({})

const runStep = (name, runSpec, onNext, onComplete) => {
  const call = clientMap[name].runStep(runSpec)
  call.on('data', onNext)
  call.on('end', onComplete)
}


module.exports = {
  newClient,
  sanityCheck,
  getSteps,
  runStep
}
