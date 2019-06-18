import uuid from 'uuid/v4'

/*----------------*
 * DEFAULT RANGES *
 *----------------*/

const rangeInfo = [{
  id: uuid(),
  name: 'Villain',
  color: 'blue'
}]

/*------------------*
 * HELPER FUNCTIONS *
 *------------------*/

export const createRange = (info, id) => {
  const rangeId = id || uuid() 

  return {
    id: rangeId,
    color: info.color,
    name: info.name,
    selectedCombos: {}
  }
}

const buildRanges = (rangeInfo) => {
  return rangeInfo.reduce((acc, info) => {
    const range = createRange(info, info.id)
    acc[range.id] = range

    return acc
  }, {})
}

export const ranges = buildRanges(rangeInfo)
export const rangeList = rangeInfo.map((info) => info.id)