import AdminLayout from './components/AdminLayout'
import { injectReducer } from '../../store/reducers'
import backend from './modules/backend'
import snackbar from './modules/snackbar'

export default (store) => ({
  path : 'admin',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AdminLayout = require('./components/AdminLayout').default

      /*  Add the reducer to the store on key 'backend'  */
      injectReducer(store, { key: 'backend', reducer: backend })
      injectReducer(store, { key: 'snackbar', reducer: snackbar })

      /*  Return getComponent   */
      cb(null, AdminLayout)

    /* Webpack named bundle   */
    }, 'admin')
  }
})
