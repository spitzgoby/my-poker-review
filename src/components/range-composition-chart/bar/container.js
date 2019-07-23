import RangeCompositionChartBar from 'components/range-composition-chart/bar/component'
import {
  getSelectedRange,
  setHighlightedCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  selectedRange: getSelectedRange(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setHighlightedCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeCompositionChartBar)

