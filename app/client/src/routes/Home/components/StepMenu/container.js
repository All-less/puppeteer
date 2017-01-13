import { connect } from 'react-redux'

import StepMenu from './component'
import { toggle } from '../../modules/menu'


const mapStateToProps = (state) => ({
  items: state.menu.items
})

const mapDispatchToProps = {
  toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(StepMenu)
