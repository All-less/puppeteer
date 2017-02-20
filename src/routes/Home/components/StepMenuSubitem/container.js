import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import _ from 'lodash'
import invariant from 'invariant'

import StepMenuSubitem from './component'
import { createNode } from '../../modules/nodes'
import { setCreating } from '../../modules/editor'


const mapStateToProps = (state) => ({
  creatingNodeId: state.editor.creatingNodeId
})

const mapDispatchToProps = {
  createNode,
  setCreating
}

const handlerMap = {
  handleMouseDown: props => event => {
    event.preventDefault()
    const {
      creatingNodeId, setCreating, createNode, phase, step, config
    } = props
    invariant(!creatingNodeId, 'The creatingNodeId is not null when attempting to create a node.')
    const id = _.uniqueId()
    setCreating(id)
    createNode(
      id, event.clientX, event.clientY,
      phase, step, config
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(StepMenuSubitem)
