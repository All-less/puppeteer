const interceptors = []

/**
 * Create a new interceptor that intercepts data fetched by apollo.
 *
 * @param  {Object => bool}  check
 *         a function determining whether it needs to perform 'callback'
 * @param  {(Store, Object) => Object} callback
 *         a function invoked with store and data
 */
export const intercept = (check, callback) => {
  interceptors.push({ check, callback })
}

// the following middleware will intercept data fetched by apollo
export default (store) => (next) => (action) => {
  if (action.type === 'APOLLO_QUERY_RESULT') {
    const data = action.result.data
    interceptors.forEach(({ check, callback }) => {
      if (data && check(data)) {
        callback(store, data)
      }
    })
  }
  next(action)
}
