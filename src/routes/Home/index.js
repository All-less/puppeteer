import { injectReducer } from '../../store/reducers'
import HomeLayout from './components/HomeLayout'
import editor from './modules/editor'
import links from './modules/links'
import nodes from './modules/nodes'
import menu from './modules/menu'
import auth from './modules/auth'
import model from './modules/model'
import socket from './modules/socket'

// Sync route definition
export default store => ({
  getComponent(next, cb) {
    injectReducer(store, { key: 'editor', reducer: editor })
    injectReducer(store, { key: 'links', reducer: links })
    injectReducer(store, { key: 'nodes', reducer: nodes })
    injectReducer(store, { key: 'menu', reducer: menu })
    injectReducer(store, { key: 'auth', reducer: auth })
    injectReducer(store, { key: 'model', reducer: model })
    injectReducer(store, { key: 'socket', reducer: socket })
    cb(null, HomeLayout)
  }
})
