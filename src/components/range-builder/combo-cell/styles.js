import {
  rangeColors,
  themeColors
} from 'styles/colors'

const comboCellColors = {
  unsuited: 'rgb(255, 255, 255)',
  pair: 'rgb(221, 219, 203)',
  suited: 'rgb(245, 241, 227)'
}

const getBackgroundColor = (props) => {
  let color = 'white'
  const combo = props.combo

  if (props.selected) {
    console.log(props)
    color = rangeColors[props.color]
  } else if (combo.suited) {
    color = comboCellColors.suited
  } else if (combo.pair) {
    color = comboCellColors.pair
  } else {
    color = comboCellColors.unsuited
  }

  return color
}

export const styles = {
  combocell: {
    backgroundColor: props => getBackgroundColor(props),
    color: props => props.selected 
      ? themeColors.lightTextColor 
      : themeColors.darkTextColor,
    border: `1px solid ${themeColors.darkTextColor}`,
    fontSize: '1.5rem',
    fontFamily: 'sans-serif',
    fontWeight: 'lighter',
    height: '64px',
    width: '64px',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: props => props.selected 
        ? rangeColors['dark' + props.color]
        : rangeColors[props.color],
      color: themeColors.lightTextColor
    }
  }
}