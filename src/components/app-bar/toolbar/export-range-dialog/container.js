import Component from 'components/app-bar/toolbar/export-range-dialog/component'
import {
  exportRanges,
  getExportFileName,
  getIsExportDialogOpen,
  getRangeList,
  setExportDialogOpen,
  setExportFileName
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  fileName: getExportFileName(state),
  open: getIsExportDialogOpen(state),
  rangeList: getRangeList(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onClose: setExportDialogOpen,
    onExport: exportRanges,
    onFileChange: setExportFileName
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
