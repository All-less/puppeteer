import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

import { setLinks } from './links'
import { setNodes } from './nodes'


export const setModels = createAction('MODEL/SET_MODELS')
export const setCurrent = createAction('MODEL/SET_CURRENT', name => (name))
export const resetModelThunk = () => (dispatch) => {
  dispatch(setLinks({}))
  dispatch(setNodes({}))
  dispatch(setCurrent(null))
}
export const setCurrentThunk = (name) => (dispatch, getState) => {
  const { links, nodes } = _.find(getState().model.list, { name })
  // the following order is necessary
  dispatch(setLinks({})) // clear all links
  dispatch(setNodes({})) // clear all nodes
  dispatch(setNodes(JSON.parse(nodes))) // insert nodes
  dispatch(setLinks(JSON.parse(links))) // insert links
  dispatch(setCurrent(name))
}
export const addModel = createAction('MODEL/ADD_MODEL')
export const updateModel = createAction('MODEL/UPDATE_MODEL')
export const setModelEditValue = createAction('MODEL/SET_MODEL_EDIT_VALUE')
export const toggleRunning = createAction('MODEL/TOGGLE_RUNNING')
export const appendRes = createAction('MODEL/APPEND_RES')
export const clearRes = createAction('MODEL/CLEAR_RES')

const initialState = {
  curName: null,
  curId: null,
  list: [/*
    {
      _id: 'model_id',
      name: 'model_name',
      links: 'json_encoded_links',
      nodes: 'json_encoded_nodes'
    }
  */],
  editValue: '',
  running: false,
  res: ['line1', 'line2', 'line3', 'line4', 'line5', 'line6']
}

const handlerMap = {
  [setModels]: (state, action) => ({
    ...state, list: action.payload
  }),
  [setCurrent]: (state, action) => (
    !action.payload
      ? { ...state, curName: null, curId: null, editValue: '' }
      : {
        ...state,
        curName: action.payload,
        curId: _.find(state.list, { name: action.payload })._id,
        editValue: action.payload
      }
  ),
  [addModel]: (state, action) => ({
    ...state, list: _.concat(state.list, action.payload)
  }),
  [updateModel]: (state, action) => {
    const model = action.payload
    const res = {
      ...state,
      list: _.concat(_.remove(state.list, { _id: model.id }), model)
    }
    return res
  },
  [setModelEditValue]: (state, action) => ({
    ...state, editValue: action.payload
  }),
  [toggleRunning]: (state, action) => ({
    ...state, running: action.payload === undefined ? !state.running : action.payload
  }),
  [appendRes]: (state, action) => ({
    ...state, res: _.concat(action.payload, state.res)
  }),
  [clearRes]: (state, action) => ({
    ...state, res: []
  })
}

export default handleActions(handlerMap, initialState)
