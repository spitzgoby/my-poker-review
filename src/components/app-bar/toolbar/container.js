import RangeAnalyzerToolbar from 'components/app-bar/toolbar/component'
import {
  getInputMode,
  getIsCompositionChartOpen,
  getMode,
  setCompositionChartOpen,
  setInputMode,
  setMode
} from 'modules/application'
import {
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
  compositionChartOpen: getIsCompositionChartOpen(state),
  editing: getIsEditing(state),
  inputMode: getInputMode(state),
  mode: getMode(state),
  selectedRangeOutput: getSelectedRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onEdit: setEditing,
    onOpenAddRangeMenu: setAddRangeMenuOpen,
    onOpenExportDialog: setExportDialogOpen,
    onOpenImportDialog: setImportDialogOpen,
    setCompositionChartOpen,
    setInputMode,
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)