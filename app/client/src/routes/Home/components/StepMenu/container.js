import { connect } from 'react-redux'

import StepMenu from './component'
import { toggle } from '../../modules/menu'
import { createNode, updateNodePos, removeNode } from '../../modules/nodes'
import { setCreating } from '../../modules/editor'


const mapStateToProps = (state) => ({
  items: state.menu.items,
  creatingNodeId: state.editor.creatingNodeId,
  editorOrigin: state.editor.origin
})

const mapDispatchToProps = {
  toggle,
  createNode,
  updateNodePos,
  setCreating,
  removeNode
}

export default connect(mapStateToProps, mapDispatchToProps)(StepMenu)
