import {
  addRange,
  getExportFileName,
  getRangeColors,
  getRanges,
  importRanges,
  setExportFileName
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar/range-analyzer-toolbar-component'

const mapStateToProps = (state) => ({
  colors: getRangeColors(state),
  exportFileName: getExportFileName(state),
  ranges: getRanges(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onChangeFileName: setExportFileName,
    onFileImport: importRanges
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzerToolbar)