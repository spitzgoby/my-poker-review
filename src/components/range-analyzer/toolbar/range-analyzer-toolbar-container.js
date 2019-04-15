import {
  addRange,
  getRangeColors
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar/range-analyzer-toolbar-component'

const mapStateToProps = (state) => ({
  colors: getRangeColors(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)