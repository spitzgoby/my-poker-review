import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { 
  getRangeOutput,
  selectRange
} from 'modules/range-builder'
import RangeOutput from 'components/range-output/range-output-component' 

const mapStateToProps = (state) => ({
  rangeOutput: getRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectRange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeOutput)
