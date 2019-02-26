import {actionCreator} from 'redux-action-creator'
import {buildCombos} from 'util/combo-builder'
import {buildEquities} from 'util/equity-builder'
import {createSelector} from 'reselect'
import {handsFromCombos} from 'util/hands-output-builder'
import {rangeFromCombos} from 'util/range-output-builder'

/*-------------*
 *** ACTIONS ***
 *-------------*/
const types = {
  CALCULATE_EQUITIES: '@my-poker-review/range-builder/CALCULATE_EQUITIES',
  CLEAR_SELECTED_COMBO_IDS: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBO_IDS',
  SET_BOARD: '@my-poker-review/range-builder/SET_BOARD',
  SET_PLAYER_HAND: '@my-poker-review/range-builder/SET_PLAYER_HAND',
  SELECT_COMBO: '@my-poker-review/range-builder/SELECT_COMBO'
}

export const calculateEquities = actionCreator(types.CALCULATE_EQUITIES)
export const clearSelectedComboIds = actionCreator(types.CLEAR_SELECTED_COMBO_IDS)
export const setBoard = actionCreator(types.SET_BOARD)
export const setPlayerHand = actionCreator(types.SET_PLAYER_HAND, 'value')
export const selectCombo = actionCreator(types.SELECT_COMBO, 'id')

/*-------------*
 *** REDUCER ***
 *-------------*/
let {
  comboIds,
  entities
} = buildCombos()

const initialState = {
  board: '',
  comboIds,
  entities,
  equities: {},
  playerHand: '',
  selectedComboIds: []
}

export default function(state = initialState, action = {}) {
  let nextState;

  switch(action.type) {
    case types.CALCULATE_EQUITIES:
      nextState = {
        ...state,
        equities: buildEquities(state.playerHand, getSelectedHands(state))
      }
      break

    case types.CLEAR_SELECTED_COMBO_IDS:
      nextState = {
        ...state,
        selectedComboIds: []
      }
      break

    case types.SELECT_COMBO:
      nextState = {
        ...state,
        selectedComboIds: state.selectedComboIds.includes(action.payload.id)
          ? state.selectedComboIds.filter(id => id !== action.payload.id)
          : state.selectedComboIds.concat([action.payload.id])
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
export const getCombo = (state, id) => state.entities[id]
export const getCombos = (state) => state.entities
export const getComboIds = (state) => state.comboIds
export const getEquities = (state) => state.equities
export const getIsComboSelected = (state, id) => state.selectedComboIds.includes(id)
export const getPlayerHand = (state) => state.playerHand
export const getSelectedComboIds = (state) => state.selectedComboIds

/*------------------------*
 *** COMBINED SELECTORS ***
 *------------------------*/
export const getSelectedCombos = createSelector(
  getCombos,
  getSelectedComboIds,
  (combos, selectedComboIds) => selectedComboIds.map(id => combos[id])
)
export const getSelectedHands = (state) => handsFromCombos(getSelectedCombos(state))
export const getRangeOutput = (state) => rangeFromCombos(getSelectedCombos(state))
