import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const toggle = createAction('MENU/TOGGLE', (index) => index)
export const updateMenu = createAction('MENU/UPDATE_MENU')

// Actual menu contents will be fetched from server.
const initialState = {
  items: [
    {
      name: '选择数据源',
      subitems: [],
      expanded: false
    },
    {
      name: '数据预处理',
      subitems: [],
      expanded: false
    },
    {
      name: '训练模型',
      subitems: [],
      expanded: false
    },
    {
      name: '模型评估',
      subitems: [],
      expanded: false
    }
  ]
}

const phaseIndices = {
  'SOURCE': 0,
  'PREPROCESS': 1,
  'TRAIN': 2,
  'EVALUATE': 3
}

const handlerMap = {
  [toggle]: (state, action) => {
    return {
      items: state.items.map((item, index) => (
        index !== action.payload
          ? item
          : _.update(item, 'expanded', (value) => (!value))
      ))
    }
  },
  [updateMenu]: (state, action) => {
    const res =  { items: state.items }
    action.payload.map((step) => {
      _.update(
        res,
        ['items', phaseIndices[step.phase], 'subitems'],
        (subitems) => (_.concat(subitems, step))
      )
    })
    return res
  }
}

export default handleActions(handlerMap, initialState)
