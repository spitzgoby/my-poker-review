import {
  cell, 
  getColor
} from 'components/range-row/shared/styles'
import {themeColors} from 'styles/colors'

export const styles = {
  ...cell,
  input: {
    color: (props) => getColor(props.range, props.selected, false),

    '&:after': {
      borderBottom: `2px solid ${themeColors.lightText}`
    }
  }
}