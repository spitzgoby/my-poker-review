import {generateColors} from 'styles/colors/generate-colors'

export const cardColorList = [{
  name: 'c',
  rgb: [59, 178, 115]
},{
  name: 'd',
  rgb: [77, 157, 224]
},{
  name: 'h',
  rgb: [225, 85, 84]
},{
  name: 's',
  rgb: [0, 15, 8]
}]

export const cardColors = generateColors(cardColorList) 

