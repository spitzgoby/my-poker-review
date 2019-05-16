import ComboCell from 'components/card-selector/combo-cell/component'
import {
  getIsComboSelected,
  selectCombos
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state, ownProps) => ({
  selected: getIsComboSelected(state, ownProps.combo.id)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)
