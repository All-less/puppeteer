import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { browserHistory, Router, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)
  const root = (
    <Provider store={store}>
      <Router history={browserHistory}
        children={routes}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store} />
    </Provider>
  )

  ReactDOM.render(
    root,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
