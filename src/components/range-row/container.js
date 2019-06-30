import RangeAnalyzerRow from 'components/range-row/component'
import {getMode} from 'modules/application'
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

const mapStateToProps = (state, ownProps) => {
  const rangeId = ownProps.range.id

  return {
    mode: getMode(state),
    rangeAnalysis: getRangeAnalysisForRange(state, rangeId),
    selected: getIsRangeSelected(state, rangeId)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClearButtonClick: clearSelectedCombosFromRange,
    onDelete: deleteRange,
    onNameChange: setRangeName,
    onSelect: selectRange
  }, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerRow)