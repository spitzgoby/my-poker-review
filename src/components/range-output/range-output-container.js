import { bindActionCreators } from 'redux'
import { 
  clearSelectedComboIds,
  getRangeOutput
} from 'modules/range-builder'
import { connect } from 'react-redux'
import RangeOutput from 'components/range-output/range-output-component' 

const mapStateToProps = (state) => ({
  rangeOutput: getRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearSelectedComboIds
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeOutput)
