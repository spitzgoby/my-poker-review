import {bindActionCreators} from 'redux'
import {
  clearSelectedCombosFromRange,
  deleteRange,
  getIsRangeSelected,
  getRangeAnalysisForRange,
  makeGetOutputForRange,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeAnalyzerRow from 'components/range-analyzer/row/range-analyzer-row-component'

const mapStateToProps = (state, ownProps) => ({
  rangeAnalysis: getRangeAnalysisForRange(state, ownProps.range.id),
  rangeOutput: makeGetOutputForRange()(state, ownProps.range.id),
  selected: getIsRangeSelected(state, ownProps.range.id)
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