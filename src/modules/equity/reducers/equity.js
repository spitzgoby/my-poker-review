import {types} from 'modules/range-builder/constants'

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

    case types.CALCULATE_EQUITY_SUCCESS:
      nextState = {
        ...state,
        equities: {
          ...state.equities,
          [action.payload.rangeId]: action.payload.results
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