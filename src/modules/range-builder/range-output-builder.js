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

  return combos.map(combo => combo.text).join(',')
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
  const firstRankValue1 = RANK_VALUES[combo1.id.charAt(0)]
  const firstRankValue2 = RANK_VALUES[combo2.id.charAt(0)]

  let result = firstRankValue1 - firstRankValue2

  if (result === 0) {
    const secondRankValue1 = RANK_VALUES[combo1.id.charAt(1)]
    const secondRankValue2 = RANK_VALUES[combo2.id.charAt(1)]

    result = secondRankValue1 - secondRankValue2
  }

  return result
}

const combinePairs = (combos) => {
  // AA,KK,QQ => QQ+,
  // QQ,JJ,TT => QQ-TT
  // QQ,TT,88 => QQ,TT,88

  let result = ''  

}

const combineNonPairs = (combos) => {

}
