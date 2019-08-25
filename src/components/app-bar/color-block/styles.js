import {rangeColors} from 'styles/colors'

export default {
  block: {
    backgroundColor: (props) => rangeColors[props.color],
    height: '24px',
    width: '24px'
  }
}