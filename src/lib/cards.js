/*-----------*
 * CONSTANTS *
 *-----------*/

export const ranks = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  list: ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
}
export const suits = {
  c: 'clubs',
  d: 'diamonds',
  h: 'hearts',
  s: 'spades',
  list: ['c','d','h','s'] 
}

/*---------*
 * HELPERS *
 *---------*/

export const createCard = (rank, suit) => {
  const text = rank + suit

  return {
    id: text, 
    rank, 
    suit, 
    text
  }
}

/*-------*
 * CARDS *
 *-------*/
let cardMap = {}
export const cards = ranks.list.reduce((acc, rank) => {
  suits.list.forEach((suit) => {
    const card = createCard(rank, suit)
    acc.push(card)
    cardMap[card.id] = card
  })

  return acc
}, [])

export const getCard = (cardId) => cardMap[cardId]

export default cards
