import cellStyles from 'components/range-analyzer/cell/shared/styles'
import {getColor} from 'components/range-analyzer/shared/styles'

export default {
  ...cellStyles,
  copy: {
    color: (props) => getColor(props.range, props.selected, false)
  }
}