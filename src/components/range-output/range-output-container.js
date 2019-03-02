import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { 
  getIsRangeSelected,
  makeGetRangeOutput,
  selectRange
} from 'modules/range-builder'
import RangeOutput from 'components/range-output/range-output-component' 

const mapStateToProps = (state, ownProps) => ({
  rangeOutput: makeGetRangeOutput()(state, ownProps.name),
  selected: getIsRangeSelected(state, ownProps.name)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectRange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeOutput)
