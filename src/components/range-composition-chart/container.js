import RangeComp from 'components/range-composition-chart/component'
import {setCompositionChartOpen} from 'modules/application'
import {
  getCompositionFilters,
  getSelectedRange,
  getSelectedRangeComposition,
  setCompositionFilter,
  setHighlightedCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  compositionFilters: getCompositionFilters(state),
  rangeComposition: getSelectedRangeComposition(state),
  selectedRange: getSelectedRange(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setCompositionChartOpen,
    setCompositionFilter,
    setHighlightedCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeComp)
