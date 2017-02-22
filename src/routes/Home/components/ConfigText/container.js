import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import ConfigText from './component'


const handlerMap = {
}

export default compose(
  withHandlers(handlerMap)
)(ConfigText)
