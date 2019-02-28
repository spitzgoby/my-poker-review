import Color from 'color'

// THEME
export const darkTextColor = 'rgb(0, 15, 8)'
export const lightTextColor = 'rgb(255, 255, 255)'

// RANGES
const rangeColorInfo = [{
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
}]

const generateColors = (colorInfo) => {
  const DARKEN_PERCENTAGE = 0.10
  const color = Color(colorInfo.rgb)
  const darkerColor = color.darken(DARKEN_PERCENTAGE)

  return {
    [colorInfo.name]: color.string(),
    [colorInfo.name+'Dark']: darkerColor.rgb().string()
  }
}

export const rangeColors = rangeColorInfo.reduce((acc, colorInfo) => ({
    ...acc,
    ...generateColors(colorInfo)
}), {})


