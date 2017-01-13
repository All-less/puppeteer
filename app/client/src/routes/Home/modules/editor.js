import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

export const zoom = createAction('EDITOR/ZOOM', amount => amount)
export const move = createAction('EDITOR/MOVE', (x, y) => [x, y])

const initialState = {
  pos: [0, 0],
  ratio: 1.0
}

const handlerMap = {
  [zoom]: (state, action) => (_.assign(state, { ratio: action.payload })),
  [move]: (state, action) => ({ ...state, pos: [state.pos[0] + action.payload[0], state.pos[1] + action.payload[1]]})
}

export default handleActions(handlerMap, initialState)
