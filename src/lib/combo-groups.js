import {combos} from 'lib/combos'

/*--------------*
 * COMBO-GROUPS *
 *--------------*/

export const comboGroups = Object.entries(combos).map(entry => entry[1])
  .reduce((acc, combo) => {
    const comboGroupId = combo.comboGroupId
    let comboGroup = acc[comboGroupId]

    if (!comboGroup) {
      comboGroup = {
        combos: [],
        id: comboGroupId,
        pair: combo.pair,
        suited: combo.suited,
        text: comboGroupId
      }
      acc[comboGroupId] = comboGroup
    }

    comboGroup.combos.push(combo)

    return acc
  }, {})

  export default comboGroups