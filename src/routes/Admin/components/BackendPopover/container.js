import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import BackendPopover from './component'
import { closePopover } from '../../modules/popover'
import { showSnackbar } from '../../modules/snackbar'
import { updateBackend, removeBackend } from '../../modules/backend'


const mapStateToProps = state => ({
  open: state.popover.open,
  anchor: state.popover.anchor,
  backendId: state.popover.id
})

const mapDispatchToProps = {
  closePopover,
  showSnackbar,
  updateBackend,
  removeBackend
}

const deleteBackend = gql`
  mutation ($id: String!) {
    deleteBackend(id: $id) {
      id
      name
      addr
      status
      service
    }
  }
`

const refreshBackend = gql`
  mutation ($id: String!) {
    refreshBackend(id: $id) {
      id
      name
      addr
      status
      service
    }
  }
`

const handlerMap = {
  handleRefresh: props => (event) => {
    const {
      refreshBackend, updateBackend, showSnackbar, backendId, closePopover
    } = props
    closePopover()
    refreshBackend({ variables: { id: backendId } })
      .then((result) => {
        updateBackend(result.data.refreshBackend)
        showSnackbar({ message: '后端刷新成功' })
      })
      .catch((err) => {
        console.error(err)
        showSnackbar({ message: '后端刷新失败' })
      })
  },
  handleDelete: props => (event) => {
    const {
      deleteBackend, removeBackend, showSnackbar, backendId, closePopover
    } = props
    closePopover()
    deleteBackend({ variables: { id: backendId } })
      .then((result) => {
        removeBackend(result.data.deleteBackend.id)
        showSnackbar({ message: '后端移除成功' })
      })
      .catch((err) => {
        console.error(err)
        showSnackbar({ message: '后端移除失败' })
      })
  },
  handleClose: props => (event) => {
    if (event == 'clickAway') {
      props.closePopover()
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(deleteBackend, { name: 'deleteBackend' }),
  graphql(refreshBackend, { name: 'refreshBackend' }),
  withHandlers(handlerMap)
)(BackendPopover)
