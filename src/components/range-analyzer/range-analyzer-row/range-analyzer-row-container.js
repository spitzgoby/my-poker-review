import {connect} from 'react-redux'
import {
  makeGetRangeOutput,
  getRangeAnalysisForRangeNamed
} from 'modules/range-builder'
import RangeAnalyzerRow from 'components/range-analyzer/range-analyzer-row/range-analyzer-row-component'

const mapStateToProps = (state, ownProps) => ({
  rangeAnalysis: getRangeAnalysisForRangeNamed(state, ownProps.range.name),
  rangeOutput: makeGetRangeOutput()(state, ownProps.range.name)
})

export default connect(mapStateToProps)(RangeAnalyzerRow)