import createStorageConfig from 'modules/create-storage-config'

const blacklist = [
  'error',
  'importing'
]

export default createStorageConfig('import', blacklist)