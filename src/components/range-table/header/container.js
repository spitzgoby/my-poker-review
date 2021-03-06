import RangeTableHeader from 'components/range-table/header/component'
import {getMode} from 'modules/application'
import {
  clearAll,
  getIsEditing,
  setDeleteAllDialogOpen
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  editing: getIsEditing(state),
  mode: getMode(state)
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClearCombos: clearAll,
    setDeleteAllDialogOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeTableHeader)
