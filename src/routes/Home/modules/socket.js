import io from 'socket.io-client'
import { createAction, handleActions } from 'redux-actions'

import { appendRes } from './model'


const init = (socket, dispatch) => {
  socket.on('connected', (data) => {
    console.log(data)
  })
  socket.on('stepRes', (data) => {
    console.log(data)
    dispatch(appendRes(`progress = ${data.progress}`))
  })
}

export const startSocket = createAction('SOCKET/START_SOCKET')
export const initSocketThunk = () => (dispatch, getState) => {
  console.log('in initSocketThunk')
  dispatch(startSocket())
  const socket = getState().socket.socket
  init(socket, dispatch)
}
export const stopSocket = createAction('SOCKET/STOP_SOCKET')

const initialState = {
  socket: null
}

const handlerMap = {
  [startSocket]: (state, action) => {
    const socket = io.connect(`${location.protocol}//${location.host}`)
    return { ...state, socket }
  },
  [stopSocket]: (state, action) => {
    state.socket.close()
    return { ...state, socket: null }
  }
}

export default handleActions(handlerMap, initialState)
