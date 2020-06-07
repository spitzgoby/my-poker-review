import EquityAnalyzer from 'components/equity-analyzer/component'
import { getMode } from 'modules/application'
import {
  getRangeIdList,
  setSelectRangeDialogOpen
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  mode: getMode(state),
  rangeIdList: getRangeIdList(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setSelectRangeDialogOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EquityAnalyzer)
