import {
  flatMap, 
  reduce,
  times
} from 'lodash'
import {
  rankCards, 
  rankDescription
} from 'phe'

const convertToCardArray = (cardString) => {
  const length = cardString.length / 2

  return times(length, (index) => {
    const start = 2 * index
    return cardString.substring(start, start + 2)
  })
}

export const calculateRangeComposition = (board, range) => {
  const rangeStrengths = calculateRangeStrengths(board, range)
  let total = reduce(rangeStrengths, (sum, strength) => sum + strength.length, 0)

  if (total === 0) {
    total = 1
  }

  return rankDescription.map((description) => {
    const combos = rangeStrengths[description]

    return {
      combos,
      name: description,
      value: combos.length / total
    }
  })
}

export const calculateRangeStrengths = (board, range) => {
  const rangeStrengths = rankDescription.reduce((acc, rank) => {
    acc[rank] = []

    return acc
  }, {}) 

  return flatMap(range.selectedCombos).reduce((acc, combo) => {
    if (board.length >= 6 && combo) {
      const boardArray = convertToCardArray(board)
      const comboArray = convertToCardArray(combo)
      const strength = calculateHandStrength([...comboArray, ...boardArray])

      acc[strength] = acc[strength].concat(combo)
    }

    return acc
  }, rangeStrengths)
}

export const calculateHandStrength = (hand) => {
  return rankDescription[rankCards(hand)]
}