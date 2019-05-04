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
  const bottom = props.lastRow ? '0' : '1px'
  const right = props.lastColumn ? '0' : '1px'

  return `0 ${right} ${bottom} 0`
}

const getColor = (props, hover = false) => {
  return props.color || hover
    ? themeColors.lightTextColor 
    : themeColors.darkTextColor
}

export const styles = {
  combocell: {
    backgroundColor: props => getBackgroundColor(props, false),
    borderColor: '#e0e0e0',
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