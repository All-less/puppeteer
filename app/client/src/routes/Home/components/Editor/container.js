import { connect } from 'react-redux'

import Editor from './component'


const mapStateToProps = (state) => ({
  nodeMap: state.nodes,
  linkMap: state.links
})

export default connect(mapStateToProps)(Editor)
