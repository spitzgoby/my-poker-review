import Color from 'color'

const DARK_COLOR_SUFFIX = 'dark'
const generateColor = (colorInfo) => {
  const color = Color(colorInfo.rgb)
  const darkenAmount = 0.10

  return {
    [colorInfo.name]: color.string(),
    [DARK_COLOR_SUFFIX + colorInfo.name]: color.darken(darkenAmount).string()
  }
}

export const generateColors = (colorList) => {
  return colorList.reduce((acc, colorInfo) => ({
    ...acc,
    ...generateColor(colorInfo)
  }), {})
}
