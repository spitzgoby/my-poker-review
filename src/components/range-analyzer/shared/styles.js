import {
  rangeColors,
  themeColors
} from 'styles/colors'

export const getRangeColor = (range, dark = false) => {
  return dark 
    ? rangeColors['dark' + range.color]
    : rangeColors[range.color]
}

export const getColor = (range, selected, hover) => {
  let color

  if (hover) {
    color = selected
      ? themeColors.lightTextColor
      : getRangeColor(range, true)
  } else {
    color = selected
      ? themeColors.lightTextColor
      : getRangeColor(range, false)
  }

  return color
}
