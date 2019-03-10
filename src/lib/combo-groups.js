import {reduce} from 'lodash'
import {combos} from 'lib/combos'

/*--------------*
 * COMBO-GROUPS *
 *--------------*/

export const comboGroups = reduce(combos, (acc, combo) => {
  const comboGroupId = combo.comboGroupId
  let comboGroup = acc[comboGroupId]

  if (!comboGroup) {
    comboGroup = {
      combos: [],
      id: comboGroupId,
      type: combo.type,
      text: comboGroupId
    }
    acc[comboGroupId] = comboGroup
  }

  comboGroup.combos.push(combo)

  return acc
}, {})

export default comboGroups