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

export const cell = {
  cell: {
    borderBottom: (props) => props.expanded 
      ? 'none'
      : `1px solid ${themeColors.neutralGray}`,
    color: (props) => getColor(props.range, props.selected, false),
    width: (props) => props.width,

    '&:hover': {
      color: (props) => getColor(props.range, props.selected, true)
    }
  }
}
