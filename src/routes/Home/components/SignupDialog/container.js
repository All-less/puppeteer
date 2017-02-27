import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { updateValue, toggleSignup, updateUser } from '../../modules/auth'
import { initSocketThunk } from '../../modules/socket'
import SignupDialog from './component'
import { validateUsername, validatePassword } from '../../../../util'


const signup = gql`
  mutation ($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      msg
      user {
        id
        username
      }
    }
  }
`

const mapStateToProps = state => ({
  open: state.auth.getIn(['signup', 'open'])
})

const mapDispatchToProps = {
  updateUser,
  updateValue,
  toggleSignup,
  initSocketThunk
}

const handlerMap = {
  handleClose: props => event => {
    props.toggleSignup()
  },
  handleUpperChange: props => event => {
    props.setError('')
    props.setUsername(event.target.value)
  },
  handleLowerChange: props => event => {
    props.setError('')
    props.setPassword(event.target.value)
  },
  handleSubmit: props => event => {
    const { mutate, setError, username, password, updateUser, toggleSignup } = props
    const res = _.concat(validateUsername(username), validatePassword(password))
    if (res.length > 0) {
      setError(res.join('\n'))
    } else {
      mutate({ variables: { username, password } })
        .then((res) => {
          const { msg, user } = res.data.signup
          if (msg === 'SIGNUP_SUCCESS') {
            initSocketThunk()
            updateUser(user.id, user.username)
            toggleSignup()
          } else if (msg === 'USERNAME_DUPLICATE') {
            setError('该用户名已被注册')
          }
        })
        .catch((err) => {
          setError('注册失败，请重试')
        })
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withState('error', 'setError', ''),
  graphql(signup),
  withHandlers(handlerMap)
)(SignupDialog)
