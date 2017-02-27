import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ModelTrain from './component'
import { toggleRunning, clearRes } from '../../modules/model'


const mapStateToProps = (state) => ({
  curName: state.model.curName,
  running: state.model.running,
  res: state.model.res
})

const runModel = gql`
  mutation ($name: String!, $links: String!, $nodes: String!) {
    runModel(model: {
      name: $name
      links: $links
      nodes: $nodes
    })
  }
`

const createProps = ({ dispatch, mutate, curName }) => ({
  runModelThunk: () => {
    dispatch((dispatch, getState) => {
      const { links, nodes } = getState()
      const variables = {
        name: curName || 'name',
        links: JSON.stringify(links),
        nodes: JSON.stringify(nodes)
      }
      mutate({ variables })
        .then((res) => {
          dispatch(clearRes())
          dispatch(toggleRunning(true))
        })
    })
  }
})

const handlersMap = {
  handleRun: ({ runModelThunk }) => event => {
    runModelThunk()
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(runModel),
  withProps(createProps),
  withHandlers(handlersMap)
)(ModelTrain)
