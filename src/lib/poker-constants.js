export const CARD_REGEX = /[A,a,K,k,Q,q,J,j,T,t,2-9][C,c,D,d,H,h,S,s]/g
export const HANDS = [
  'Straight Flush',
  'Quads', 
  'Full House',
  'Flush',
  'Straight',
  'Trips', 
  'Two Pair', 
  'Pair', 
  'High Card'
]
export const OFFSUIT_HANDS = [
  ['c','d'],
  ['c','h'],
  ['c','s'],
  ['d','c'],
  ['d','h'],
  ['d','s'],
  ['h','c'],
  ['h','d'],
  ['h','s'],
  ['s','c'],
  ['s','d'],
  ['s','h']
]
export const PAIR_HANDS = [
  ['c','d'],
  ['c','h'],
  ['c','s'],
  ['d','h'],
  ['d','s'],
  ['h','s']
]
export const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
export const STREETS = {
  FLOP: {
    index: 0,
    count: 3
  },
  TURN: {
    index: 3,
    count: 1
  },
  RIVER: {
    index: 4,
    count: 1
  },
  list: ['FLOP', 'TURN', 'RIVER']
}
export const SUITED_HANDS = [
  ['c','c'],
  ['d','d'],
  ['h','h'],
  ['s','s']
]
