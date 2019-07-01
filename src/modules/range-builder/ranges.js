import uuid from 'uuid/v4'

/*----------------*
 * DEFAULT RANGES *
 *----------------*/

const rangeInfo = [{
  id: uuid(),
  name: 'Villain',
  color: 'blue'
},{
  id: uuid(),
  name: 'Cyan',
  color: 'cyan'
},{
  id: uuid(),
  name: 'Green',
  color: 'green'
},{
  id: uuid(),
  name: 'Orange',
  color: 'orange'
},{
  id: uuid(),
  name: 'Purple',
  color: 'purple'
},{
  id: uuid(),
  name: 'Yellow',
  color: 'yellow'
},{
  id: uuid(),
  name: 'Red',
  color: 'red',
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
export const rangeIdList = rangeInfo.map((info) => info.id)