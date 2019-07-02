import ComboCell from 'components/combo-selector/combo-cell/component'
import {
  makeGetIsComboSelected,
  makeGetRangeForCombo,
  getSelectedRangeColor,
  selectCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state, ownProps) => {
  const comboId = ownProps.combo.id

  return {
    range: makeGetRangeForCombo(comboId)(state),
    selected: makeGetIsComboSelected(comboId)(state),
    selectedColor: getSelectedRangeColor(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)
