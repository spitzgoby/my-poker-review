import {
  cell,
  getColor as getRangeColor
} from 'components/range-analyzer/shared/styles'

const getColor = (props) => {
  return props.color
    ? props.color
    : getRangeColor(props.range, props.selected, false)
}

export default {
  ...cell,
  button: {
    color: (props) => getColor(props),
    minHeight: '48px'
  }
}