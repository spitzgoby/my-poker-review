import {types} from 'modules/range-builder/constants'
import {exportRanges as exportRangesToFile} from 'util/range-file-converter'

export const exportRanges = (payload) => {
  let action
  const fileWasExported = exportRangesToFile(
    payload.rangeList,
    payload.fileName
  )

  if (fileWasExported) {
    action = {
      type: types.EXPORT_RANGES_SUCCESS
    }
  } else {
    action = {
      type: types.EXPORT_RANGES_FAILURE,
      payload: 'Invalid file name for export'
    }
  }

  return action
}

