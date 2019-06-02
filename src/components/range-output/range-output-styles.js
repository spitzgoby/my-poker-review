import {
  rangeColors,
  themeColors
} from 'styles/colors'

const getBackgroundColor = (props, hover = false) => {
  let color

  if (hover) {
    color = props.selected
      ? rangeColors['dark'+props.color]
      : themeColors.neutralGray
  } else {
    color = props.selected
      ? rangeColors[props.color]
      : 'white'
  }

  return color
}

const getBorderColor = (props, hover) => {
  let color

  if (props.selected || hover) {
    color = rangeColors['dark'+props.color]
  } else {
    color = rangeColors[props.color]
  }

  return color
}

const getBorder = (props, hover) => {
  return `1px solid ${getBorderColor(props, hover)}`
}

const getColor = (props, hover) => {
  let color

  if (hover) {
    color = props.selected
      ? themeColors.lightText
      : rangeColors['dark'+props.color]
  } else {
    color = props.selected
      ? themeColors.lightText
      : rangeColors[props.color]
  }

  return color
}

const getFontWeight = (props) => {
  return props.rangeOutput
    ? 900
    : 600
}

export const styles = {
  card: {
    backgroundColor: props => getBackgroundColor(props, false),
    border: props => getBorder(props, false),
    boxShadow: 'none',
    color: props => getColor(props, false),
    fontWeight: props => getFontWeight(props),
    height: '56px',
    marginBottom: '0.5rem',

    '&:hover': {
      backgroundColor: props => getBackgroundColor(props, true),
      border: props => getBorder(props, true),
      color: props => getColor(props)
    }
  },
  
  cardcontent: {
    paddingBottom: props => props.combos ? '14px' : '16px',
    paddingTop: props => props.combos ? '14px' : '16px',
    '&:last-child': {
      paddingBottom: props => props.combos ? '14px' : '16px',
    },
  }
}

export default styles