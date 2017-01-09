import React from 'react'
import { browserHistory, Router, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'


class AppContainer extends React.Component {
  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const children = this.props.children
    return (
      <div style={{ height: '100%' }}>
        {children}
      </div>
    )
  }
}

export default AppContainer
