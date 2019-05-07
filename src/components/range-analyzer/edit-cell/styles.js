import {
  cell,
  getColor
} from 'components/range-analyzer/shared/styles'

export default {
  ...cell,
  button: {
    color: (props) => getColor(props.range, props.selected, false)
  },

  expand: {
    color: (props) => getColor(props.range, props.selected, false),
    visibility: (props) => props.expandable ? 'visible' : 'hidden'
  }
}