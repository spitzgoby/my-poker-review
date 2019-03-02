import {
  darkTextColor,
  lightTextColor,
  rangeBuilderColors,
  rangeColors
} from 'styles/colors'

const getBackgroundColor = (props) => {
  let color = 'white'
  const combo = props.combo

  if (props.selected) {
    console.log(props)
    color = rangeColors[props.color].primary
  } else if (combo.suited) {
    color = rangeBuilderColors.suited
  } else if (combo.pair) {
    color = rangeBuilderColors.pair
  } else {
    color = rangeBuilderColors.unsuited
  }

  return color
}

export const styles = {
  combocell: {
    backgroundColor: props => getBackgroundColor(props),
    color: props => props.selected 
      ? lightTextColor 
      : darkTextColor,
    border: `1px solid ${darkTextColor}`,
    fontSize: '1.5rem',
    fontFamily: 'sans-serif',
    fontWeight: 'lighter',
    height: '64px',
    width: '64px',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: props => props.selected 
        ? rangeColors[props.color].dark
        : rangeColors[props.color].primary,
      color: lightTextColor
    }
  }
}