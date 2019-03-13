import {
  rangeColors,
  themeColors
} from 'styles/colors'

export const styles = {
  row: {
    backgroundColor: props => rangeColors[props.range.color]
  },
  cell: {
    color: themeColors.lightTextColor
  },
  name: {
    fontWeight: 600 
  },
  editable: {
    color: themeColors.lightTextColor,
    '&:after': {
      borderBottom: `2px solid ${themeColors.lightTextColor}`
    }
  }
}