import {map} from 'lodash'
import {actionCreator} from 'redux-action-creator'
import {buildEquities} from 'util/equity-builder'
import comboGroups from 'lib/combo-groups'
import {createSelector} from 'reselect'
import {handsFromCombos} from 'util/hands-output-builder'
import {ranges} from 'modules/range-builder/ranges'

/*-------------*
 *** ACTIONS ***
 *-------------*/
const types = {
  CALCULATE_EQUITIES: '@my-poker-review/range-builder/CALCULATE_EQUITIES',
  CLEAR_SELECTED_COMBO_GROUP_IDS: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBO_GROUP_IDS',
  SET_BOARD: '@my-poker-review/range-builder/SET_BOARD',
  SET_PLAYER_HAND: '@my-poker-review/range-builder/SET_PLAYER_HAND',
  SELECT_COMBO_GROUP: '@my-poker-review/range-builder/SELECT_COMBO_GROUP',
  SELECT_RANGE: '@my-poker-review/range-builder/SELECT_RANGE'
}

export const calculateEquities = actionCreator(types.CALCULATE_EQUITIES)
export const clearSelectedComboGroupIds = actionCreator(types.CLEAR_SELECTED_COMBO_GROUP_IDS)
export const setBoard = actionCreator(types.SET_BOARD, 'value')
export const setPlayerHand = actionCreator(types.SET_PLAYER_HAND, 'value')
export const selectComboGroup = actionCreator(types.SELECT_COMBO_GROUP, 'id')
export const selectRange = actionCreator(types.SELECT_RANGE, 'name')

/*-------------*
 *** REDUCER ***
 *-------------*/
const initialState = {
  board: '',
  equities: {},
  playerHand: '',
  ranges,
  selectedRangeName: 'Bet'
}

const updateRangeBySelectingComboGroup = (state, action) => {
  const id = action.payload.id
  const range = state.ranges[state.selectedRangeName]
  const selectedComboGroupIds = range.selectedComboGroupIds

  return {
    ...range,
    selectedComboGroupIds: selectedComboGroupIds.includes(id)
      ? selectedComboGroupIds.filter((comboGroupId) => comboGroupId !== id)
      : selectedComboGroupIds.concat([id])
  }
}

export default function(state = initialState, action = {}) {
  let nextState;

  switch(action.type) {
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
          [state.selectedRangeName]: updateRangeBySelectingComboGroup(state, action)
        }
      }
      break

    case types.SELECT_RANGE:
      nextState = {
        ...state,
        selectedRangeName: action.payload.name
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
export const getIsComboGroupSelected = (state, id) => getSelectedComboGroupIds(state).includes(id)
export const getPlayerHand = (state) => state.playerHand
export const getRange = (state, name) => state.ranges[name]
export const getRanges = (state) => map(state.ranges, (range) => range)
export const getSelectedRangeName = (state) => state.selectedRangeName
export const getIsRangeSelected = (state, name) => getSelectedRangeName(state) === name
export const getSelectedRange = (state) => state.ranges[getSelectedRangeName(state)]
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
export const getSelectedComboGroupIds = (state) => getSelectedRange(state).selectedComboGroupIds
export const getSelectedComboGroupIdsForRange = (state, name) => getRange(state, name).selectedComboGroupIds

/*------------------------*
 *** COMBINED SELECTORS ***
 *------------------------*/

export const getSelectedComboGroups = createSelector(
  getSelectedComboGroupIds,
  (selectedComboGroupIds) => selectedComboGroupIds.map(id => comboGroups[id])
)

export const getSelectedHands = (state) => handsFromCombos(getSelectedComboGroups(state))

