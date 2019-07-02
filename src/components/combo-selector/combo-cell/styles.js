import {
  rangeColors,
  themeColors
} from 'styles/colors'

const getBackgroundColor = (props, hover) => {
  const {
    disabled,
    range,
    selected,
    selectedColor
  } = props
  const color = range ? range.color : ''
  let backgroundColor

  if (disabled) {
    backgroundColor = themeColors.neutralGray
  } else if (hover) {
    backgroundColor = selected
      ? rangeColors['dark' + selectedColor]
      : rangeColors[selectedColor]
  } else {
    backgroundColor = selected
      ? rangeColors[color]
      : 'white'
  }

  return backgroundColor
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

    '&:last-child': {
      padding: '12px'
    }
  },

  '@media (hover: hover)': {
    cell: {
      '&:hover': {
        backgroundColor: (props) => getBackgroundColor(props, true),
        cursor: (props) => props.disabled ? 'default' : 'pointer'
      }
    }
  },
}