import DeleteAllDialog from 'components/range-table/header/delete-all-dialog/component'
import {
  deleteAllRanges,
  getIsDeleteAllDialogOpen,
  setDeleteAllDialogOpen
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  open: getIsDeleteAllDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    deleteAllRanges,
    setDeleteAllDialogOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAllDialog)
