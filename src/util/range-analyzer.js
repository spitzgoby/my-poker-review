import {
  forEach,
  map,
  reduce
} from 'lodash'

const ALWAYS_FALSE_REGEX = /$^/

/*------------------*
 * HELPER FUNCTIONS *
 *------------------*/

const ALL_COMBOS_COUNT = 1326

const filterSelectedCombos = (comboGroups, deadCards) => {
  return reduce(comboGroups, (acc, comboGroup, id) => {
    acc[id] = comboGroup.filter((combo) => !deadCards.test(combo))

    return acc
  }, {})
}

const filterRanges = (ranges, deadCards) => {
  let filteredRanges = ranges
  let deadCardsList = map(deadCards)
  let deadCardsRegex

  deadCardsRegex = deadCardsList.length
    ? new RegExp(deadCardsList.map((deadCard) => deadCard.text).join('|'))
    : ALWAYS_FALSE_REGEX

  filteredRanges = ranges.map(range => {
    return {
      containsCombos: doesRangeContainCombos(range),
      id: range.id,
      selectedCombos: filterSelectedCombos(range.selectedCombos, deadCardsRegex)
    }
  })

  return filteredRanges
}

const doesRangeContainCombos = (range) => {
  let empty = true

  forEach(range.selectedCombos, (comboGroup) => {
    if (comboGroup.length) {
      empty = false
    }

    return empty
  })

  return !empty
}

/*----------*
 * ANALYSIS *
 *----------*/

const countCombos = (ranges) => {
  return reduce(ranges, (count, range) => {
    return count + reduce(range.selectedCombos, (count, comboGroup) => count + comboGroup.length, 0)
  }, 0)
}

export const analyzeRanges = (ranges, deadCards = []) => {
  const filteredRanges = filterRanges(ranges, deadCards)
  const totalCombosCount = countCombos(filteredRanges) || 1

  return filteredRanges.reduce((acc, range) => {
    const combosCount = countCombos([range])
    if (range.containsCombos) {
      acc[range.id] = {
        combosCount, 
        handsRatio: combosCount / ALL_COMBOS_COUNT,
        rangeRatio: combosCount / totalCombosCount
      }
    }

    return acc
  }, {})
}