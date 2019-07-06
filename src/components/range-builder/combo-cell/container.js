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
  selectCombos,
  setSelecting
} from 'modules/range-builder'

const mapStateToProps = (state, ownProps) => {
  const comboGroupId = ownProps.comboGroup.id

  return {
    ranges: getRanges(state),
    rangesComboGroupSelection: makeGetRangesComboGroupSelection(comboGroupId)(state),
    selected: makeGetIsComboGroupSelected(comboGroupId)(state),
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