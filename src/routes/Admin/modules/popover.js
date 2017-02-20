import { createAction, handleActions } from 'redux-actions'


export const openPopover = createAction('POPOVER/OPEN_POPOVER', (anchor, backendId) => ({ anchor, backendId }))
export const closePopover = createAction('BACKEND/CLOSE_POPOVER')

const initialState = {
  open: false,
  anchor: null,
  id: null
}

const handlerMap = {
  [openPopover]: (state, action) => (
    { open: true, anchor: action.payload.anchor, id: action.payload.backendId }
  ),
  [closePopover]: (state, action) => (
    { ...state, open: false, anchor: null }
  )
}

export default handleActions(handlerMap, initialState)
