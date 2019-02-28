import { 
  getRangeOutput
} from 'modules/range-builder'
import { connect } from 'react-redux'
import RangeOutput from 'components/range-output/range-output-component' 

const mapStateToProps = (state) => ({
  rangeOutput: getRangeOutput(state)
})

export default connect(mapStateToProps)(RangeOutput)
