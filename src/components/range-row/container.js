import RangeAnalyzerRow from 'components/range-row/component'
import {getMode} from 'modules/application'
import {
  clearSelectedCombosFromRange,
  deleteRange,
  getIsRangeSelected,
  getRangeAnalysisForRange,
  makeGetEquityForRange,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state, ownProps) => ({
  equity: makeGetEquityForRange()(state, ownProps.range.id),
  mode: getMode(state),
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