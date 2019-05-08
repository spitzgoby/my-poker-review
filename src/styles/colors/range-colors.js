import {generateColors} from 'styles/colors/generate-colors'

export const rangeColorList = [{
  name: 'blue',
  rgb: [77, 157, 224]
},{
  name: 'red',
  rgb: [225, 85, 84]
},{
  name: 'yellow',
  rgb: [255, 188, 41]
},{
  name: 'green',
  rgb: [59, 178, 115]
},{
  name: 'purple',
  rgb: [119, 104, 174]
},{
  name: 'black',
  rgb: [0, 15, 8]
}]

export const rangeColorNames = ['blue', 'red', 'yellow', 'green', 'purple', 'black']

export const rangeColors = generateColors(rangeColorList)
