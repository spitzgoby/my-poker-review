import RangeAnalyzerToolbar from 'components/app-bar/toolbar/component'
import {
  getMode,
  setMode
} from 'modules/application'
import {
  addRange,
  getIsEditing,
  getRangeColors,
  getSelectedRangeOutput,
  setAddRangeMenuOpen,
  setEditing,
  setExportDialogOpen,
  setImportDialogOpen
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  colors: getRangeColors(state),
  editing: getIsEditing(state),
  mode: getMode(state),
  selectedRangeOutput: getSelectedRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onEdit: setEditing,
    onOpenAddRangeMenu: setAddRangeMenuOpen,
    onOpenExportDialog: setExportDialogOpen,
    onOpenImportDialog: setImportDialogOpen,
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)