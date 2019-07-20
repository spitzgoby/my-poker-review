import RangeComp from 'components/range-composition-chart/component'
import {
  getSelectedRange,
  getSelectedRangeComposition,
  setHighlightedCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  rangeComposition: getSelectedRangeComposition(state),
  selectedRange: getSelectedRange(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setHighlightedCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeComp)
