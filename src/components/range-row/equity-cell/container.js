import EquityCell from 'components/range-row/equity-cell/component'
import {
  calculateEquity,
  getEquityForRange,
  getIsEquityPendingForRange,
} from 'modules/equity'
import {makeGetCanEquityBeCalculatedForRange} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => {
  const rangeId = ownProps.range.id

  return {
    calculable: makeGetCanEquityBeCalculatedForRange()(state, rangeId),
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


