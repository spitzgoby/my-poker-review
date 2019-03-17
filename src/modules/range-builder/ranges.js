const rangeInfo = [{
  name: 'Bet',
  color: 'blue'
},{
  name: 'Call',
  color: 'green'
},{
  name: 'Raise',
  color: 'purple'
}]

const buildRanges = () => {
  return rangeInfo.reduce((acc, info, index) => {
    acc[index] = {
      id: index,
      color: info.color,
      name: info.name,
      selectedComboGroupIds: [],
      selectedCombos: {}
    }

    return acc
  }, {})
}

export const ranges = buildRanges()