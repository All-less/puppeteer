import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const updateOrigin = createAction('EDITOR/UPDATE_ORIGIN', (x, y) => [x, y])
export const setCreating = createAction('EDITOR/SET_CREATING', nodeId => nodeId)
export const setSelected = createAction('EDITOR/SET_SELECTED', nodeId => nodeId)
export const startLink = createAction('EDITOR/START_LINK', (id, port, type, x, y) => ({ src: { id, port, type }, pos: [x, y] }))
export const updateLinkEnd = createAction('EDITOR/UPDATE_LINK_END', (x, y) => [x, y])
export const stopLink = createAction('EDITOR/STOP_LINK')

const initialState = {
  origin: [0, 0], // the top-left position of editor
  creatingNodeId: null,
  selectedNodeId: null,
  creatingLink: false,
  creatingLinkSrc: null,
  creatingLinkStart: [0, 0],
  creatingLinkEnd: [0, 0]
}

const handlerMap = {
  [updateOrigin]: (state, action) => (
    action.payload[0] === state.origin[0] && action.payload[1] === state.origin[1]
      ? state
      : { ...state, origin: action.payload }
  ),
  [setCreating]: (state, action) => ({ ...state, creatingNodeId: action.payload }),
  [setSelected]: (state, action) => ({ ...state, selectedNodeId: action.payload }),
  [startLink]: (state, action) => ({
    ...state,
    creatingLink: true,
    creatingLinkSrc: action.payload.src,
    creatingLinkStart: action.payload.pos,
    creatingLinkEnd: action.payload.pos
  }),
  [updateLinkEnd]: (state, action) => ({ ...state, creatingLinkEnd: action.payload }),
  [stopLink]: (state, action) => ({ ...state, creatingLink: false })
}

export default handleActions(handlerMap, initialState)
