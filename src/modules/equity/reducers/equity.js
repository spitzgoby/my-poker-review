import {
  EMPTY_EQUITY,
  types
} from 'modules/equity/constants'
import {types as rangeBuilderTypes} from 'modules/range-builder/constants'

const initialState = {
  equities: {},
  pending: {}
}

export default (state = initialState, action = {}) => {
  let nextState 

  switch(action.type) {
    case types.CALCULATE_EQUITY_INIT:
      nextState = {
        ...state,
        pending: {
          ...state.pending,
          [action.payload.rangeId]: true
        }
      }
      break

    case rangeBuilderTypes.CLEAR_ALL:
    case rangeBuilderTypes.CLEAR_ALL_SELECTED_COMBOS:
    case rangeBuilderTypes.CLEAR_BOARD:
    case rangeBuilderTypes.CLEAR_HAND:
    case rangeBuilderTypes.SELECT_BOARD_CARDS:
    case rangeBuilderTypes.SELECT_COMBOS:
    case rangeBuilderTypes.SELECT_HAND_CARDS:
    case rangeBuilderTypes.SET_BOARD:
    case rangeBuilderTypes.SET_HAND:
      nextState = {
        ...state,
        equities: {},
        pending: {}
      }
      break

    case rangeBuilderTypes.CLEAR_SELECTED_COMBOS_FROM_RANGE:
    case rangeBuilderTypes.DELETE_RANGE:
      nextState = {
        ...state,
        equities: {
          ...state.equities,
          [action.payload.id]: {...EMPTY_EQUITY}
        },
        pending: {
          ...state.equities,
          [action.payload.id]: false
        }
      }
      break


    case types.CALCULATE_EQUITY_SUCCESS:
      nextState = {
        ...state,
        equities: {
          ...state.equities,
          [action.payload.rangeId]: state.pending[action.payload.rangeId] 
            ? action.payload.results
            : {}
        },
        pending: {
          ...state.pending,
          [action.payload.rangeId]: false
        }
      }
      break

    default:
      nextState = state
      break
  }

  return nextState
} 

export const getEquityForRange = (state, rangeId) => state.equities[rangeId]
export const getIsEquityPendingForRange = (state, rangeId) => state.pending[rangeId]