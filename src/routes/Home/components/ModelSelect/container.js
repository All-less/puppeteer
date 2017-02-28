import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import _ from 'lodash'

import ModelSelect from './component'
import { setCurrentThunk, resetModelThunk } from '../../modules/model'


const mapStateToProps = state => ({
  names: _.concat([null], state.model.list.map(e => (e.name))),
  curName: state.model.curName,
  curId: state.model.curId
})

const mapDispatchToProps = {
  setCurrentThunk,
  resetModelThunk
}

const handlersMap = {
  handleChange: ({ setCurrentThunk, resetModelThunk }) => (event, key, payload) => {
    if (payload === null) {
      resetModelThunk()
    } else {
      setCurrentThunk(payload)
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlersMap)
)(ModelSelect)
