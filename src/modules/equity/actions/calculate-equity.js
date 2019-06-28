import {forEach} from 'lodash'
import {types} from 'modules/range-builder/constants'
import {calculateEquity as calculate} from 'util/equity-calculator'

const calculateEquityInit = (payload) => ({
  type: types.CALCULATE_EQUITY_INIT,
  payload
})

const calculateEquitySuccess = (payload) => ({
  type: types.CALCULATE_EQUITY_SUCCESS,
  payload
})

export const calculateEquity = (board, hand, ranges) => (dispatch) => {
  forEach(ranges, (range) => {
    const rangeId = range.id

    dispatch(calculateEquityInit({rangeId}))

    calculate(board, hand, range).then((results) => {
      dispatch(calculateEquitySuccess({
        rangeId, 
        results
      }))
    })
  })
}