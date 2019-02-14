import {RANKS} from 'util/poker-constants'

export const buildCombos = () => {
  let comboIds = [] 
  let entities = {}

  for (let i = 0; i < RANKS.length; i++) {
    for (let j = 0; j < RANKS.length; j++) {
      let combo
      let text 

      if (i < j) {
        text = `${RANKS[i]}${RANKS[j]}` 
        combo = {
          id: `${text}s`,
          pair: false,
          suited: true,
          text
        }
      } else if (i > j) {
        text = `${RANKS[j]}${RANKS[i]}` 
        combo = {
          id: `${text}o`,
          pair: false,
          suited: false,
          text
        }
      } else {
        text = `${RANKS[j]}${RANKS[i]}` 
        combo = {
          id: text,
          pair: true,
          suited: false,
          text
        }
      }

      comboIds.push(combo.id)
      entities[combo.id] = combo
    }
  }

  return {
    comboIds,
    entities
  }
}

export default buildCombos