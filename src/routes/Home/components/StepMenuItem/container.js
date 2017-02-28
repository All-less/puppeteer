import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import StepMenuItem from './component'
import { toggle } from '../../modules/menu'

const mapDispatchToProps = {
  toggle
}

const handlerMap = {
  handleClick: props => (event) => {
    const { index, toggle } = props
    toggle(index)
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers(handlerMap)
)(StepMenuItem)
