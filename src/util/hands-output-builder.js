import {getCard} from 'util/compare-combos'
import {
  OFFSUIT_HANDS,
  PAIR_HANDS,
  SUITED_HANDS
} from 'util/poker-constants'

const buildHands = (combo, suits) => {
  return suits.map((suitPair, index) => {
    return suitPair.map((suit, index) => {
      return getCard(combo, index) + suit
    })
  })
}

export const handsFromCombos = (combos) => {
  return combos.reduce((result, combo) => {
    let suits = OFFSUIT_HANDS

    if (combo.suited) {
      suits = SUITED_HANDS
    } else if (combo.pair) {
      suits = PAIR_HANDS
    } 

    return result.concat(buildHands(combo, suits))
  }, [])
}
