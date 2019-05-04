import {types} from 'modules/range-builder/constants'

const initialState = {
  error: null,
  exporting: false,
  exportDialogOpen: false,
  exportFileName: ''
}

export default (state = initialState, action = {}) => {
  let nextState

  switch (action.type) {
    case types.EXPORT_RANGES_FAILURE:
      nextState = {
        ...state,
        error: action.payload
      }
      break

    case types.EXPORT_RANGES_SUCCESS:
      nextState = {
        ...state,
        error: null,
        exportDialogOpen: false
      }
      break

    case types.SET_EXPORT_DIALOG_OPEN:
      nextState = {
        ...state, 
        error: null,
        exportDialogOpen: !state.exportDialogOpen
      }
      break

    case types.SET_EXPORT_FILE_NAME:
      nextState = {
        ...state,
        error: null,
        exportFileName: action.payload
      }
      break

    default:
      nextState = state
  }

  return nextState
}

export const getExportFileName = (state) => state.exportFileName
export const getIsExportDialogOpen = (state) => state.exportDialogOpen

