import { createAction, handleActions } from 'redux-actions'

export const createLink = createAction('LINKS/CREATE_LINK') // TODO

const initialState = {
  shortid3: {
    src: {id: 'shortid1', port: 'raw data'},
    dst: {id: 'shortid2', port: 'raw data'}
  }
}

const handlerMap = {
  [createAction]: (state, action) => state // TODO
}

export default handleActions(handlerMap, initialState)
