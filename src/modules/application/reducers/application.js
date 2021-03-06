import {
  inputModes,
  modes
} from 'lib/application-constants'
import {types} from 'modules/application/constants'

const initialState = {
  appMenuOpen: false,
  compositionChartOpen: false,
  inputMode: inputModes.CARD,
  mode: modes.RANGES
}

export default (state = initialState, action = {}) => {
  let nextState

  switch(action.type) {
    case types.SET_APP_MENU_OPEN:
      nextState = {
        ...state,
        appMenuOpen: action.payload
      }
      break

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
export const getIsAppMenuOpen = (state) => state.appMenuOpen
export const getIsCompositionChartOpen = (state) => state.compositionChartOpen
export const getMode = (state) => state.mode