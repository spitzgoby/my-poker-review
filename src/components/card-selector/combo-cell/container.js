import ComboCell from 'components/card-selector/combo-cell/component'
import {
  getIsComboSelected,
  getRangeColorForCombo,
  getSelectedRangeColor,
  selectCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state, ownProps) => ({
  color: getRangeColorForCombo(state, ownProps.combo.id),
  selected: getIsComboSelected(state, ownProps.combo.id),
  selectedColor: getSelectedRangeColor(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)
