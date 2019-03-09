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

export const cards = ranks.list.reduce((acc, rank) => {
  suits.list.forEach((suit) => {
    const text = rank + suit

    acc.push({id: text, rank, suit, text})
  })

  return acc
}, [])

export default cards
