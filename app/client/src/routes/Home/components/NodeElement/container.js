import { connect } from 'react-redux'

import NodeElement from './component'
import { setPortPos, resetPortPos } from '../../modules/nodes'
import { setSelected } from '../../modules/editor'


const mapStateToProps = (state) => ({
  editorOrigin: state.editor.origin,
  selectedNodeId: state.editor.selectedNodeId
})

const mapDispatchToProps = {
  setPortPos,
  resetPortPos,
  setSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeElement)
