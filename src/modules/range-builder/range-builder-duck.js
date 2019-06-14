import {STREETS} from 'lib/poker-constants'
import {
  find,
  map
} from 'lodash'
import {types} from 'modules/range-builder/constants'
import {createRange, ranges} from 'modules/range-builder/ranges'
import {
  findRangeContainingCombo,
  findRangeContainingComboGroup,
  updateBoardCards,
  updateDeadCards,
  updateHandCards,
  updateRangesByClearingAllSelectedCombos,
  updateRangesByDeletingRange,
  updateRangesBySelectingCombos,
} from 'modules/range-builder/reducers/ranges/utilities'
import {actionCreator} from 'redux-action-creator'
import {rangeColorList} from 'styles/colors/range-colors'
import {
  cardify,
  stringify
} from 'util/card-parser'
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

const updateSelectedRangeId = (state, action) => {
  const newSelectedRangeId = action.payload.id
  let selectedRangeId = ''

  if (state.selectedRangeId !== newSelectedRangeId) {
    selectedRangeId = newSelectedRangeId
  }

  return selectedRangeId
}

/*---------*
 * REDUCER *
 *---------*/

const initialState = {
  addRangeMenuOpen: false,
  board: '',
  boardCards: [],
  colors: rangeColorList,
  deadCards: {},
  editing: false,
  hand: '',
  handCards: [],
  playerHand: '',
  ranges,
  selecting: true,
  selectingSuits: false,
  selectedRangeId: find(ranges, { 'name': 'Villain' }).id
}

export default (state = initialState, action = {}) => {
  let boardCards
  let handCards
  let nextState

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
        },
        selectedRangeId: rangeId
      }
      break

    case types.CLEAR_ALL:
      nextState = {
        ...state,
        board: '',
        boardCards: [],
        deadCards: {},
        hand: '',
        handCards: [],
        ranges: updateRangesByClearingAllSelectedCombos(state)
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

    case types.SELECT_BOARD_CARDS:
      boardCards = updateBoardCards(state, action)

      nextState = {
        ...state,
        board: stringify(boardCards),
        boardCards,
        deadCards: updateDeadCards(boardCards, state.handCards)
      }
      break

    case types.SELECT_COMBOS:
      nextState = {
        ...state,
        ranges: updateRangesBySelectingCombos(state, action)
      }
      break

    case types.SELECT_HAND_CARDS:
      handCards = updateHandCards(state, action)

      nextState = {
        ...state,
        deadCards: updateDeadCards(state.boardCards, handCards),
        hand: stringify(handCards),
        handCards: handCards
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
      boardCards = cardify(action.payload.value)
        .filter((card) => !find(state.handCards, 
          (handCard) => handCard.id === card.id))

      nextState = {
        ...state,
        board: action.payload.value,
        boardCards,
        deadCards: updateDeadCards(boardCards, state.handCards)
      }
      break

    case types.SET_EDITING:
      nextState = {
        ...state,
        editing: !state.editing
      }
      break

    case types.SET_HAND:
      handCards = cardify(action.payload)
        .filter((card) => !find(state.boardCards, 
          (boardCard) => boardCard.id === card.id))

      nextState = {
        ...state,
        deadCards: updateDeadCards(state.boardCards, handCards),
        hand: action.payload,
        handCards
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

    case types.SET_SELECTING_SUITS:
      nextState = {
        ...state,
        selectingSuits: !state.selectingSuits
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

const getSelectedRange = (state) => state.ranges[getSelectedRangeId(state)] || {}

export const getBoard = (state) => state.board
export const getBoardCards = (state) => state.boardCards
export const getCardsForStreet = (state, street) => {
  const boardCards = getBoardCards(state)
  const {
    index,
    count
  } = STREETS[street]

  return boardCards.slice(index, index + count)
}
export const getDeadCards = (state) => state.deadCards
export const getHand = (state) => state.hand
export const getHandCards = (state) => state.handCards
export const getIsAddRangeMenuOpen = (state) => state.addRangeMenuOpen
export const getIsComboSelected = (state, id) => !!findRangeContainingCombo(getRanges(state), id)
export const getIsEditing = (state) => state.editing
export const getIsSelecting = (state) => state.selecting
export const getIsSelectingSuits = (state) => state.selectingSuits
export const getPlayerHand = (state) => state.playerHand
export const getRangeColors = (state) => state.colors
export const getRanges = (state) => map(state.ranges, (range) => range)
export const getRangeById = (state, id) => state.ranges[id]
export const getRangeColorForCombo = (state, id) => {
  const range = findRangeContainingCombo(getRanges(state), id)

  return range ? range.color : ''
}
export const getRangeForCombo = (state, id) => findRangeContainingCombo(getRanges(state), id)
export const getRangeForComboGroup = (state, id) => findRangeContainingComboGroup(getRanges(state), id)
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
export const getSelectedRangeId = (state) => state.selectedRangeId
export const getIsRangeSelected = (state, id) => getSelectedRangeId(state) === id
