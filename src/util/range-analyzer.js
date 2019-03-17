import {reduce} from 'lodash'
import {handsFromCombos} from 'util/hands-output-builder'

const countCombos = (ranges) => {
  return reduce(ranges, (count, range) => {
    return count + reduce(range.selectedCombos, (count, comboGroup) => count + comboGroup.length, 0)
  }, 0)
}

const buildRangeHands = (ranges) => {
  return ranges.reduce((acc, range) => {
    const id = range.id

    acc[id] = {
      id,
      hands: handsFromCombos()
    }

    return acc
  }, {})
}

export const analyzeRanges = (ranges, deadCards) => {
  const totalCombosCount = countCombos(ranges)

  return ranges.reduce((acc, range) => {
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