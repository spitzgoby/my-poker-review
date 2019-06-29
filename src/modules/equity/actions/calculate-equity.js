import {types} from 'modules/equity/constants'
import {
  getBoardCards,
  getHandCards,
  getRangeById
} from 'modules/range-builder'
import {calculateEquity as calculate} from 'util/equity-calculator'

const calculateEquityInit = (payload) => ({
  type: types.CALCULATE_EQUITY_INIT,
  payload
})

const calculateEquitySuccess = (payload) => ({
  type: types.CALCULATE_EQUITY_SUCCESS,
  payload
})

export const calculateEquity = (rangeId) => (dispatch, getState) => {
  const state = getState()
  const board = getBoardCards(state)
  const hand = getHandCards(state)
  const range = getRangeById(state, rangeId)

  dispatch(calculateEquityInit({rangeId}))

  calculate(board, hand, range).then((results) => {
    dispatch(calculateEquitySuccess({
      rangeId, 
      results
    }))
  })
}