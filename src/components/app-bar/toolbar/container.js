import RangeAnalyzerToolbar from 'components/app-bar/toolbar/component'
import {
  getInputMode,
  getMode,
  setInputMode,
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
  inputMode: getInputMode(state),
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
    setInputMode,
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)