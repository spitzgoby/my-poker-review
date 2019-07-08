import EquityAnalyzer from 'components/equity-analyzer/component'
import {getRangeIdList} from 'modules/range-builder'
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
  rangeIdList: getRangeIdList(state)  
})

export default connect(mapStateToProps)(EquityAnalyzer)
