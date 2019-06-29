import EquityCell from 'components/range-row/equity-cell/component'
import {
  calculateEquity,
  getEquityForRange,
  getIsEquityPendingForRange
} from 'modules/equity'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => {
  const rangeId = ownProps.range.id

  return {
    equity: getEquityForRange(state, rangeId),
    pending: getIsEquityPendingForRange(state, rangeId)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    calculateEquity
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EquityCell)


