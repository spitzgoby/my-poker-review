import {connect} from 'react-redux'
import Home from 'components/home/component'
import {
  getIsCompositionChartOpen,
  getMode
} from 'modules/application'

const mapStateToProps = (state) => ({
  compositionChartOpen: getIsCompositionChartOpen(state),
  mode: getMode(state)
})

export default connect(mapStateToProps)(Home)