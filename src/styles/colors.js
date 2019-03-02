import Color from 'color'

// THEME
export const themeColors = {
  error: 'rgb(243, 66, 19)',
  primary: 'rgb(19, 111, 99)',
  secondary: 'rgb(62, 47, 91)',
  tertiary: 'rgb(245, 241, 227)',
  neutralGray: 'rgb(250, 250, 250)'
}

// TEXT
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
  const color = Color(colorInfo.rgb)
  const darkenAmount = 0.10

  return {
    [colorInfo.name]: {
      primary: color.string(),
      dark: color.darken(darkenAmount).string()
    }
  }
}

export const rangeColors = rangeColorInfo.reduce((acc, colorInfo) => ({
    ...acc,
    ...generateColors(colorInfo)
}), {})

// RANGE BUILDER
export const rangeBuilderColors = {
  unsuited: 'rgb(255, 255, 255)',
  pair: 'rgb(221, 219, 203)',
  suited: 'rgb(245, 241, 227)'
}


