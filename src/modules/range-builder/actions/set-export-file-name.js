import {types} from 'modules/range-builder/constants'

export const setExportFileName = (payload) => {
  console.log(payload)

  return {
    type: types.SET_EXPORT_FILE_NAME,
    payload
  }
}