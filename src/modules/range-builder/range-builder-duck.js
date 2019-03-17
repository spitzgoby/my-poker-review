import {actionCreator} from 'redux-action-creator'
import {buildEquities} from 'util/equity-builder'
import comboGroups from 'lib/combo-groups'
import {createRange, ranges} from 'modules/range-builder/ranges'
import {createSelector} from 'reselect'
import {
  difference, 
  forEach, 
  find,
  map, 
  without
} from 'lodash'
import {groupComboIds} from 'util/group-combos'
import {handsFromCombos} from 'util/hands-output-builder'
import uuid from 'uuid/v4'

/*-------------*
 *** ACTIONS ***
 *-------------*/
const types = {
  ADD_RANGE: '@my-poker-review/range-builder/ADD_RANGE',
  CALCULATE_EQUITIES: '@my-poker-review/range-builder/CALCULATE_EQUITIES',
  CLEAR_SELECTED_COMBOS_FROM_RANGE: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBOS_FROM_RANGE',
  CLEAR_SELECTED_COMBO_GROUP_IDS: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBO_GROUP_IDS',
  SELECT_COMBOS: '@my-poker-review/range-builder/SELECT_COMBOS',
  SELECT_COMBO_GROUP: '@my-poker-review/range-builder/SELECT_COMBO_GROUP',
  SELECT_RANGE: '@my-poker-review/range-builder/SELECT_RANGE',
  SET_BOARD: '@my-poker-review/range-builder/SET_BOARD',
  SET_PLAYER_HAND: '@my-poker-review/range-builder/SET_PLAYER_HAND',
  SET_RANGE_NAME: '@my-poker-review/range-builder/SET_RANGE_NAME'
}

export const addRange = actionCreator(types.ADD_RANGE, 'color')
export const calculateEquities = actionCreator(types.CALCULATE_EQUITIES)
export const clearSelectedCombosFromRange = actionCreator(types.CLEAR_SELECTED_COMBOS_FROM_RANGE, 'id')
export const clearSelectedComboGroupIds = actionCreator(types.CLEAR_SELECTED_COMBO_GROUP_IDS)
export const selectCombos = actionCreator(types.SELECT_COMBOS, 'combos')
export const selectComboGroup = actionCreator(types.SELECT_COMBO_GROUP, 'id')
export const selectRange = actionCreator(types.SELECT_RANGE, 'id')
export const setBoard = actionCreator(types.SET_BOARD, 'value')
export const setPlayerHand = actionCreator(types.SET_PLAYER_HAND, 'value')
export const setRangeName = actionCreator(types.SET_RANGE_NAME, 'id', 'name')

/*-------------*
 *** REDUCER ***
 *-------------*/
const initialState = {
  board: '',
  equities: {},
  playerHand: '',
  ranges,
  selectedRangeId: find(ranges, { 'name': 'Bet' }).id
}

const updateRangeBySelectingComboGroup = (state, action) => {
  const id = action.payload.id
  const range = state.ranges[state.selectedRangeId]
  const selectedComboGroupIds = range.selectedComboGroupIds

  return {
    ...range,
    selectedComboGroupIds: selectedComboGroupIds.includes(id)
      ? selectedComboGroupIds.filter((comboGroupId) => comboGroupId !== id)
      : selectedComboGroupIds.concat([id])
  }
}

const updateRangeBySelectingCombos = (state, action) => {
  const range = state.ranges[state.selectedRangeId]
  const selectedCombos = range.selectedCombos
  let newSelectedCombos = {...selectedCombos}
  let newSelectedCombosMap = groupComboIds(action.payload.combos)

  forEach(newSelectedCombosMap, (selectedCombosList, comboGroupId) => {
    const selectedComboGroup = selectedCombos[comboGroupId] || []
    const diff = difference(selectedCombosList, selectedComboGroup) 

    if (diff.length === 0) {
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

    case types.CALCULATE_EQUITIES:
      nextState = {
        ...state,
        equities: buildEquities({
          board: state.board,
          playerHand: state.playerHand, 
          villainHands: getSelectedHands(state)
        })
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

    case types.SELECT_COMBO_GROUP:
      nextState = {
        ...state,
        ranges: {
          ...state.ranges,
          [state.selectedRangeId]: updateRangeBySelectingComboGroup(state, action)
        }
      }
      break

    case types.SELECT_COMBOS:
      nextState = {
        ...state,
        ranges: {
          ...state.ranges,
          [state.selectedRangeId]: updateRangeBySelectingCombos(state, action)
        } 
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

/*---------------------*
 *** BASIC SELECTORS ***
 *---------------------*/
export const getBoard = (state) => state.board
export const getEquities = (state) => state.equities
export const getIsComboGroupSelected = (state, id) => { 
  const selectedComboGroup = getSelectedComboIds(state)[id]
  return selectedComboGroup && selectedComboGroup.length > 0
}
export const getPlayerHand = (state) => state.playerHand
export const getRange = (state, id) => state.ranges[id]
export const getRanges = (state) => map(state.ranges, (range) => range)
export const getSelectedComboIds = (state) => getSelectedRange(state).selectedCombos
export const getSelectedRangeId = (state) => state.selectedRangeId
export const getIsRangeSelected = (state, id) => getSelectedRangeId(state) === id
export const getSelectedRange = (state) => state.ranges[getSelectedRangeId(state)]
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
export const getSelectedComboGroupIds = (state) => getSelectedRange(state).selectedComboGroupIds
export const getSelectedComboGroupIdsForRange = (state, id) => getRange(state, id).selectedComboGroupIds

/*------------------------*
 *** COMBINED SELECTORS ***
 *------------------------*/
export const getSelectedComboGroups = createSelector(
  getSelectedComboGroupIds,
  (selectedComboGroupIds) => selectedComboGroupIds.map(id => comboGroups[id])
)

export const getSelectedHands = (state) => handsFromCombos(getSelectedComboGroups(state))

