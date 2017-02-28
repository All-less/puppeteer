import { connect } from 'react-redux'

import LinkLayer from './component'


const mapStateToProps = state => ({
  editorOrigin: state.editor.origin,
  creatingLink: state.editor.creatingLink,
  creatingLinkStart: state.editor.creatingLinkStart,
  creatingLinkEnd: state.editor.creatingLinkEnd,
  linkMap: state.links
})

export default connect(mapStateToProps)(LinkLayer)
