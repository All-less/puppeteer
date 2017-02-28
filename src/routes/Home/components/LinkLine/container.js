import { compose } from 'recompose'
import { connect } from 'react-redux'

import LinkLine from './component'

const mapStateToProps = (state, props) => {
  const link = state.links[props.linkId]
  const src = state.nodes[link.src.id].outPorts[link.src.port]
  const dst = state.nodes[link.dst.id].inPorts[link.dst.port]
  if (src.computed && dst.computed) {
    return {
      computed: true,
      editorOrigin: state.editor.origin,
      src: src.pos,
      dst: dst.pos
    }
  }
  return { computed: false }
}

export default compose(
  connect(mapStateToProps)
)(LinkLine)
