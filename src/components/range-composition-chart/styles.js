import {rangeColors} from 'styles/colors'

const getColor = (props) => {
  return rangeColors[props.selectedRange.color]
}

export default {
  root: {
    display: 'inline-block',
    width: '100%'
  },

  title: {
    margin: '16px'
  },

  chart: {
    width: '100%'
  },

  bar: {
    fill: props => getColor(props, false),
    height: 20,
    x: 4,

    '&:hover': {
      stroke: 'black'
    }
  },

  axis: {
    fontFamily: 'Roboto',
    fontSize: '16px'
  }
}