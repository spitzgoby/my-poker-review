import {getCard} from 'util/compare-combos'
import {
  OFFSUIT_HANDS,
  PAIR_HANDS,
  SUITED_HANDS
} from 'util/poker-constants'

export const handsFromCombos = (combos) => {
  return combos.map((combo) => {
    let suits = OFFSUIT_HANDS

    if (combo.suited) {
      suits = SUITED_HANDS
    } else if (combo.pair) {
      suits = PAIR_HANDS
    } 

    return buildHands(combo, suits)
  })
}

const buildHands = (combo, suits) => {
  return suits.map((suit, index) => {
    return getCard(index) + suit
  })
}