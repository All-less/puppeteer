import { connect } from 'react-redux'
import { compose } from 'recompose'

import NodeLayer from './component'

const mapStateToProps = (state) => ({
  nodeMap: state.nodes
})

export default compose(
  connect(mapStateToProps)
)(NodeLayer)
