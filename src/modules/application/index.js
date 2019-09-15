import applicationReducer, * as fromApplication from 'modules/application/reducers/application'
import applicationStorageConfig from 'modules/application/reducers/storage-config'
import {persistReducer} from 'redux-persist'

export const ApplicationReducer = persistReducer(applicationStorageConfig, applicationReducer)

export * from 'modules/application/actions'

const getApplicationState = (state) => state.Application
export const getInputMode = (state) =>
  fromApplication.getInputMode(getApplicationState(state))
export const getIsAppMenuOpen = (state) =>
  fromApplication.getIsAppMenuOpen(getApplicationState(state))
export const getIsCompositionChartOpen = (state) =>
  fromApplication.getIsCompositionChartOpen(getApplicationState(state))
export const getMode = (state) => 
  fromApplication.getMode(getApplicationState(state))