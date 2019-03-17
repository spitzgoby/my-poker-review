import {
  addRange,
  getRanges,
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RangeAnalyzer from 'components/range-analyzer/range-analyzer-component'

const mapStateToProps = (state) => ({
  ranges: getRanges(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzer)