import uuid from 'uuid/v4'

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
  const rangeId = id || uuid() 

  return {
    id: rangeId,
    color: info.color,
    name: info.name,
    selectedComboGroupIds: [],
    selectedCombos: {}
  }
}

const buildRanges = () => {
  return rangeInfo.reduce((acc, info) => {
    const range = createRange(info)
    acc[range.id] = range

    return acc
  }, {})
}

export const ranges = buildRanges()