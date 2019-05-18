import ComboCell from 'components/card-selector/combo-cell/component'
import {
  makeGetRangeColorForCombo,
  getIsComboSelected,
  getSelectedRangeColor,
  selectCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state, ownProps) => ({
  color: makeGetRangeColorForCombo()(state, ownProps.combo.id),
  selected: getIsComboSelected(state, ownProps.combo.id),
  selectedColor: getSelectedRangeColor(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)
