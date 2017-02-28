import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import ModelExtra from './component'
import { setModelExtra } from '../../modules/model'


const mapStateToProps = state => ({
  value: state.model.extra
})

const mapDispatchToProps = {
  setModelExtra
}

const handlerMap = {
  handleChange: props => (event, newValue) => {
    const { setModelExtra } = props
    setModelExtra(newValue)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(ModelExtra)
