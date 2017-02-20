import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import NodeElement from './component'
import { setPortPos, resetPortPos, removeNode } from '../../modules/nodes'
import { setSelected, updateDeltaPos } from '../../modules/editor'
import { removeNodeLinks } from '../../modules/links'


const mapStateToProps = (state) => ({
  editorOrigin: state.editor.origin,
  selectedNodeId: state.editor.selectedNodeId
})

const mapDispatchToProps = {
  setPortPos,
  resetPortPos,
  setSelected,
  updateDeltaPos,
  removeNode,
  removeNodeLinks
}

const handlerMap = {
  handleClose: props => event => {
    const { removeNode, removeNodeLinks, nodeId } = props
    removeNodeLinks(nodeId)
    removeNode(nodeId)
  },
  handleMouseDown: props => event => {
    const { nodeId, setSelected, pos, updateDeltaPos } = props
    setSelected(nodeId)
    updateDeltaPos(event.clientX - pos[0], event.clientY - pos[1])
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(NodeElement)
