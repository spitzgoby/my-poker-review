const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']

export const buildCombos = () => {
  let comboIds = [] 
  let entities = {}

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let combo
      let text 

      if (i < j) {
        text = `${ranks[i]}${ranks[j]}` 
        combo = {
          id: `${text}s`,
          pair: false,
          suited: true,
          text
        }
      } else if (i > j) {
        text = `${ranks[j]}${ranks[i]}` 
        combo = {
          id: `${text}o`,
          pair: false,
          suited: false,
          text
        }
      } else {
        text = `${ranks[j]}${ranks[i]}` 
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