import {modes} from 'lib/application-constants'
import {types} from 'modules/application/constants'

const initialState = {
  mode: modes.EQUITY
}

export default (state = initialState, action = {}) => {
  let nextState

  switch(action.type) {
    case types.SET_MODE:
      nextState = {
        ...state,
        mode: action.payload
      }
      break

    default:
      nextState = state
  }

  return nextState
}

export const getMode = (state) => state.mode