import { connect } from 'react-redux'
import { mapProps } from 'recompose'

import LinkLayer from './component'


const mapStateToProps = (state) => ({
  editorOrigin: state.editor.origin,
  creatingLink: state.editor.creatingLink,
  creatingLinkStart: state.editor.creatingLinkStart,
  creatingLinkEnd: state.editor.creatingLinkEnd
})

// merge 'creatingLink' into 'linkMap'
const enhance = mapProps((props) => {
  const { creatingLink, creatingLinkStart, creatingLinkEnd } = props
  if (creatingLink) {
    props.linkMap['creating'] = {
      src: creatingLinkStart,
      dst: creatingLinkEnd
    }
  }
  return props
})

export default connect(mapStateToProps)(enhance(LinkLayer))
