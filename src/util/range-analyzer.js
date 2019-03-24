import {reduce} from 'lodash'

const countCombos = (ranges) => {
  return reduce(ranges, (count, range) => {
    return count + reduce(range.selectedCombos, (count, comboGroup) => count + comboGroup.length, 0)
  }, 0)
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