import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const toggleModal = createAction('BACKEND/TOGGLE_MODAL')
export const addBackend = createAction('BACKEND/ADD_BACKEND')

const initialState = {
  showModal: false,
  addedBackends: []
}

const handlerMap = {
  [toggleModal]: (state, action) => (
    { ...state, showModal: (action.payload !== undefined ? action.payload : !state.showModal) }
  ),
  [addBackend]: (state, action) => (
    { ...state, addedBackends: _.concat(state.addBackends, action.payload) }
  )
}

export default handleActions(handlerMap, initialState)
