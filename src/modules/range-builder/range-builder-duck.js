import {find} from 'lodash'
import {types} from 'modules/range-builder/constants'
import {
  createRange, 
  rangeIdList,
  ranges 
} from 'modules/range-builder/ranges'
import {
  findRangeContainingCombo,
  findRangeContainingComboGroup,
  updateBoardCards,
  updateDeadCards,
  updateHandCards,
  updateRangesByClearingAllSelectedCombos,
  updateRangesByDeletingRange
} from 'modules/range-builder/reducers/ranges/utilities'
import {actionCreator} from 'redux-action-creator'
import {rangeColorList} from 'styles/colors/range-colors'
import {
  cardify,
  stringify
} from 'util/card-parser'
import uuid from 'uuid/v4'

export const addRange = actionCreator(types.ADD_RANGE, 'color')
export const clearSelectedCombosFromRange = actionCreator(types.CLEAR_SELECTED_COMBOS_FROM_RANGE, 'id')
export const deleteRange = actionCreator(types.DELETE_RANGE, 'id')
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
  rangeIdList,
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
      const range = createRange({
        color: action.payload.color,
        name: action.payload.color
      }, rangeId)

      nextState = {
        ...state,
        addRangeMenuOpen: false,
        rangeIdList: state.rangeIdList.concat([rangeId]),
        ranges: {
          ...state.ranges,
          [rangeId]: range
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

    case types.CLEAR_BOARD:
      nextState = {
        ...state,
        board: '',
        boardCards: [],
        deadCards: updateDeadCards([], state.handCards) 
      }
      break

    case types.CLEAR_HAND:
      nextState = {
        ...state,
        deadCards: updateDeadCards(state.boardCards, []),
        hand: '',
        handCards: []
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

    case types.DELETE_RANGE: 
      nextState = {
        ...state,
        rangeIdList: state.rangeIdList.filter(rangeId => rangeId !== action.payload.id),
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
        ranges: action.payload
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


export const getBoard = (state) => state.board
export const getBoardCards = (state) => state.boardCards
export const getDeadCards = (state) => state.deadCards
export const getHand = (state) => state.hand
export const getHandCards = (state) => state.handCards
export const getIsAddRangeMenuOpen = (state) => state.addRangeMenuOpen
export const getIsComboSelected = (state, id) => !!findRangeContainingCombo(getRangeList(state), id)
export const getIsEditing = (state) => state.editing
export const getIsSelecting = (state) => state.selecting
export const getIsSelectingSuits = (state) => state.selectingSuits
export const getRangeColors = (state) => state.colors
export const getRangeById = (state, id) => state.ranges[id]
export const getRangeIdList = (state) => state.rangeIdList
export const getRangeList = (state) => state.rangeIdList.map((id) => state.ranges[id])
export const getRanges = (state) => state.ranges
export const getRangeColorForCombo = (state, id) => {
  const range = findRangeContainingCombo(getRangeList(state), id)

  return range ? range.color : ''
}
export const getRangeForCombo = (state, id) => findRangeContainingCombo(getRanges(state), id)
export const getRangeForComboGroup = (state, id) => findRangeContainingComboGroup(getRangeList(state), id)
export const getSelectedRange = (state) => state.ranges[getSelectedRangeId(state)] || {}
export const getSelectedRangeColor = (state) => getSelectedRange(state).color
export const getSelectedRangeId = (state) => state.selectedRangeId
export const getIsRangeSelected = (state, id) => getSelectedRangeId(state) === id
