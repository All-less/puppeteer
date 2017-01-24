import { connect } from 'react-redux'

import Port from './component'
import { setPortPos } from '../../modules/nodes'
import { startLink, stopLink } from '../../modules/editor'
import { createLink } from '../../modules/links'


const mapStateToProps = (state) => ({
  creatingLink: state.editor.creatingLink,
  creatingLinkSrc: state.editor.creatingLinkSrc
})

const mapDispatchToProps = {
  setPortPos,
  startLink,
  createLink,
  stopLink
}

export default connect(mapStateToProps, mapDispatchToProps)(Port)
