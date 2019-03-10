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
  return rangeInfo.reduce((acc, info) => {
    acc[info.name] = {
      name: info.name,
      color: info.color,
      selectedComboGroupIds: [],
      selectedHands: new Set()
    }

    return acc
  }, {})
}

export const ranges = buildRanges()