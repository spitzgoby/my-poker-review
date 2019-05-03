import ImportRangeDialog from 'components/range-analyzer/toolbar/import-range-dialog/import-range-dialog-component'
import {
  getImportFile,
  getIsImportDialogOpen,
  getIsImporting,
  importRanges,
  setImportDialogOpen,
  setImportFile
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  file: getImportFile(state),
  importing: getIsImporting(state),
  open: getIsImportDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClose: setImportDialogOpen,
    onFileChange: setImportFile,
    onImport: importRanges
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportRangeDialog)
