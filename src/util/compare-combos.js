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

export const getCard = (combo, index) => combo.text.charAt(index)

export const getFirstCard = (combo) => getCard(combo, FIRST_CARD_INDEX)

export const getSecondCard = (combo) => getCard(combo, SECOND_CARD_INDEX)

export const compareFirstCard = (combo1, combo2) => 
  compareComboCard(combo1, combo2, FIRST_CARD_INDEX)

export const compareSecondCard = (combo1, combo2) =>
  compareComboCard(combo1, combo2, SECOND_CARD_INDEX)

export const compareComboCard = (combo1, combo2, index) => {
  const cardValue1 = RANK_VALUES[getCard(combo1, index)]
  const cardValue2 = RANK_VALUES[getCard(combo2, index)]

  return cardValue2 - cardValue1
}

export const compareCombos = (combo1, combo2) => {
  let result = compareFirstCard(combo1, combo2)

  if (result === 0) {
    result = compareSecondCard(combo1, combo2)
  }

  return result
}

export const getCardValueDifference = (card1, card2) =>
  RANK_VALUES[card1] - RANK_VALUES[card2]

export default compareCombos
