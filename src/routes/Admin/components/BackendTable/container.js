import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'redux'
import { connect } from 'react-redux'

import BackendTable from './component'


const getBackendList = gql`
  query {
    backendList {
      name
      remote
      status
      service
    }
  }
`

const mapStateToProps = (state) => ({
  addedBackends: state.backend.addedBackends
})

export default compose(
  graphql(getBackendList),
  connect(mapStateToProps)
)(BackendTable)
