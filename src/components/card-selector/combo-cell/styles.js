import {rangeColors} from 'styles/colors'

const getBackgroundColor = (props, hover) => {
  let color

  if (hover) {
    color = props.selected
      ? rangeColors['dark' + props.color]
      : rangeColors[props.selectedColor]
  } else {
    color = props.selected
      ? rangeColors[props.selectedColor]
      : 'white'
  }

  return color
}

export default {
  cell: {
    backgroundColor: (props) => getBackgroundColor(props, false),
    border: 'none',
    padding: '12px',

    '&:hover': {
      backgroundColor: (props) => getBackgroundColor(props, true)
    },

    '&:last-child': {
      padding: '12px'
    }
  }
}