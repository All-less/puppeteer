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

const getStepListOptions = {
  options: ({ updateMenu }) => ({
    reducer: (prev, action, variables) => {
      const { type, result } = action
      if (type === 'APOLLO_QUERY_RESULT' && result.data.stepList) {
        setTimeout(() => { updateMenu(result.data.stepList) }, 0)
      }
      return prev
    }
  })
}

const mapStateToProps = (state) => ({
  items: state.menu.items,
  creatingNodeId: state.editor.creatingNodeId,
})

const mapDispatchToProps = {
  createNode,
  updateNodePos,
  setCreating,
  removeNode,
  updateMenu
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
  graphql(getStepList, getStepListOptions),
  withHandlers(handlerMap)
)(StepMenu)
