import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import StepMenu from './component'
import { updateMenu } from '../../modules/menu'
import { updateNodePos, removeNode } from '../../modules/nodes'
import { setCreating } from '../../modules/editor'


const mapStateToProps = state => ({
  items: state.menu.items,
  creatingNodeId: state.editor.creatingNodeId
})

const mapDispatchToProps = {
  updateNodePos,
  setCreating,
  removeNode,
  updateMenu
}

const getStepList = gql`
  query {
    stepList {
      name
      phase
      config
      backend
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

const handlerMap = {
  handleMouseMove: props => (event) => {
    event.preventDefault()
    const { creatingNodeId, updateNodePos } = props
    if (creatingNodeId) {
      updateNodePos(creatingNodeId, event.clientX, event.clientY)
    }
  },
  handleMouseUp: props => (event) => {
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
