import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { toggleSignin, toggleSignup, updateUser } from '../../modules/auth'
import Header from './component'


const logout = gql`
  mutation ($userId: String!) {
    logout(id: $userId) {
      msg
      user {
        id
        username
      }
    }
  }
`

const mapStateToProps = (state) => ({
  username: state.auth.get('username'),
  userId: state.auth.get('userId')
})

const mapDispatchToProps = {
  updateUser,
  toggleSignin,
  toggleSignup
}

const handlerMap = {
  handleSignin: props => event => {
    props.toggleSignin()
  },
  handleSignup: props => event => {
    props.toggleSignup()
  },
  handleLogout: props => event => {
    const { mutate, updateUser, userId } = props
    mutate({ variables: { userId } })
      .then((res) => {
        const { msg } = res.data.logout
        if (msg === 'LOGOUT_SUCCESS') {
          updateUser(null, null)
        } else if (msg === 'LOGOUT_FAILURE') {
          // TODO: some notification is needed
        }
      })
      .catch((err) => {
        // TODO: some notification is needed
      })
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(logout),
  withHandlers(handlerMap)
)(Header)
