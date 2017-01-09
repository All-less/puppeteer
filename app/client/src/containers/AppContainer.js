import React, { Component, PropTypes } from 'react'
import { browserHistory, Router, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import AppContainerQuery from './AppContainerQuery'
import Relay from 'react-relay'
import useRelay from 'react-router-relay';


class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
            <div style={{ height: '100%' }}>
              <Router history={browserHistory}
                      children={routes}
                      render={applyRouterMiddleware(useRelay)}
                      environment={Relay.Store}/>
            </div>
      </Provider>
    )
  }
}

export default AppContainer
