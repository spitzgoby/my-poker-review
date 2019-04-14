import Color from 'color'

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

const DARK_COLOR_SUFFIX = 'dark'
const generateColors = (colorInfo) => {
  const color = Color(colorInfo.rgb)
  const darkenAmount = 0.10

  return {
    [colorInfo.name]: color.string(),
    [DARK_COLOR_SUFFIX + colorInfo.name]: color.darken(darkenAmount).string()
  }
}

export const rangeColors = rangeColorList.reduce((acc, colorInfo) => ({
    ...acc,
    ...generateColors(colorInfo)
}), {})
