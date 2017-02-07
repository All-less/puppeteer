import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import BackendTable from './component'

const query = gql`
  query {
    backendList {
      name
      remote
      status
      service
    }
  }
`

export default compose(
  graphql(query)
)(BackendTable)
