import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { intercept } from '../../../../store/intercept'
import { openPopover } from '../../modules/popover'
import { updateBackends } from '../../modules/backend'
import { showSnackbar } from '../../modules/snackbar'
import BackendTable from './component'


const getBackendList = gql`
  query {
    backendList {
      id
      name
      addr
      status
      service
    }
  }
`

// store graphql result to redux
intercept(
  (data) => (data.backendList !== undefined),
  (store, data) => store.dispatch(updateBackends(data.backendList))
)

const mapStateToProps = (state) => ({
  backends: state.backend.backends
})

const mapDispatchToProps = {
  openPopover,
  showSnackbar
}

const handlerMap = {
  handleOperation: props => id => event => {
    const { openPopover } = props
    openPopover(event.target, id)
  }
}

export default compose(
  graphql(getBackendList),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlerMap)
)(BackendTable)
