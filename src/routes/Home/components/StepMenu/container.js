import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import StepMenu from './component'
import { toggle, updateMenu } from '../../modules/menu'
import { createNode, updateNodePos, removeNode } from '../../modules/nodes'
import { setCreating } from '../../modules/editor'
import { intercept } from '../../../../store/intercept'


const getStepList = gql`
  query {
    stepList {
      name
      phase
      config
    }
  }
`

// update fetched data in menu
intercept(
  (data) => (data.stepList !== undefined),
  (store, data) => store.dispatch(updateMenu(data.stepList))
)

const mapStateToProps = (state) => ({
  items: state.menu.items,
  creatingNodeId: state.editor.creatingNodeId,
})

const mapDispatchToProps = {
  createNode,
  updateNodePos,
  setCreating,
  removeNode
}

const handlerMap = {
  handleMouseMove: props => event => {
    event.preventDefault()
    const { creatingNodeId, updateNodePos } = props
    if (creatingNodeId) {
      updateNodePos(creatingNodeId, event.clientX, event.clientY)
    }
  },
  handleMouseUp: props => event => {
    event.preventDefault()
    const { creatingNodeId, setCreating, removeNode } = props
    if (creatingNodeId) {
      removeNode(creatingNodeId)
      setCreating(null)
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getStepList),
  withHandlers(handlerMap)
)(StepMenu)
