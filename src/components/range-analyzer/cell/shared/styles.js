import {getColor} from 'components/range-analyzer/shared/styles'
import {themeColors} from 'styles/colors'

export default {
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