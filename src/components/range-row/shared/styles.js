import {
  rangeColors,
  themeColors
} from 'styles/colors'

export const getRangeColor = (range, dark = false) => {
  let color

  if (range) {
    color = dark
      ? rangeColors['dark' + range.color]
      : rangeColors[range.color]
  }

  return color
}

export const getColor = (range, selected, hover) => {
  let color

  if (hover) {
    color = selected
      ? themeColors.darkText
      : getRangeColor(range, true)
  } else {
    color = selected
      ? themeColors.darkText
      : getRangeColor(range, true)
  }

  return color
}

export const cell = {
  cell: {
    borderBottom: (props) => props.expanded 
      ? 'none'
      : `1px solid rgb(224, 224, 224)`,
    color: (props) => getColor(props.range, props.selected, false),
    width: (props) => props.width,

    '&:hover': {
      color: (props) => getColor(props.range, props.selected, true)
    }
  }
}
