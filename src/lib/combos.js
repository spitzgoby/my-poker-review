import {cards} from 'lib/cards'

/*-----------*
 * CONSTANTS *
 *----------=*/

export const types = {
  OFFSUIT: 'offsuit',
  PAIR: 'pair',
  SUITED: 'suited'
}

/*---------*
 * HELPERS *
 *---------*/

const calculateComboGroupId = (combo) => {
  const base = combo.cards[0].rank + combo.cards[1].rank
  const type = combo.type
  let modifier = ''

  if (type === types.SUITED) {
    modifier = 's'
  } else if (type === types.OFFSUIT ) {
    modifier = 'o'
  }

  return base + modifier
}

const calculateType = (firstCard, secondCard) => {
  let type = types.OFFSUIT

  if (firstCard.rank === secondCard.rank) {
    type = types.PAIR
  } else if (firstCard.suit === secondCard.suit) {
    type = types.SUITED
  }

  return type
}

const buildCombo = (firstCard, secondCard) => {
  return {
    cards: [firstCard, secondCard],
    id: firstCard.id + secondCard.id,
    type: calculateType(firstCard, secondCard),
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

      combo.comboGroupId = calculateComboGroupId(combo)
      acc[combo.id] = combo
    }
  })

  return acc
}, {})

export default combos