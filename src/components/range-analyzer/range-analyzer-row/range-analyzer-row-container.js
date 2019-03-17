import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getIsRangeSelected,
  getRangeAnalysisForRange,
  selectRange,
  setRangeName
} from 'modules/range-builder'
import RangeAnalyzerRow from 'components/range-analyzer/range-analyzer-row/range-analyzer-row-component'

const mapStateToProps = (state, ownProps) => ({
  rangeAnalysis: getRangeAnalysisForRange(state, ownProps.range.id),
  selected: getIsRangeSelected(state, ownProps.range.id)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onNameChange: setRangeName,
    onSelect: selectRange
  }, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerRow)