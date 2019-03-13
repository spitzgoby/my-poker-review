import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  makeGetRangeOutput,
  getRangeAnalysisForRange,
  setRangeName
} from 'modules/range-builder'
import RangeAnalyzerRow from 'components/range-analyzer/range-analyzer-row/range-analyzer-row-component'

const mapStateToProps = (state, ownProps) => ({
  rangeAnalysis: getRangeAnalysisForRange(state, ownProps.range.id),
  rangeOutput: makeGetRangeOutput()(state, ownProps.range.id)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onNameChange: setRangeName
  }, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerRow)