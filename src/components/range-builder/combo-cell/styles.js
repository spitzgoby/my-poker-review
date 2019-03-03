import {
  rangeColors,
  themeColors
} from 'styles/colors'

const comboCellColors = {
  unsuited: 'rgb(255, 255, 255)',
  pair: 'rgb(221, 219, 203)',
  suited: 'rgb(245, 241, 227)'
}

const getBackgroundColor = (props, hover = false) => {
  let backgroundColor
  const {
    color,
    combo,
    selected
  } = props

  if (hover) {
    backgroundColor = selected 
      ? rangeColors['dark' + color]
      : rangeColors[color]
  } else {
    if (selected) {
      backgroundColor = rangeColors[color]
    } else if (combo.suited) {
      backgroundColor = comboCellColors.suited
    } else if (combo.pair) {
      backgroundColor = comboCellColors.pair
    } else {
      backgroundColor = comboCellColors.unsuited
    }
  }

  return backgroundColor
}

const getColor = (props, hover = false) => {
  return props.selected || hover
    ? themeColors.lightTextColor 
    : themeColors.darkTextColor
}

export const styles = {
  combocell: {
    backgroundColor: props => getBackgroundColor(props, false),
    border: `1px solid ${themeColors.darkTextColor}`,
    color: props => getColor(props, false),
    fontFamily: 'sans-serif',
    fontWeight: '300',
    fontSize: '1.5rem',
    height: '64px',
    textAlign: 'center',
    width: '64px',

    '&:hover': {
      backgroundColor: props => getBackgroundColor(props, true),
      color: props => getColor(props, true)
    }
  }
}