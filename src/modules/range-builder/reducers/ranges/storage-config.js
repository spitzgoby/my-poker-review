import storage from 'redux-persist/lib/storage/session'

export default {
  key: 'range-builder',
  storage,
  blacklist: [
    'addRangeMenuOpen', 
    'deleteAllDialogOpen',
    'editing',
    'highlightedComboGroups',
    'selecting',
    'selectingSuits'
  ]
}