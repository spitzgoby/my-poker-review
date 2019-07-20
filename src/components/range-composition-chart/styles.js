import {rangeColors} from 'styles/colors'

export default {
  root: {
    display: 'inline-block',
    width: '100%'
  },

  title: {
    margin: '16px'
  },

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