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
import {types} from 'modules/range-builder/constants'
import {groupComboIds} from 'util/group-combos'
import {rangeColorList} from 'styles/colors/rangeColors'
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

const updateRangesByClearingAllSelectedCombos = (state) => {
  return reduce(state.ranges, (acc, range) => {
    acc[range.id] = {
      ...range,
      selectedCombos: {}
    }

    return acc
  }, {})
}

const updateRangesByDeletingRange = (state, action) => {
  return reduce(state.ranges, (acc, range) => {
    if (range.id !== action.payload.id) {
      acc[range.id] = range
    }

    return acc
  }, {})
}

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

const updateRangesBySelectingCombos = (state, action) => {
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

const updateSelectedRangeId = (state, action) => {
  const newSelectedRangeId = action.payload.id
  let selectedRangeId = ''

  if (!state.editing && state.selectedRangeId !== newSelectedRangeId) {
    selectedRangeId = newSelectedRangeId
  }

  return selectedRangeId
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
  addRangeMenuOpen: false,
  board: '',
  colors: rangeColorList,
  editing: false,
  equities: {},
  playerHand: '',
  ranges,
  selecting: true,
  selectedRangeId: find(ranges, { 'name': 'Bet' }).id
}

export default (state = initialState, action = {}) => {
  let nextState;

  switch(action.type) {
    case types.ADD_RANGE:
      const rangeId = uuid()

      nextState = {
        ...state,
        addRangeMenuOpen: false,
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

    case types.DELETE_RANGE: 
      nextState = {
        ...state,
        ranges: updateRangesByDeletingRange(state, action) 
      }
      break

    case types.IMPORT_RANGES_SUCCESS:
      nextState = {
        ...state,
        ranges: action.payload.reduce((acc, range) => {
          acc[range.id] = range
          return acc
        }, {}),
        selectedRangeId: action.payload[0].id
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
        selectedRangeId: updateSelectedRangeId(state, action) 
      }
      break

    case types.SET_ADD_RANGE_MENU_OPEN:
      nextState = {
        ...state,
        addRangeMenuOpen: !state.addRangeMenuOpen
      }
      break

    case types.SET_BOARD:
      nextState = {
        ...state,
        board: action.payload.value
      }
      break

    case types.SET_EDITING:
      nextState = {
        ...state,
        editing: !state.editing,
        selectedRangeId: ''
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

    case types.SET_SELECTING:
      nextState = {
        ...state,
        selecting: action.payload
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
const getSelectedRange = (state) => state.ranges[getSelectedRangeId(state)] || {}

export const getBoard = (state) => state.board
export const getEquities = (state) => state.equities
export const getIsAddRangeMenuOpen = (state) => state.addRangeMenuOpen
export const getIsComboGroupSelected = (state, id) => { 
  const selectedComboGroup = getSelectedComboIds(state)[id]
  return selectedComboGroup && selectedComboGroup.length > 0
}
export const getIsEditing = (state) => state.editing
export const getIsSelecting = (state) => state.selecting
export const getPlayerHand = (state) => state.playerHand
export const getRangeColors = (state) => state.colors
export const getRanges = (state) => map(state.ranges, (range) => range)
export const getRangeById = (state, id) => state.ranges[id]
export const getRangeForComboGroup = (state, id) => findRangeContainingComboGroup(getRanges(state), id)
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
export const getSelectedRangeId = (state) => state.selectedRangeId
export const getIsRangeSelected = (state, id) => getSelectedRangeId(state) === id
