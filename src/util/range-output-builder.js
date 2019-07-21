import {comboGroups} from 'lib/combo-groups'
import {flatMap} from 'lodash'

const combinableComboGroups = [
  // PAIRS
  ['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22'],
  // SUITED
  ['AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s'], 
  ['KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s'],
  ['QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s'],
  ['JTs','J9s','J8s','J7s','J6s','J5s','J4s','J3s','J2s'],
  ['T9s','T8s','T7s','T6s','T5s','T4s','T3s','T2s'],
  ['98s','97s','96s','95s','94s','93s','92s'],
  ['87s','86s','85s','84s','83s','82s'],
  ['76s','75s','74s','73s','72s'],
  ['65s','64s','63s','62s'],
  ['54s','53s','52s'],
  ['43s','42s'],
  ['32s'],
  // OFFSUIT
  ['AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o'], 
  ['KQo','KJo','KTo','K9o','K8o','K7o','K6o','K5o','K4o','K3o','K2o'],
  ['QJo','QTo','Q9o','Q8o','Q7o','Q6o','Q5o','Q4o','Q3o','Q2o'],
  ['JTo','J9o','J8o','J7o','J6o','J5o','J4o','J3o','J2o'],
  ['T9o','T8o','T7o','T6o','T5o','T4o','T3o','T2o'],
  ['98o','97o','96o','95o','94o','93o','92o'],
  ['87o','86o','85o','84o','83o','82o'],
  ['76o','75o','74o','73o','72o'],
  ['65o','64o','63o','62o'],
  ['54o','53o','52o'],
  ['43o','42o'],
  ['32o']
]

export const rangeFromCombos = (selectedCombos = {}) => {
  return flatMap(combinableComboGroups, (combinableComboGroup) => {
    return combineGroup(combinableComboGroup, selectedCombos)
  })
  .filter((group) => group.length && group[0])
  .map(simplifyCombinedGroup)
  .join(', ')
}

const combineGroup = (combinableGroup, selectedCombos) => {
  let result = []

  let startIndex = 0
  while (startIndex < combinableGroup.length) {

    let lastIndex = startIndex
    let currentIndex = startIndex+1

    while (currentIndex < combinableGroup.length 
      && shouldCombineComboGroups(combinableGroup[lastIndex], combinableGroup[currentIndex], selectedCombos)) {
      lastIndex = currentIndex
      currentIndex++ 
    }

    if (startIndex !== lastIndex) {
      result.push(combinableGroup.slice(startIndex, lastIndex+1))
    } else {
      const comboGroupId = combinableGroup[startIndex]
      const selectedCombinableGroup = selectedCombos[comboGroupId]

      if (selectedCombinableGroup) {
        result.push([convertToRangeText(comboGroupId, selectedCombinableGroup)])
      }
    }

    startIndex = lastIndex + 1
  }

  return result
}

const shouldCombineComboGroups = (comboGroupId1, comboGroupId2, selectedCombos) => {
  const selectedCombos1 = selectedCombos[comboGroupId1]
  const selectedCombos2 = selectedCombos[comboGroupId2]

  return entireComboGroupSelected(comboGroupId1, selectedCombos1)
    && entireComboGroupSelected(comboGroupId2, selectedCombos2)
}

const entireComboGroupSelected = (comboGroupId, selectedCombos = []) => {
  const combos = comboGroups[comboGroupId].combos

  return selectedCombos.length === combos.length
}

const convertToRangeText = (comboGroupId, selectedCombos) => {
  let result

  if (entireComboGroupSelected(comboGroupId, selectedCombos)) {
    result = comboGroupId
  } else {
    result = selectedCombos.join(',')
  }

  return result
}

const simplifyCombinedGroup = (combinedGroup = []) => {
  let result

  if (combinedGroup.length === 1) {
    result = combinedGroup[0]
  } else {
    result = addDashOrPlusToGroup(combinedGroup)
  }

  return result
}

const addDashOrPlusToGroup = (combinedGroup) => {
  let result
  const firstComboGroup = combinedGroup[0]

  if (['AA','AKs','AKo'].includes(firstComboGroup)) {
    result = `${combinedGroup[combinedGroup.length -1]}+`
  } else {
    result = `${firstComboGroup}-${combinedGroup[combinedGroup.length - 1]}`
  }

  return result
}
