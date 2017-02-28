const socketIo = require('socket.io')
const socketIOSession = require('socket.io.session')

const socketMap = {}

const configure = (io, options) => {
  if (options && options.session) {
    const socketSession = socketIOSession(options.session)
    io.use(socketSession.parser)
  }
  io.on('connection', (socket) => {
    const userId = socket.session.userId
    socketMap[userId] = socket

    socket.emit('connected', 'test')

    socket.on('disconnect', () => {
      delete socketMap[userId]
    })
  })
  return io
}

const send = (userId, stepRes) => {
  const socket = socketMap[userId]
  if (!socket) {
    console.error(`socket for ${userId} is not available.`)
  } else {
    socket.emit('stepRes', stepRes)
  }
}

module.exports = {
  default: (server, options) => configure(socketIo(server), options),
  send
}
