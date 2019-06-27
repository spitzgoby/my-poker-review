import {forEach} from 'lodash'
import {calculateEquity as calculate} from 'util/equity-calculator'

export const calculateEquity = (board, hand, ranges) => (dispatch) => {
  forEach(ranges, (range) => {
    calculate(board, hand, range).then((results) => {
      console.log(results)
    })
  })
}