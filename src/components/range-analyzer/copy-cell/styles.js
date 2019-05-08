import {
  cell,
  getColor
} from 'components/range-analyzer/shared/styles'
import {themeColors} from 'styles/colors'

export default {
  ...cell,
  copy: {
    color: (props) => getColor(props.range, props.selected, false)
  },

  message: {
    backgroundColor: themeColors.primary
  }
}