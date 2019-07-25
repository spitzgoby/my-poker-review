import {types} from 'modules/range-builder/constants'
import {rankDescription} from 'phe'

const filters = rankDescription.reduce((acc, description) => {
  acc[description] = true

  return acc
}, {})

const initialState = {
  filters
}

export default (state = initialState, action = {}) => {
  let nextState

  switch (action.type) {
    case types.SET_COMPOSITION_FILTER:
      nextState = {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value
        }
      }
      break

    default:
      nextState = state
  }

  return nextState
}

export const getFilters = (state) => state.filters