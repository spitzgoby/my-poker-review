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
    nonPairs
  } = groupCombos(combos)

  let combinedPairs = combinePairs(pairs) 
  let combinedNonPairs = combineNonPairs(nonPairs)

  console.log(combinedPairs)
  console.log(combinedNonPairs)

  return combinedPairs.concat(combinedNonPairs).join(',')
}

const groupCombos = (combos) => {
  let pairs = []
  let nonPairs = []

  combos.forEach(combo => {
    if (combo.pair) {
      pairs.push(combo)
    } else {
      nonPairs.push(combo)
    }
  })

  pairs.sort(compareCombos)
  nonPairs.sort(compareCombos)

  return {
    pairs,
    nonPairs
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
  // AA,KK,QQ => QQ+,
  // QQ,JJ,TT => QQ-TT
  // QQ,TT,88 => QQ,TT,88
  let result = []  

  let startIndex = 0
  while (startIndex < combos.length) {
    const startCombo = combos[startIndex]

    let lastIndex = startIndex
    let currentIndex = startIndex
    while (currentIndex < combos.length && compareCombos(combos[lastIndex], combos[currentIndex]) >= -1) {
      lastIndex = currentIndex
      currentIndex++ 
    }

    if (startIndex !== lastIndex) {
      const lastCombo = combos[lastIndex]

      if (startCombo.text === 'AA') {
        result.push(`${lastCombo.text}+`)
      } else {
        result.push(`${startCombo.text}-${lastCombo.text}`)
      }
    } else {
      result.push(`${startCombo.text}`)
    }

    startIndex = lastIndex + 1
  }

  return result
}

const combineNonPairs = (combos) => {
  return []
}
