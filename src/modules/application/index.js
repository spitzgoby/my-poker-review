import applicationReducer, * as fromApplication from 'modules/application/reducers/application'

export const ApplicationReducer = applicationReducer

export * from 'modules/application/actions'

const getApplicationState = (state) => state.Application
export const getMode = (state) => 
  fromApplication.getMode(getApplicationState(state))