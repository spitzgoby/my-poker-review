import storage from 'redux-persist/lib/storage/session'

export default (key, blacklist) => ({
  blacklist,
  key,
  storage
})