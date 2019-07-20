import {
  inputModes,
  modes
} from 'lib/application-constants'
import {types} from 'modules/application/constants'

const initialState = {
  compositionChartOpen: true,
  inputMode: inputModes.CARD,
  mode: modes.EQUITY
}

export default (state = initialState, action = {}) => {
  let nextState

  switch(action.type) {
    case types.SET_COMPOSITION_CHART_OPEN:
      nextState = {
        ...state,
        compositionChartOpen: action.payload
      }
      break

    case types.SET_INPUT_MODE:
      nextState = {
        ...state,
        inputMode: action.payload
      }
      break

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

export const getInputMode = (state) => state.inputMode
export const getIsCompositionChartOpen = (state) => state.compositionChartOpen
export const getMode = (state) => state.mode