import RangeTableHeader from 'components/range-table/header/component'
import {getMode} from 'modules/application'
import {
  clearAllSelectedCombos,
  getIsEditing
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  editing: getIsEditing(state),
  mode: getMode(state)
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClearCombos: clearAllSelectedCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeTableHeader)
