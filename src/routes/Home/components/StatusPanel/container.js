import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { connect } from 'react-redux'

import StatusPanel from './component'
import StatusMask from '../StatusMask'
import { setModels } from '../../modules/model'


const mapStateToProps = (state) => ({
  userId: state.auth.get('userId')
})

const mapDispatchToProps = {
  setModels
}

const branchCondition = props => (!props.userId)
const branchComponent = renderComponent(withProps(
  props => ({ content: '请先登录' })
)(StatusMask))

const getModelList = gql`
  query ($userId: String!){
    modelList(userId: $userId) {
      _id
      name
      nodes
      links
      extra
    }
  }
`

const getModelListOptions = {
  options: ({ setModels, userId }) => ({
    variables: { userId },
    reducer: (prev, { type, result }) => {
      if (type === 'APOLLO_QUERY_RESULT' && result.data.modelList) {
        setTimeout(() => { setModels(result.data.modelList) }, 0)
      }
      return prev
    },
  }),
  skip: ({ userId }) => (userId === null) // skip if the user is not logged in
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getModelList, getModelListOptions),
  branch(branchCondition, branchComponent)
)(StatusPanel)
