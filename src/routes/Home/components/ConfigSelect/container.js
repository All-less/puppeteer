import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import ConfigSelect from './component'
import { updateValue } from '../../modules/nodes'


const mapStateToProps = (state, props) => {
  const { nodeId, name } = props
  const args = state.nodes[nodeId].config[name]
  return {
    value: args.value,
    type: args.type,
    options: args.options
  }
}

const mapDispatchToProps = {
  updateValue
}

const handlerMap = {
  handleChange: props => (event, key, payload) => {
    const { updateValue, nodeId, name } = props
    updateValue([nodeId, 'config', name, 'value'], payload)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(ConfigSelect)
