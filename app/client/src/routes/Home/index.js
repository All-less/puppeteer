import { injectReducer } from '../../store/reducers'
import HomeLayout from './components/HomeLayout'
import editor from './modules/editor'
import links from './modules/links'
import nodes from './modules/nodes'
import menu from './modules/menu'

// Sync route definition
export default (store) => ({
  getComponent(next, cb) {
    injectReducer(store, { key: 'editor', reducer: editor })
    injectReducer(store, { key: 'links', reducer: links })
    injectReducer(store, { key: 'nodes', reducer: nodes })
    injectReducer(store, { key: 'menu', reducer: menu })
    cb(null, HomeLayout)
  }
})
