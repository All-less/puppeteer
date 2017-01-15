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
export const moveNode = createAction(
  'NODES/MOVE_NODE',
  (nodeId, deltaX, deltaY) => ({ nodeId, deltaX, deltaY })
)
export const createNode = createAction(
  'NODES/CREATE_NODE',
  (id, x, y, type, subtype) => ({ id, pos: [x, y], type, subtype })
)
export const updateNodePos = createAction(
  'NODES/UPDATE_NODE_POS',
  (id, x, y) => ({ id, pos: [x, y] })
)
export const removeNode = createAction(
  'NODES/REMOVE_NODE',
  (nodeId) => nodeId
)

const initialState = {
  /*
  <node id>: {
    pos: [<clientX>, <clientY>],
    type: <type>,
    inPorts: {
      <port name>: {
        computed: <whether pos is ready>,
        pos: [<clientX>, <clientY>]
      },
      ...
    },
    outPorts: {
      ...
    }
  }
   */
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
  [moveNode]: (state, action) => {
    const res = _.assign({}, state)
    const { nodeId, deltaX, deltaY } = action.payload
    return _.update(res, [nodeId, 'pos'], ([x, y]) => ([x + deltaX, y + deltaY]))
  },
  [createNode]: (state, action) => {
    const { id, pos, type } = action.payload
    return _.assign(
      {
        [id]: {
          type,
          pos,
          inPorts: { in: { computed: false, pos: [0, 0] } },
          outPorts: { out: { computed: false, pos: [0, 0] } }
        }
      },
      state
    )
  },
  [updateNodePos]: (state, action) => {
    const { id, pos } = action.payload
    const res = _.assign({}, state)
    return _.update(res, [id, 'pos'], () => pos)
  },
  [removeNode]: (state, action) => {
    const res = _.assign({}, state)
    _.unset(res, action.payload)
    return res
  }
}

export default handleActions(handlerMap, initialState)
