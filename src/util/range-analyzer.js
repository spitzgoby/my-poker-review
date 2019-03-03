
const countCombos = (ranges) => {
  return Object.entries(ranges).reduce((count, entry) => {
    return count + entry[1].selectedComboIds.length
  }, 0)
}

export const analyzeRanges = (ranges, deadCards) => {
  const totalCombosCount = countCombos(ranges)

  return ranges.reduce((acc, range) => {
    const combosCount = range.selectedComboIds.length
    if (combosCount > 0) {
      acc[range.name] = {
        combosCount, 
        handsRatio: combosCount / 1326,
        rangeRatio: combosCount / totalCombosCount
      }
    }

    return acc
  }, {})
}