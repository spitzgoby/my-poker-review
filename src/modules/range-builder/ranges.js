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



export const createRange = (info, id) => {
  return {
    id,
    color: info.color,
    name: info.name,
    selectedComboGroupIds: [],
    selectedCombos: {}
  }
}

const buildRanges = () => {
  return rangeInfo.reduce((acc, info, index) => {
    acc[index] = createRange(info, index)

    return acc
  }, {})
}

export const ranges = buildRanges()