import {combos} from 'lib/combos'
import {comboGroups} from 'lib/combo-groups'
import FileDownload from 'js-file-download'
import PromiseFileReader from 'promise-file-reader'
import {rangeColorNames} from 'styles/colors/range-colors'
import {reduce} from 'lodash'

/*------------------*
 * EXPORTING RANGES *
 *------------------*/

const fileNameRegex = /^[\w,\s-]+$/
const fileNameWithExtensionRegex = /^[\w,\s-]+\.[A-Za-z]+$/

const addFileExtension = (fileName) => {
  let result

  console.log('fileName: ', fileName)
  if (!fileName) {
    fileName = 'ranges'
  }

  if (fileNameRegex.test(fileName)) {
    fileName = fileName + '.json'
  }

  if (fileNameWithExtensionRegex.test(fileName)) {
    result = fileName
  }

  return result
}

export const exportRanges = (data, fileName) => {
  const fileNameWithExtension = addFileExtension(fileName) 

  if (fileNameWithExtension) {
    FileDownload(JSON.stringify(data), fileNameWithExtension)
  }

  return !!fileNameWithExtension
}

/*------------------*
 * IMPORTING RANGES *
 *------------------*/

const validateSelectedCombos = (selectedCombos) => {
  return selectedCombos 
    && reduce(selectedCombos, (acc, comboGroupList, comboGroupId) => {
      let validComboGroupId = (comboGroups[comboGroupId])
      let validCombos = comboGroupList.reduce((acc, comboId) => {
        const combo = combos[comboId]
        return acc 
          && combo
          && combo.comboGroupId === comboGroupId
      }, {})

      return acc && validComboGroupId && validCombos
    }, true)
}

const validateRange = (range) => {
  return (range.id)
    && (range.name)
    && rangeColorNames.includes(range.color) 
    && validateSelectedCombos(range.selectedCombos)
}

const parseAndValidateRangeImport = (text) => {
  let result = {
    isvalidFile: false,
  }
  const data = JSON.parse(text)
  const hasRanges = Object.keys(data).length > 0
  const areValidRanges = reduce(data, (acc, datum) => {
    return acc && validateRange(datum)
  }, true)

  if (hasRanges && areValidRanges) {
    result.isValidFile = true
    result.ranges = data
  }

  return result
}

const readRangeFile = (file) => {
  return PromiseFileReader.readAsText(file)
    .then((text) => parseAndValidateRangeImport(text))
}

export const importRanges = (file) => {
  return readRangeFile(file)
    .then((result) => {
      return (result.isValidFile) 
        ? result.ranges
        : null
    })
}
