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
  }
}