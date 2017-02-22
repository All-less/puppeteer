import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'


export const toggleSignin = createAction('AUTH/TOGGLE_SIGNIN')
export const toggleSignup = createAction('AUTH/TOGGLE_SIGNUP')
export const updateValue = createAction('AUTH/UPDATE_VALUE', (path, value) => ({ path, value }))
export const updateUser = createAction('AUTH/UPDATE_USER', (id, name) => ({ id, name }))

const initialState = Immutable.fromJS({
  signin: {
    open: false
  },
  signup: {
    open: false
  },
  userId: null,
  username: null
})

const handlerMap = {
  [toggleSignin]: (state, action) => (
    state.updateIn(['signin', 'open'], value => !value)
  ),
  [toggleSignup]: (state, action) => (
    state.updateIn(['signup', 'open'], value => !value)
  ),
  [updateValue]: (state, action) => (
    state.setIn(action.payload.path, action.payload.value)
  ),
  [updateUser]: (state, action) => {
    const { id, name } = action.payload
    return state.setIn(['userId'], id)
      .setIn(['username'], name)
  }
}

export default handleActions(handlerMap, initialState)
