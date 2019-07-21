import createStorageConfig from 'modules/create-storage-config'

const blacklist = [
  'error',
  'exporting',
]

export default createStorageConfig('export', blacklist)