import {getColor} from 'components/range-analyzer/shared/styles'
import {themeColors} from 'styles/colors'
import cellStyles from 'components/range-analyzer/cell/shared/styles'

export const styles = {
  ...cellStyles,
  input: {
    color: (props) => getColor(props.range, props.selected, false),

    '&:after': {
      borderBottom: `2px solid ${themeColors.lightTextColor}`
    }
  }
}