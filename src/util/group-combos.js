import {compareCombos} from 'util/compare-combos'

export const groupCombos = (combos) => {
  let pairs = []
  let suited = []
  let offsuit = []

  combos.forEach(combo => {
    if (combo.pair) {
      pairs.push(combo)
    } else if (combo.suited) {
      suited.push(combo)
    } else {
      offsuit.push(combo)
    }
  })

  pairs.sort(compareCombos)
  suited.sort(compareCombos)
  offsuit.sort(compareCombos)

  return {
    pairs,
    suited,
    offsuit,
  }
}

export default groupCombos