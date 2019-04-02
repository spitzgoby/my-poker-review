import {
  rangeColors,
  themeColors
} from 'styles/colors'
import {types} from 'lib/combos'

const comboCellColors = {
  [types.OFFSUIT]: 'rgb(255, 255, 255)',
  [types.PAIR]: 'rgb(221, 219, 203)',
  [types.SUITED]: 'rgb(245, 241, 227)'
}

const getBackgroundColor = (props, hover = false) => {
  let backgroundColor
  const {
    color,
    comboGroup,
    selectedColor
  } = props

  if (hover) {
    backgroundColor = color
      ? rangeColors['dark' + selectedColor]
      : rangeColors[selectedColor]
  } else {
    backgroundColor = color 
      ? rangeColors[color]
      : comboCellColors[comboGroup.type]
  }

  return backgroundColor
}

const getBorderWidth = (props) => {
  const bottom = props.lastRow ? '1px' : '0'
  const right = props.lastColumn ? '1px' : '0'

  return `1px ${right} ${bottom} 1px`
}


const getColor = (props, hover = false) => {
  return props.color || hover
    ? themeColors.lightTextColor 
    : themeColors.darkTextColor
}

export const styles = {
  combocell: {
    backgroundColor: props => getBackgroundColor(props, false),
    borderColor: themeColors.darkTextColor,
    borderStyle: 'solid',
    borderWidth: props => getBorderWidth(props),
    color: props => getColor(props, false),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    fontWeight: '300',
    fontSize: '1.5rem',
    height: '64px',
    width: 'calc(100% / 13)',

    '&:hover': {
      backgroundColor: props => getBackgroundColor(props, true),
      color: props => getColor(props, true)
    },
  }
}