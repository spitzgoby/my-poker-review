import {actionCreator} from 'redux-action-creator'
import {createRange, ranges} from 'modules/range-builder/ranges'
import {
  difference, 
  forEach, 
  find,
  map, 
  reduce,
  without
} from 'lodash'
import {groupComboIds} from 'util/group-combos'
import uuid from 'uuid/v4'

/*---------*
 * ACTIONS *
 *---------*/

const types = {
  ADD_RANGE: '@my-poker-review/range-builder/ADD_RANGE',
  CLEAR_ALL_SELECTED_COMBOS: '@my-poker-review/range-builder/CLEAR_ALL_SELECTED_COMBOS',
  CLEAR_SELECTED_COMBOS_FROM_RANGE: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBOS_FROM_RANGE',
  CLEAR_SELECTED_COMBO_GROUP_IDS: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBO_GROUP_IDS',
  SELECT_COMBOS: '@my-poker-review/range-builder/SELECT_COMBOS',
  SELECT_RANGE: '@my-poker-review/range-builder/SELECT_RANGE',
  SET_BOARD: '@my-poker-review/range-builder/SET_BOARD',
  SET_PLAYER_HAND: '@my-poker-review/range-builder/SET_PLAYER_HAND',
  SET_RANGE_NAME: '@my-poker-review/range-builder/SET_RANGE_NAME'
}

export const addRange = actionCreator(types.ADD_RANGE, 'color')
export const clearAllSelectedCombos = actionCreator(types.CLEAR_ALL_SELECTED_COMBOS)
export const clearSelectedCombosFromRange = actionCreator(types.CLEAR_SELECTED_COMBOS_FROM_RANGE, 'id')
export const clearSelectedComboGroupIds = actionCreator(types.CLEAR_SELECTED_COMBO_GROUP_IDS)
export const selectCombos = actionCreator(types.SELECT_COMBOS, 'combos')
export const selectRange = actionCreator(types.SELECT_RANGE, 'id')
export const setBoard = actionCreator(types.SET_BOARD, 'value')
export const setPlayerHand = actionCreator(types.SET_PLAYER_HAND, 'value')
export const setRangeName = actionCreator(types.SET_RANGE_NAME, 'id', 'name')


/*---------*
 * HELPERS *
 *---------*/

const updateRangesByClearingAllSelectedCombos = (state) => {
  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = {
      ...range,
      selectedCombos: {}
    }

    return acc
  }, {})
}

const updateRangeBySelectingCombos = (range, combos, selected) => {
  const selectedCombos = range.selectedCombos
  let newSelectedCombos = {...selectedCombos}
  let newSelectedCombosMap = groupComboIds(combos)

  forEach(newSelectedCombosMap, (selectedCombosList, comboGroupId) => {
    const selectedComboGroup = selectedCombos[comboGroupId] || []
    const diff = difference(selectedCombosList, selectedComboGroup) 

    if (diff.length === 0 || !selected) {
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

const updateRangesBySelectingCombos = (state, action) => {
  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = updateRangeBySelectingCombos(range, action.payload.combos, range.id === state.selectedRangeId)

    return acc
  }, {})
}

const findRangeContainingComboGroup = (ranges, comboGroupId) => {
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

/*---------*
 * REDUCER *
 *---------*/

const initialState = {
  board: '',
  equities: {},
  playerHand: '',
  ranges,
  selectedRangeId: find(ranges, { 'name': 'Bet' }).id
}

export default function(state = initialState, action = {}) {
  let nextState;

  switch(action.type) {
    case types.ADD_RANGE:
      const rangeId = uuid()

      nextState = {
        ...state,
        ranges: {
          ...state.ranges,
          [rangeId]: createRange({
            color: action.payload.color,
            name: action.payload.color,
          }, rangeId)
        }
      }
      break

    case types.CLEAR_ALL_SELECTED_COMBOS:
      nextState = {
        ...state,
        ranges: updateRangesByClearingAllSelectedCombos(state)
      }
      break

    case types.CLEAR_SELECTED_COMBOS_FROM_RANGE:
      nextState = {
        ...state,
        ranges: {
          ...state.ranges,
          [action.payload.id]: {
            ...state.ranges[action.payload.id],
            selectedCombos: {}
          }
        }
      }
      break

    case types.CLEAR_SELECTED_COMBO_GROUP_IDS:
      nextState = {
        ...state,
        selectedComboIds: []
      }
      break

    case types.SELECT_COMBOS:
      nextState = {
        ...state,
        ranges: updateRangesBySelectingCombos(state, action)
      }
      break

    case types.SELECT_RANGE:
      nextState = {
        ...state,
        selectedRangeId: action.payload.id
      }
      break

    case types.SET_BOARD:
      nextState = {
        ...state,
        board: action.payload.value
      }
      break

    case types.SET_PLAYER_HAND:
      nextState = {
        ...state,
        playerHand: action.payload.value
      }
      break

    case types.SET_RANGE_NAME:
      nextState = {
        ...state,
        ranges: {
          ...state.ranges,
          [action.payload.id]: {
            ...state.ranges[action.payload.id],
            name: action.payload.name
          }
        }
      }
      break

    default:
      nextState = state
  }

  return nextState;
}

/*-----------*
 * SELECTORS *
 *-----------*/

const getSelectedComboIds = (state) => getSelectedRange(state).selectedCombos
const getSelectedRange = (state) => state.ranges[getSelectedRangeId(state)]

export const getBoard = (state) => state.board
export const getEquities = (state) => state.equities
export const getIsComboGroupSelected = (state, id) => { 
  const selectedComboGroup = getSelectedComboIds(state)[id]
  return selectedComboGroup && selectedComboGroup.length > 0
}
export const getPlayerHand = (state) => state.playerHand
export const getRanges = (state) => map(state.ranges, (range) => range)
export const getRangeById = (state, id) => state.ranges[id]
export const getSelectedRangeId = (state) => state.selectedRangeId
export const getIsRangeSelected = (state, id) => getSelectedRangeId(state) === id
export const getRangeForComboGroup = (state, id) => findRangeContainingComboGroup(getRanges(state), id)
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
