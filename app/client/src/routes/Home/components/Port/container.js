import { connect } from 'react-redux'

import Port from './component'
import { setPortPos } from '../../modules/nodes'


const mapDispatchToProps = {
  setPortPos
}

export default connect(undefined, mapDispatchToProps)(Port)
