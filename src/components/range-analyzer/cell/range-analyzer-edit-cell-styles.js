import {getColor} from 'components/range-analyzer/shared/styles'
import cellStyles from 'components/range-analyzer/cell/shared/styles'

export default {
  ...cellStyles,
  button: {
    color: (props) => getColor(props.range, props.selected, false)
  },

  expand: {
    color: (props) => getColor(props.range, props.selected, false),
    visibility: (props) => props.expandable ? 'visible' : 'hidden',
    transition: '200ms'
  }
}