import {
  cell,
  getColor
} from 'components/range-analyzer/shared/styles'

export default {
  ...cell,
  copy: {
    color: (props) => getColor(props.range, props.selected, false)
  }
}