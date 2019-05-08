import {
  addRange,
  clearAll,
  clearAllSelectedCombos,
  getIsEditing,
  getRanges,
  setEditing
} from 'modules/range-builder'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RangeAnalyzer from 'components/range-analyzer/component'

const mapStateToProps = (state) => ({
  editing: getIsEditing(state),
  ranges: getRanges(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onClearAll: clearAll,
    onClearCombos: clearAllSelectedCombos,
    onEdit: setEditing
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeAnalyzer)