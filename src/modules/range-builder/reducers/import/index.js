import {types} from 'modules/range-builder/constants'

const initialState = {
  error: '',
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
        error: null,
        importing: true
      }
      break

    case types.IMPORT_RANGES_SUCCESS:
      nextState = {
        ...state,
        error: null,
        importDialogOpen: false,
        importing: false
      }
      break

    case types.IMPORT_RANGES_FAILURE:
      nextState = {
        ...state,
        error: action.payload,
        importing: false
      }
      break

    case types.SET_IMPORT_DIALOG_OPEN:
      nextState = {
        ...state,
        error: null,
        importDialogOpen: !state.importDialogOpen
      }
      break

    case types.SET_IMPORT_FILE:
      nextState = {
        ...state,
        error: null,
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