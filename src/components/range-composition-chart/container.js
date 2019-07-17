import RangeComp from 'components/range-composition-chart/component'
import {getSelectedRangeComposition} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  rangeComposition: getSelectedRangeComposition(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeComp)
