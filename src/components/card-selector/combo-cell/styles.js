import {
  rangeColors,
  themeColors
} from 'styles/colors'

const getBackgroundColor = (props, hover) => {
  let color

  if (props.combo.id === 'Ac2c') {
    console.log(props)
  }

  if (hover) {
    color = props.selected
      ? rangeColors['dark' + props.selectedColor]
      : rangeColors[props.selectedColor]
  } else {
    color = props.selected
      ? rangeColors[props.color]
      : 'white'
  }

  return color
}

const getBorderWidth = (props) => {
  const bottom = props.lastRow ? '0' : '1px'
  const right = props.lastColumn ? '0' : '1px'

  return `0 ${right} ${bottom} 0`
}

export default {
  cell: {
    backgroundColor: (props) => getBackgroundColor(props, false),
    borderColor: themeColors.borderGray,
    borderWidth: (props) => getBorderWidth(props),
    borderStyle: 'solid',
    padding: '12px',

    '&:hover': {
      backgroundColor: (props) => getBackgroundColor(props, true)
    },

    '&:last-child': {
      padding: '12px'
    }
  }
}