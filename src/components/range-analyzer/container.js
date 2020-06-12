import EquityAnalyzer from './component'
import { 
  getMode,
  setMode
} from 'modules/application'
import {
  startQuiz
} from 'modules/quiz'
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
    setMode,
    setSelectRangeDialogOpen,
    startQuiz
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EquityAnalyzer)
