import { connect } from 'react-redux'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import BackendModal from './component'
import { toggleModal, addBackend } from '../../modules/backend'
import { showSnackbar } from '../../modules/snackbar'


const createBackend = gql`
  mutation ($name: String!, $addr: String!) {
    createBackend(input: {
      name: $name
      addr: $addr
    }) {
      id
      name
      addr
      service
      status
    }
  }
`

const mapStateToProps = (state) => ({
  showModal: state.backend.showModal
})

const mapDispatchToProps = {
  toggleModal,
  showSnackbar,
  addBackend
}

export default compose(
  graphql(createBackend),
  connect(mapStateToProps, mapDispatchToProps)
)(BackendModal)
