import equityReducer, * as fromEquity from 'modules/equity/reducers/equity'

/*---------*
 * REDUCER *
 *---------*/

export const EquityReducer = equityReducer

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
