import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const toggleModal = createAction('BACKEND/TOGGLE_MODAL')
export const addBackend = createAction('BACKEND/ADD_BACKEND')
export const updateBackends = createAction('BACKEND/UPDATE_BACKENDS')
export const removeBackend = createAction('BACKEND/REMOVE_BACKEND', (id) => (id))
export const updateBackend = createAction('BACKEND/UPDATE_BACKEND')

const initialState = {
  showModal: false,
  backends: []
}

const handlerMap = {
  [toggleModal]: (state, action) => (
    { ...state, showModal: (action.payload !== undefined ? action.payload : !state.showModal) }
  ),
  [addBackend]: (state, action) => (
    { ...state, backends: _.concat(state.backends, action.payload) }
  ),
  [updateBackends]: (state, action) => (
    { ...state, backends: action.payload }
  ),
  [removeBackend]: (state, action) => (
    { ...state, backends: _.filter(state.backends, (backend) => (backend.id !== action.payload)) }
  ),
  [updateBackend]: (state, action) => (
    {
      ...state, backends: state.backends.map((backend) => (
        backend.id === action.payload.id ? _.assign(backend, action.payload) : backend
      ))
    }
  )
}

export default handleActions(handlerMap, initialState)
