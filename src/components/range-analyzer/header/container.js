import RangeAnalyzerHeader from 'components/range-analyzer/header/component'
import {
  clearAllSelectedCombos,
  getIsEditing,
  setEditing
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  editing: getIsEditing(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onEdit: setEditing,
    onClearCombos: clearAllSelectedCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerHeader)
