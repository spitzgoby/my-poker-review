import equityReducer, * as fromEquity from 'modules/equity/reducers/equity'
import equityStorageConfig from 'modules/equity/reducers/storage-config'
import {persistReducer} from 'redux-persist'

/*---------*
 * REDUCER *
 *---------*/

export const EquityReducer = persistReducer(equityStorageConfig, equityReducer)

/*---------*
 * ACTIONS *
 *---------*/

export * from 'modules/equity/actions'

/*-----------*
 * SELECTORS *
 *-----------*/

export const getEquityState = (state) => state.Equity
export const getEquityForRange = (state, rangeId) => 
  fromEquity.getEquityForRange(getEquityState(state), rangeId)
export const getIsEquityPendingForRange = (state, rangeId) => 
  fromEquity.getIsEquityPendingForRange(getEquityState(state), rangeId)
