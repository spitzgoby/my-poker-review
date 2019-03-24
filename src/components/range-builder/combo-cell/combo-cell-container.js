import {bindActionCreators} from 'redux'
import ComboCell from 'components/range-builder/combo-cell/combo-cell-component'
import {connect} from 'react-redux'
import {
  makeGetRangeColorForComboGroup,
  selectCombos
} from 'modules/range-builder'

const mapStateToProps = (state, ownProps) => ({
  color: makeGetRangeColorForComboGroup()(state, ownProps.comboGroup.id)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)