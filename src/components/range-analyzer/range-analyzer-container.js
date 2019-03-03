import {connect} from 'react-redux'
import {getRanges} from 'modules/range-builder'
import RangeAnalyzer from 'components/range-analyzer/range-analyzer-component'

const mapStateToProps = (state) => ({
  ranges: getRanges(state)
})

export default connect(mapStateToProps)(RangeAnalyzer)