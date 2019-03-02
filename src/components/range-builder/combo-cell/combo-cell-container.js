import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ComboCell from 'components/range-builder/combo-cell/combo-cell-component'
import {
  getCombo, 
  getIsComboSelected, 
  getSelectedRangeColor,
  selectCombo
} from 'modules/range-builder'

const mapStateToProps = (state, ownProps) => ({
  color: getSelectedRangeColor(state),
  combo: getCombo(state, ownProps.comboId),
  selected: getIsComboSelected(state, ownProps.comboId)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectCombo
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)