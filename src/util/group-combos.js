import {types} from 'lib/combos'
import {compareCombos} from 'util/compare-combos'

export const groupComboIds = (combos) => {
  return combos.reduce((acc, combo) => {
    const comboGroupId = combo.comboGroupId
    const id = combo.id

    if (!acc[comboGroupId]) {
      acc[comboGroupId] = [id]
    } else {
      acc[comboGroupId].push(id)
    }

    return acc
  }, {})
}

export const splitComboGroups = (combos) => {
  let pairs = []
  let suited = []
  let offsuit = []

  combos.forEach(combo => {
    if (combo.type === types.PAIR) {
      pairs.push(combo)
    } else if (combo.type === types.SUITED) {
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

