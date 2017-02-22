import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { updateValue, toggleSignin, updateUser } from '../../modules/auth'
import SigninDialog from './component'
import { validateUsername, validatePassword } from '../../../../util'


const login = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      msg
      user {
        id
        username
      }
    }
  }
`

const mapStateToProps = state => ({
  open: state.auth.getIn(['signin', 'open'])
})

const mapDispatchToProps = {
  updateUser,
  updateValue,
  toggleSignin
}

const handlerMap = {
  handleClose: props => event => {
    props.toggleSignin()
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
    const { mutate, setError, username, password, updateUser, toggleSignin } = props
    const res = _.concat(validateUsername(username), validatePassword(password))
    if (res.length > 0) {
      setError('用户名密码输入有误，请重试')
    } else {
      mutate({ variables: { username, password } })
        .then((res) => {
          const { msg, user } = res.data.login
          if (msg === 'LOGIN_SUCCESS') {
            updateUser(user.id, user.username)
            toggleSignin()
          } else if (msg === 'LOGIN_FAILURE') {
            setError('登录失败，请重试')
          }
        })
        .catch((err) => {
          setError('登录失败，请重试')
        })
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withState('error', 'setError', ''),
  graphql(login),
  withHandlers(handlerMap)
)(SigninDialog)
