import { connect } from 'react-redux'

import Editor from './component'
import {
  updateOrigin,
  setCreating,
  setSelected,
  stopLink,
  updateLinkEnd
} from '../../modules/editor'
import { updateNodePos } from '../../modules/nodes'


const mapStateToProps = state => ({
  origin: state.editor.origin,
  selectedNodeId: state.editor.selectedNodeId,
  creatingNodeId: state.editor.creatingNodeId,
  creatingLink: state.editor.creatingLink,
  deltaPos: state.editor.deltaPos
})

const mapDispatchToProps = {
  updateOrigin,
  setCreating,
  setSelected,
  updateNodePos,
  stopLink,
  updateLinkEnd
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
