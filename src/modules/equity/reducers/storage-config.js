import createStorageConfig from 'modules/create-storage-config'

const blacklist = [
  'pending'
]

export default createStorageConfig('equity', blacklist)