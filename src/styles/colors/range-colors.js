import {generateColors} from 'styles/colors/generate-colors'

export const rangeColorList = [{
  name: 'blue',
  rgb: [143, 196, 227]
},{
  name: 'cyan',
  rgb: [104, 216, 210]
},{
  name: 'green',
  rgb: [205, 219, 98]
},{
  name: 'orange',
  rgb: [248, 174, 98]
},{
  name: 'purple',
  rgb: [191, 183, 216]
},{
  name: 'red',
  rgb: [223, 104, 107]
},{
  name: 'yellow',
  rgb: [252, 191, 52]
}]

export const rangeColorNames = ['blue', 'red', 'yellow', 'green', 'purple', 'black']

export const rangeColors = generateColors(rangeColorList)
