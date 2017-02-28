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
  query BackendList {
    backendList {
      id
      name
      addr
      status
      service
    }
  }
`

const getBackendListOptions = {
  options: ({ updateBackends }) => ({
    reducer: (prev, action, variables) => {
      const { type, result } = action
      if (type === 'APOLLO_QUERY_RESULT' && result.data.backendList) {
        // note that here is reducer, so we cannot dispatch action directly
        setTimeout(() => { updateBackends(result.data.backendList) }, 0)
      }
      return prev
    }
  })
}

const mapStateToProps = state => ({
  backends: state.backend.backends
})

const mapDispatchToProps = {
  openPopover,
  showSnackbar,
  updateBackends
}

const handlerMap = {
  handleOperation: props => id => (event) => {
    const { openPopover } = props
    openPopover(event.target, id)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getBackendList, getBackendListOptions),
  withHandlers(handlerMap)
)(BackendTable)
