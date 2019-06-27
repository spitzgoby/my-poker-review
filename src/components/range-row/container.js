import RangeAnalyzerRow from 'components/range-row/component'
import {getMode} from 'modules/application'
import {
  clearSelectedCombosFromRange,
  deleteRange,
  getEquityForRange,
  getIsEquityPendingForRange,
  getIsRangeSelected,
  getRangeAnalysisForRange,
  getRangeById,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => ({
  equity: getEquityForRange(state, ownProps.rangeId),
  mode: getMode(state),
  pending: getIsEquityPendingForRange(state, ownProps.rangeId),
  range: getRangeById(state, ownProps.rangeId),
  rangeAnalysis: getRangeAnalysisForRange(state, ownProps.rangeId),
  selected: getIsRangeSelected(state, ownProps.rangeId)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClearButtonClick: clearSelectedCombosFromRange,
    onDelete: deleteRange,
    onNameChange: setRangeName,
    onSelect: selectRange
  }, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerRow)