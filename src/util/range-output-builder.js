import { 
  compareCombos,
  compareFirstCard,
  compareSecondCard,
  getFirstCard,
  getSecondCard,
  getCardValueDifference
} from 'util/compare-combos'
import { groupCombos } from 'util/group-combos'


export const rangeFromCombos = (combos) => {
  let {
    pairs,
    suited,
    offsuit,
  } = groupCombos(combos)

  let combinedPairs = combinePairs(pairs) 
  let combinedSuited = combineNonPairs(suited)
  let combinedOffsuit = combineNonPairs(offsuit)

  return combinedPairs
    .concat(combinedSuited)
    .concat(combinedOffsuit)
    .join(',')
}


const combinePairs = (combos) => {
  let combinedCombos = combineCombos(combos, (combo1, combo2) => {
    return compareCombos(combo1, combo2) >= -1
  })

  return combinedCombos.map((combined) => {
    let firstCombo = combined[0]
    let result = firstCombo.text

    if (combined.length > 1) {
      let lastCombo = combined[combined.length - 1]

      if (firstCombo.text === 'AA') {
        result = `${lastCombo.text}+`
      } else {
        result = `${combined[0].text}-${lastCombo.text}`
      }
    }
    return result
  })
}

const combineNonPairs = (combos) => {
  let combinedCombos = combineCombos(combos, (combo1, combo2) => {
    let result = false

    if (compareFirstCard(combo1, combo2) === 0) {
      result = (compareSecondCard(combo1, combo2) === -1)
    }

    return result
  })

  return combinedCombos.map((combined) => {
    let firstCombo = combined[0]
    let result = firstCombo.id

    if (combined.length > 1) {
      let firstCard = getFirstCard(firstCombo)
      let secondCard = getSecondCard(firstCombo)
      let lastCombo = combined[combined.length - 1]

      if (getCardValueDifference(firstCard - secondCard) === 1) {
        result = `${lastCombo.id}+`
      } else {
        result = `${firstCombo.id}-${lastCombo.id}`
      }
    }

    return result
  })
}

const combineCombos = (combos, shouldCombine) => {
  let result = []

  let startIndex = 0
  while (startIndex < combos.length) {

    let lastIndex = startIndex
    let currentIndex = startIndex+1
    while (currentIndex < combos.length && shouldCombine(combos[lastIndex], combos[currentIndex])) {
      lastIndex = currentIndex
      currentIndex++ 
    }

    if (startIndex !== lastIndex) {
      result.push(combos.slice(startIndex, lastIndex+1))
    } else {
      result.push([combos[startIndex]])
    }

    startIndex = lastIndex + 1
  }

  return result
}
