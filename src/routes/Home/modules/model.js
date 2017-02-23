import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

import { setLinks } from './links'
import { setNodes } from './nodes'


export const setModels = createAction('MODEL/SET_MODELS')
export const setCurrent = createAction('MODEL/SET_CURRENT', name => (name))
export const setCurrentThunk = (name) => (dispatch, getState) => {
  const { links, nodes } = _.find(getState().model.list, { name })
  // the following order is necessary
  dispatch(setLinks({})) // clear all links
  dispatch(setNodes({})) // clear all nodes
  dispatch(setNodes(JSON.parse(nodes))) // insert nodes
  dispatch(setLinks(JSON.parse(links))) // insert links
  dispatch(setCurrent(name))
}

const initialState = {
  cur: '未命名',
  list: [/*
    {
      _id: 'model_id',
      name: 'model_name',
      links: 'json_encoded_links',
      nodes: 'json_encoded_nodes'
    }
  */]
}

const handlerMap = {
  [setModels]: (state, action) => ({
    ...state, list: action.payload
  }),
  [setCurrent]: (state, action) => ({
    ...state, cur: action.payload
  })
}

export default handleActions(handlerMap, initialState)
