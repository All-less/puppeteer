import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { intercept } from '../../../../store/intercept'
import { updateBackends, removeBackend } from '../../modules/backend'
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

const deleteBackend = gql`
  mutation ($id: String!) {
    deleteBackend(id: $id)
  }
`

const refreshBackend = gql`
  mutation ($id: String!) {
    refreshBackend(id: $id)
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
  removeBackend,
  showSnackbar
}

export default compose(
  graphql(getBackendList),
  graphql(deleteBackend, { name: 'deleteBackend' }),
  graphql(refreshBackend, { name: 'refreshBackend' }),
  connect(mapStateToProps, mapDispatchToProps)
)(BackendTable)
