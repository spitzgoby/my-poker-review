import {types} from 'modules/range-builder/constants'
import {importRanges as importRangesFromFile} from 'util/range-file-converter'

const importRangesInit = () => ({
  type: types.IMPORT_RANGES_INIT
})

const importRangesSuccess = (ranges) => ({
  type: types.IMPORT_RANGES_SUCCESS,
  payload: { ranges } 
})

const importRangesFailure = (payload) => ({
  type: types.IMPORT_RANGES_FAILURE,
  payload
})

export const importRanges = (payload) => (dispatch) => {
  dispatch(importRangesInit())

  return importRangesFromFile(payload)
    .then((result) => {
      if (result) {
        dispatch(importRangesSuccess(result))
      } else {
        dispatch(importRangesFailure('Invalid range data'))
      }
    })
    .catch((error) => {
      dispatch(importRangesFailure('There was a problem reading the selected file'))
    })
}
