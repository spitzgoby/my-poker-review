import RangeAnalyzerRow from 'components/range-row/component'
import {getMode} from 'modules/application'
import {
  clearSelectedCombosFromRange,
  deleteRange,
  getIsRangeSelected,
  getRangeAnalysisForRange,
  getRangeById,
  makeGetEquityForRange,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => ({
  equity: makeGetEquityForRange()(state, ownProps.rangeId),
  mode: getMode(state),
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