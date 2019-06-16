import RangeAnalyzerRow from 'components/range-row/component'
import {
  clearSelectedCombosFromRange,
  deleteRange,
  getIsRangeSelected,
  getRangeAnalysisForRange,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => ({
  equity: null,
  rangeAnalysis: getRangeAnalysisForRange(state, ownProps.range.id),
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