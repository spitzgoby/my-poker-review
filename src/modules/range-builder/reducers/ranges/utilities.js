import {combos} from 'lib/combos'
import {STREETS} from 'lib/poker-constants'
import {
  difference, 
  forEach, 
  reduce,
  without
} from 'lodash'
import {types} from 'modules/range-builder/constants'
import {actionCreator} from 'redux-action-creator'
import {groupComboIds} from 'util/group-combos'
import uuid from 'uuid/v4'

export const addRange = actionCreator(types.ADD_RANGE, 'color')
export const clearAllSelectedCombos = actionCreator(types.CLEAR_ALL_SELECTED_COMBOS)
export const clearSelectedCombosFromRange = actionCreator(types.CLEAR_SELECTED_COMBOS_FROM_RANGE, 'id')
export const clearSelectedComboGroupIds = actionCreator(types.CLEAR_SELECTED_COMBO_GROUP_IDS)
export const deleteRange = actionCreator(types.DELETE_RANGE, 'id')
export const selectCombos = actionCreator(types.SELECT_COMBOS, 'combos', 'select')
export const selectRange = actionCreator(types.SELECT_RANGE, 'id')
export const setBoard = actionCreator(types.SET_BOARD, 'value')
export const setEditing = actionCreator(types.SET_EDITING)
export const setPlayerHand = actionCreator(types.SET_PLAYER_HAND, 'value')
export const setRangeName = actionCreator(types.SET_RANGE_NAME, 'id', 'name')

/*----------------*
 * DEFAULT RANGES *
 *----------------*/

const rangeInfo = [{
  name: 'Bet',
  color: 'blue'
},{
  name: 'Call',
  color: 'green'
},{
  name: 'Raise',
  color: 'purple'
}]

/*------------------*
 * HELPER FUNCTIONS *
 *------------------*/

export const createRange = (info, id) => {
  const rangeId = id || uuid() 

  return {
    id: rangeId,
    color: info.color,
    name: info.name,
    selectedCombos: {}
  }
}

const buildRanges = (rangeInfo) => {
  return rangeInfo.reduce((acc, info) => {
    const range = createRange(info)
    acc[range.id] = range

    return acc
  }, {})
}

export const updateBoardCards = (state, action) => {
  const {
    card,
    index,
    street
  } = action.payload
  const boardCards = [...state.boardCards]
  let absoluteIndex = STREETS[street].index + index

  if (absoluteIndex < boardCards.length) {
    boardCards[absoluteIndex] = card
  } else {
    boardCards.push(card)
  }

  return boardCards
}

export const updateDeadCards = (boardCards, handCards) => {
  return boardCards.concat(handCards).reduce((acc, card) => {
    acc[card.id] = card

    return acc
  }, {})
}

export const updateHandCards = (state, action) => {
  const {
    card,
    index
  } = action.payload
  const handCards = [...state.handCards]

  if (index < handCards.length) {
    handCards[index] = card
  } else {
    handCards.push(card)
  }

  return handCards
}

export const ranges = buildRanges(rangeInfo)

export const updateRangesByClearingAllSelectedCombos = (state) => {
  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = {
      ...range,
      selectedCombos: {}
    }

    return acc
  }, {})
}

export const updateRangesByDeletingRange = (state, action) => {
  return reduce(state.ranges, (acc, range) => {
    if (range.id !== action.payload.id) {
      acc[range.id] = range
    }

    return acc
  }, {})
}

export const updateRangeBySelectingCombos = (range, combos, select, selected) => {
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

export const updateRangesBySelectingCombos = (state, action) => {
  const {
    payload: {
      combos,
      select
    }
  } = action

  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = updateRangeBySelectingCombos(
      range, 
      combos, 
      select,
      range.id === state.selectedRangeId)

    return acc
  }, {})
}

export const updateSelectedRangeId = (state, action) => {
  const newSelectedRangeId = action.payload.id
  let selectedRangeId = ''

  if (state.selectedRangeId !== newSelectedRangeId) {
    selectedRangeId = newSelectedRangeId
  }

  return selectedRangeId
}

export const findRangeContainingCombo = (ranges, comboId) => {
  const combo = combos[comboId] 
  let index = 0
  let range

  while(!range && index < ranges.length) {
    const selectedCombos = ranges[index].selectedCombos[combo.comboGroupId]

    if (selectedCombos && selectedCombos.includes(comboId)) {
      range = ranges[index]
    }

    index++
  } 

  return range
}

export const findRangeContainingComboGroup = (ranges, comboGroupId) => {
  let index = 0
  let range

  while (!range && index < ranges.length) {
    const selectedCombos = ranges[index].selectedCombos[comboGroupId]

    if (selectedCombos && selectedCombos.length) {
      range = ranges[index]  
    }

    index++
  }

  return range
}