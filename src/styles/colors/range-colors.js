import {generateColors} from 'styles/colors/generate-colors'

export const rangeColorList = [{
  name: 'black',
  rgb: [0, 15, 8]
},{
  name: 'blue',
  rgb: [53, 148, 204]
},{
  name: 'cyan',
  rgb: [46, 176, 169]
},{
  name: 'green',
  rgb: [163, 179, 41]
},{
  name: 'orange',
  rgb: [246, 145, 43]
},{
  name: 'purple',
  rgb: [119, 104, 174]
},{
  name: 'red',
  rgb: [209, 44, 47]
},{
  name: 'yellow',
  rgb: [252, 191, 52]
}]

export const rangeColorNames = ['blue', 'red', 'yellow', 'green', 'purple', 'black']

export const rangeColors = generateColors(rangeColorList)
