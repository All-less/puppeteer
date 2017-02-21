import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const createLink = createAction('LINKS/CREATE_LINK', (src, dst) => ({ src, dst }))
export const removeNodeLinks = createAction('LINKS/REMOVE_NODE_LINKES', id => id)

const initialState = {
  /*
  '<link id>': {
    src: {id: '<node id>', port: '<port name>'},
    dst: {id: '<node id>', port: '<port name>'}
  }
  */
}

const handlerMap = {
  [createLink]: (state, action) => {
    const { src, dst } = action.payload
    if (src.type === dst.type || src.id === dst.id || src.port === dst.port) {
      return state
    } else {
      return {
        ...state,
        [_.uniqueId()]: src.type === 'out' ? action.payload : { src: dst, dst: src }
      }
    }
  },
  [removeNodeLinks]: (state, action) => {
    const id = action.payload
    return _.omitBy(state, (link) => (link.src.id === id || link.dst.id === id))
  }
}

export default handleActions(handlerMap, initialState)
