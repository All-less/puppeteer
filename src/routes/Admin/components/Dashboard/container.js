import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Dashboard from './component'
import { toggleModal } from '../../modules/backend'

const mapDispathToProps = {
  toggleModal
}

export default compose(
  connect(null, mapDispathToProps)
)(Dashboard)
