import {
  inputModes,
  modes
} from 'lib/application-constants'
import {types} from 'modules/application/constants'

const initialState = {
  mode: modes.EQUITY,
  inputMode: inputModes.CARD
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

    case types.SET_INPUT_MODE:
      nextState = {
        ...state,
        inputMode: action.payload
      }
      break

    default:
      nextState = state
  }

  return nextState
}

export const getInputMode = (state) => state.inputMode
export const getMode = (state) => state.mode