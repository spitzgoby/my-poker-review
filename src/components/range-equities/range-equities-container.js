import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  calculateEquities,
  getEquities
} from 'modules/range-builder'
import RangeEquities from 'components/range-equities/range-equities-component'

const mapStateToProps = (state) => ({
  equities: getEquities(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    calculateEquities
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeEquities)