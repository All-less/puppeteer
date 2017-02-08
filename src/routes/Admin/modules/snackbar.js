import { createAction, handleActions } from 'redux-actions'


export const showSnackbar = createAction('SNACKBAR/SHOW_SNACKBAR')


const initialState = {
}

const handlerMap = {
  [showSnackbar]: (state, action) => {
    const notification = document.querySelector('.mdl-js-snackbar')
    notification && notification.MaterialSnackbar.showSnackbar(action.payload)
    return state
  }
}

export default handleActions(handlerMap, initialState)
