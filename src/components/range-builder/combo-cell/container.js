import {bindActionCreators} from 'redux'
import ComboCell from 'components/range-builder/combo-cell/component'
import {connect} from 'react-redux'
import {
  getIsComboGroupSelected,
  getIsSelecting,
  makeGetRangeColorForComboGroup,
  selectCombos,
  setSelecting
} from 'modules/range-builder'

const mapStateToProps = (state, ownProps) => ({
  color: makeGetRangeColorForComboGroup()(state, ownProps.comboGroup.id),
  selected: getIsComboGroupSelected(state, ownProps.comboGroup.id),
  selecting: getIsSelecting(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onChangeSelecting: setSelecting,
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)