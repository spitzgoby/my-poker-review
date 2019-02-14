import {
  OFFSUIT_HANDS,
  PAIR_HANDS,
  SUITED_HANDS
} from 'util/poker-constants'

const FIRST_CARD_INDEX = 0
const SECOND_CARD_INDEX = 1
const RANK_VALUES = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
}

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

const groupCombos = (combos) => {
  let pairs = []
  let suited = []
  let offsuit = []

  combos.forEach(combo => {
    if (combo.pair) {
      pairs.push(combo)
    } else if (combo.suited) {
      suited.push(combo)
    } else {
      offsuit.push(combo)
    }
  })

  pairs.sort(compareCombos)
  suited.sort(compareCombos)
  offsuit.sort(compareCombos)

  return {
    pairs,
    suited,
    offsuit,
  }
}

const compareCombos = (combo1, combo2) => {
  let result = compareComboCard(combo1, combo2, FIRST_CARD_INDEX)

  if (result === 0) {
    result = compareComboCard(combo1, combo2, SECOND_CARD_INDEX)
  }

  return result
}

const compareComboCard = (combo1, combo2, index) => {
  const cardValue1 = RANK_VALUES[getCard(combo1, index)]
  const cardValue2 = RANK_VALUES[getCard(combo2, index)]

  return cardValue2 - cardValue1
}

const getCard = (combo, index) => combo.text.charAt(index)

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

    if (compareComboCard(combo1, combo2, FIRST_CARD_INDEX) === 0) {
      result = compareComboCard(combo1, combo2, SECOND_CARD_INDEX) === -1
    }

    return result
  })

  return combinedCombos.map((combined) => {
    let firstCombo = combined[0]
    let result = firstCombo.id

    if (combined.length > 1) {
      let firstCardValue = RANK_VALUES[getCard(firstCombo, FIRST_CARD_INDEX)]
      let secondCardValue = RANK_VALUES[getCard(firstCombo, SECOND_CARD_INDEX)]
      let lastCombo = combined[combined.length - 1]

      if (firstCardValue - secondCardValue === 1) {
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
