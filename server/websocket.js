const socketIo = require('socket.io')

const apply = (io) => {
  io.on('connection', (socket) => {
    socket.emit('connected', 'test')
    socket.on('disconnect', () => {})
  })
  return io
}

const send = (userId, StepRes) => {
  // TODO
}

module.exports = {
  default: server => (
    apply(socketIo(server))
  ),
  send
}
