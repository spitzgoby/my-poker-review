import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar/component'
import {
  addRange,
  getIsEditing,
  getRangeColors,
  getRanges,
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
  rangeList: getRanges(state),
  selectedRangeOutput: getSelectedRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onEdit: setEditing,
    onOpenAddRangeMenu: setAddRangeMenuOpen,
    onOpenExportDialog: setExportDialogOpen,
    onOpenImportDialog: setImportDialogOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)