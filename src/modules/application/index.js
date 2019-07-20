import applicationReducer, * as fromApplication from 'modules/application/reducers/application'

export const ApplicationReducer = applicationReducer

export * from 'modules/application/actions'

const getApplicationState = (state) => state.Application
export const getInputMode = (state) =>
  fromApplication.getInputMode(getApplicationState(state))
export const getIsCompositionChartOpen = (state) =>
  fromApplication.getIsCompositionChartOpen(getApplicationState(state))
export const getMode = (state) => 
  fromApplication.getMode(getApplicationState(state))