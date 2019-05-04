import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar/component'
import {
  addRange,
  getRangeColors,
  getRanges,
  setExportDialogOpen,
  setImportDialogOpen
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  colors: getRangeColors(state),
  ranges: getRanges(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onOpenExportDialog: setExportDialogOpen,
    onOpenImportDialog: setImportDialogOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)