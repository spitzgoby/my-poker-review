import {getCard} from 'util/compare-combos'
import {getCards} from 'util/card-input-parser'
import {
  OFFSUIT_HANDS,
  PAIR_HANDS,
  SUITED_HANDS
} from 'lib/poker-constants'

/*------------------*
 * HELPER FUNCTIONS *
 *------------------*/

export const filterDeadCards = (hands = [], deadCards) => {
  let result = hands

  if (deadCards) {
    deadCards = typeof deadCards === 'string'
      ? getCards(deadCards)
      : deadCards

    const deadCardsDict = deadCards.reduce((result, card) => {
      result[card] = true

      return result
    }, {})

    return hands.filter((hand) => {
      return !(deadCardsDict[hand[0]] || deadCardsDict[hand[1]])
    })
  }

  return result
}

/*--------------*
 * HANDS OUTPUT *
 *--------------*/

const buildHands = (combo, suits) => {
  return suits.map((suitPair, index) => {
    return suitPair.map((suit, index) => {
      return getCard(combo, index) + suit
    })
  })
}

export const handsFromCombos = (combos, deadCards) => {
  const allComboHands = combos.reduce((result, combo) => {
    let suits = OFFSUIT_HANDS

    if (combo.suited) {
      suits = SUITED_HANDS
    } else if (combo.pair) {
      suits = PAIR_HANDS
    } 

    return result.concat(buildHands(combo, suits))
  }, [])

  return filterDeadCards(allComboHands, deadCards)
}
