import {
  difference, 
  forEach, 
  reduce,
  without
} from 'lodash'
import {
  calculateEquity,
  getRangeBuilderState
} from 'modules/range-builder'
import {types} from 'modules/range-builder/constants'
import {groupComboIds} from 'util/group-combos'

const updateRangeBySelectingCombos = (range, combos, select, selected) => {
  const selectedCombos = range.selectedCombos
  let newSelectedCombos = {...selectedCombos}
  let newSelectedCombosMap = groupComboIds(combos)

  forEach(newSelectedCombosMap, (selectedCombosList, comboGroupId) => {
    const selectedComboGroup = selectedCombos[comboGroupId] || []
    const diff = difference(selectedCombosList, selectedComboGroup) 

    if (!select || !selected) {
      newSelectedCombos[comboGroupId] = without(selectedComboGroup, ...selectedCombosList)
    } else {
      newSelectedCombos[comboGroupId] = selectedComboGroup.concat(diff)
    }
  })

  return {
    ...range,
    selectedCombos: newSelectedCombos
  }
}

export const updateRangesBySelectingCombos = (state, payload) => {
  const {
    combos,
    select
  } = payload

  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = updateRangeBySelectingCombos(
      range, 
      combos, 
      select,
      range.id === state.selectedRangeId)

    return acc
  }, {})
}

export const selectCombos = (payload) => (dispatch, getState) => {
  const rangeBuilderState = getRangeBuilderState(getState())
  const ranges = updateRangesBySelectingCombos(rangeBuilderState, payload)  

  dispatch({
    type: types.SELECT_COMBOS,
    payload: ranges
  })

  dispatch(calculateEquity(rangeBuilderState.boardCards, rangeBuilderState.handCards, ranges))
}