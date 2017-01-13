import { connect } from 'react-redux'

import NodeElement from './component'
import {
  setPortPos,
  resetPortPos,
  switchSelect,
  moveNode
} from '../../modules/nodes'


const mapDispatchToProps = {
  setPortPos,
  resetPortPos,
  switchSelect,
  moveNode
}

export default connect(undefined, mapDispatchToProps)(NodeElement)
