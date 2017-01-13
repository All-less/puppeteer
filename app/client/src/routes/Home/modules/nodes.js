import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'


export const resetPortPos = createAction(
  'NODES/RESET_PORT_POS',
  (nodeId) => nodeId
)
export const setPortPos = createAction(
  'NODES/SET_PORT_POS',
  (nodeId, portType, portName, pos) => ({ path: [ nodeId, portType, portName ], pos})
)
export const switchSelect = createAction(
  'NODES/SWITCH_SELECT',
  (nodeId) => nodeId
)
export const moveNode = createAction(
  'NODES/MOVE_NODE',
  (nodeId, deltaX, deltaY) => ({ nodeId, deltaX, deltaY })
)

const initialState = {
  shortid1: {
    pos: [100, 100],
    type: 'source',
    selected: false,
    outPorts: {
      'raw data': {computed: false, pos: [0, 0] }
    },
    inPorts: {}
  },
  shortid2: {
    pos: [350, 100],
    type: 'preprocess',
    selected: false,
    outPorts: {
      'dataset': {computed: false, pos: [0, 0] }
    },
    inPorts: {
      'raw data': {computed: false, pos: [0, 0] }
    }
  }
}

const handlerMap = {
  [setPortPos]: (state, action) => {
    const { path, pos } = action.payload
    const res = _.assign({}, state)
    _.set(res, _.concat(path, 'computed'), true)
    _.set(res, _.concat(path, 'pos'), pos)
    return res
  },
  [resetPortPos]: (state, action) => {
    const node = state[action.payload]
    const update = (value, key) => { value['computed'] = false }
    _.forOwn(node['inPorts'], update)
    _.forOwn(node['outPorts'], update)
    return { [action.payload]: node, ...state }
  },
  [switchSelect]: (state, action) => {
    const res = _.assign({}, state)
    return _.update(res, [action.payload, 'selected'], (value) => (!value))
  },
  [moveNode]: (state, action) => {
    const res = _.assign({}, state)
    const { nodeId, deltaX, deltaY } = action.payload
    const pos = res[nodeId]['pos']
    res[nodeId]['pos'] = [pos[0] + deltaX, pos[1] + deltaY]
    return res
  }
}

export default handleActions(handlerMap, initialState)
