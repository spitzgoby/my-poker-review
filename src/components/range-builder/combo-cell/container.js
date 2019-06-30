import {bindActionCreators} from 'redux'
import ComboCell from 'components/range-builder/combo-cell/component'
import {connect} from 'react-redux'
import {
  makeGetIsComboGroupSelected,
  makeGetRangesComboGroupSelection,
  getIsSelecting,
  getIsSelectingSuits,
  getRanges,
  getSelectedRangeId,
  makeGetRangeColorForComboGroup,
  selectCombos,
  setSelecting
} from 'modules/range-builder'

const mapStateToProps = (state, ownProps) => {
  const comboGroupId = ownProps.comboGroup.id

  return {
    color: makeGetRangeColorForComboGroup()(state, comboGroupId),
    ranges: getRanges(state),
    rangesComboGroupSelection: makeGetRangesComboGroupSelection(comboGroupId)(state),
    selected: makeGetIsComboGroupSelected()(state, comboGroupId),
    selectedRangeId: getSelectedRangeId(state),
    selecting: getIsSelecting(state),
    selectingSuits: getIsSelectingSuits(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onChangeSelecting: setSelecting,
    onSelect: selectCombos
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ComboCell)