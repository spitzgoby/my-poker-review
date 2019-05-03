import {types} from 'modules/range-builder/constants'

const initialState = {
  importing: false,
  importDialogOpen: false,
  importFile: null
}

export default (state = initialState, action = {}) => {
  let nextState

  switch (action.type) {
    case types.IMPORT_RANGES_INIT:
      nextState = {
        ...state,
        importing: true
      }
      break

    case types.IMPORT_RANGES_SUCCESS:
      nextState = {
        ...state,
        importDialogOpen: false,
        importing: false
      }
      break

    case types.IMPORT_RANGES_FAILURE:
      nextState = {
        ...state,
        importing: false,
        error: action.payload
      }
      break

    case types.SET_IMPORT_DIALOG_OPEN:
      nextState = {
        ...state,
        importDialogOpen: !state.importDialogOpen
      }
      break

    case types.SET_IMPORT_FILE:
      nextState = {
        ...state,
        importFile: action.payload
      }
      break

    default:
      nextState = state
      break
  }

  return nextState
}

export const getIsImporting = (state) => state.importing
export const getIsImportDialogOpen = (state) => state.importDialogOpen
export const getImportFile = (state) => state.importFile