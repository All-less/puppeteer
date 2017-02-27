import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import ConfigText from './component'
import { updateValue } from '../../modules/nodes'


const mapStateToProps = (state, props) => {
  const { nodeId, name } = props
  return {
    value: state.nodes[nodeId].config[name].value
  }
}

const mapDispatchToProps = {
  updateValue
}

const handlerMap = {
  handleChange: props => (event, newValue) => {
    const { updateValue, nodeId, name } = props
    updateValue([nodeId, 'config', name, 'value'], newValue)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(ConfigText)
