import {reduce} from 'lodash'

/*------------------*
 * HELPER FUNCTIONS *
 *------------------*/

const filterSelectedCombos = (comboGroups, deadCards) => {
  return reduce(comboGroups, (acc, comboGroup, id) => {
    acc[id] = comboGroup.filter((combo) => !deadCards.test(combo))

    return acc
  }, {})
}

const filterRanges = (ranges, deadCards) => {
  let filteredRanges = ranges

  if (deadCards.length) {
    const deadCardsRegex = new RegExp(deadCards.map((deadCard) => deadCard.text).join('|'))

    filteredRanges = ranges.map(range => {
      return {
        id: range.id,
        selectedCombos: filterSelectedCombos(range.selectedCombos, deadCardsRegex)
      }
    })
  }

  return filteredRanges
}

/*----------*
 * ANALYSIS *
 *----------*/

const countCombos = (ranges) => {
  return reduce(ranges, (count, range) => {
    return count + reduce(range.selectedCombos, (count, comboGroup) => count + comboGroup.length, 0)
  }, 0)
}

export const analyzeRanges = (ranges, deadCards) => {
  const filteredRanges = filterRanges(ranges, deadCards)
  const totalCombosCount = countCombos(filteredRanges)

  return filteredRanges.reduce((acc, range) => {
    const combosCount = countCombos([range])
    if (combosCount > 0) {
      acc[range.id] = {
        combosCount, 
        handsRatio: combosCount / 1326,
        rangeRatio: combosCount / totalCombosCount
      }
    }

    return acc
  }, {})
}