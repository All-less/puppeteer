import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import '../../styles/core.scss'


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
