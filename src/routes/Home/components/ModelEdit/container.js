import { compose, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ModelEdit from './component'
import { addModel, updateModel, setModelEditValue } from '../../modules/model'


const mapStateToProps = state => ({
  curName: state.model.curName,
  curId: state.model.curId,
  userId: state.auth.get('userId'),
  value: state.model.editValue
})

// Don't use 'mapDispatchToProps' as we need 'dispatch'.
// If needed, please define it in 'createProps' below.

const createModelMutation = gql`
  mutation (
    $userId: String!, $name: String!, $links: String!,
    $nodes: String!, $extra: String
  ) {
    createModel(userId: $userId, model: {
      name: $name,
      links: $links,
      nodes: $nodes,
      extra: $extra
    }) {
      _id
      name
      nodes
      links
      extra
    }
  }
`

const updateModelMutation = gql`
  mutation(
    $id: String!, $name: String!, $links: String!,
    $nodes: String!, $extra: String
  ) {
    updateModel(id: $id, model: {
      name: $name
      links: $links
      nodes: $nodes
      extra: $extra
    }) {
      _id
      name
      nodes
      links
      extra
    }
  }
`

const createProps = ({
  dispatch, mutateCreateModel, mutateUpdateModel,
  value, userId, curId
}) => ({
  saveModel: () => {
    dispatch((dispatch, getState) => {
      const { links, nodes, model } = getState()
      const modelMixin = {
        name: value,
        links: JSON.stringify(links),
        nodes: JSON.stringify(nodes),
        extra: model.extra
      }
      if (curId) {
        mutateUpdateModel({ variables: { id: curId, ...modelMixin } })
          .then((res) => { dispatch(updateModel(res.data.updateModel)) })
          .catch((err) => { console.error(err) })
      } else {
        mutateCreateModel({ variables: { userId, ...modelMixin } })
          .then((res) => { dispatch(addModel(res.data.createModel)) })
          .catch((err) => { console.error(err) })
      }
    })
  },
  setModelEditValue: (value) => {
    dispatch(setModelEditValue(value))
  }
})

const handlersMap = {
  handleChange: ({ setModelEditValue }) => (event, value) => {
    setModelEditValue(value)
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(createModelMutation, { name: 'mutateCreateModel' }),
  graphql(updateModelMutation, { name: 'mutateUpdateModel' }),
  withProps(createProps),
  withHandlers(handlersMap)
)(ModelEdit)
