import FileDownload from 'js-file-download'

const fileNameRegex = /^[\w,\s-]+$/
const fileNameWithExtensionRegex = /^[\w,\s-]+\.[A-Za-z]+$/

const addFileExtension = (fileName) => {
  let result

  if (fileNameRegex.test(fileName)) {
    fileName = fileName + '.json'
  }

  if (fileNameWithExtensionRegex.test(fileName)) {
    result = fileName
  }

  return result
}

export const download = (data, fileName) => {
  const fileNameWithExtension = addFileExtension(fileName) 

  if (fileNameWithExtension) {
    FileDownload(JSON.stringify(data), fileNameWithExtension)
  }

  return !!fileNameWithExtension
}

export default download