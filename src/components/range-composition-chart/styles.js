import {rangeColors} from 'styles/colors'

export default {
  rangename: {
    color: (props) => rangeColors[props.selectedRange.color]
  },

  chart: {
    width: '100%'
  },

  axis: {
    fontFamily: 'Roboto',
    fontSize: '16px'
  }
}