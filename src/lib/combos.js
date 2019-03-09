import {cards} from 'lib/cards'

/*---------*
 * HELPERS *
 *---------*/
 
const calculateGroup = (combo) => {
  const base = combo.cards[0].rank + combo.cards[1].rank
  let modifier = ''

  if (combo.suited) {
    modifier = 's'
  } else if (!combo.pair) {
    modifier = 'o'
  }

  return base + modifier
}

const buildCombo = (firstCard, secondCard) => {
  return {
    cards: [firstCard, secondCard],
    id: firstCard.id + secondCard.id,
    pair: firstCard.rank === secondCard.rank,
    suited: firstCard.suit === secondCard.suit,
    text: firstCard.text + secondCard.text
  }
}


/*--------*
 * COMBOS *
 *--------*/

export const combos = cards.reduce((acc, card1, i) => {
  cards.forEach((card2, j) => {

    if (i !== j) {
      let combo

      if (i < j) {
        combo = buildCombo(card1, card2)
      } else {
        combo = buildCombo(card2, card1)
      }

      combo.comboGroup = calculateGroup(combo)
      acc[combo.id] = combo
    }
  })

  return acc
}, {})

export default combos