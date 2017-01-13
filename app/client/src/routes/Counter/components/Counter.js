import React from 'react'
import { mapPropsStream } from 'recompose'
import Rx from 'rxjs'

class Counter extends React.Component {

  static propTypes = {
    counter     : React.PropTypes.number.isRequired,
    doubleAsync : React.PropTypes.func.isRequired,
    increment   : React.PropTypes.func.isRequired
  }

  render () {
    const props = this.props
    /*
    const variables = props.relay.variables
    const data = props.data
    */
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {props.counter}</h2>
        <h2>Time elapsed: {props.time}</h2>
        <button className='btn btn-default' onClick={props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.doubleAsync}>
            Double (Async)
        </button>
      </div>
    )
  }
}

export default mapPropsStream(props =>
  Rx.Observable.from(props).combineLatest(
    Rx.Observable.interval(1000),
    (props, time) => ({...props, time })
  )
)(Counter)
