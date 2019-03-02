import {
  lightTextColor,
  rangeColors,
  themeColors
} from 'styles/colors'

const getBackgroundColor = (props, hover = false) => {
  let color

  if (hover) {
    color = props.selected
      ? rangeColors[props.color].dark
      : themeColors.neutralGray
  } else {
    color = props.selected
      ? rangeColors[props.color].primary
      : 'white'
  }

  return color
}

const getBorderColor = (props, hover) => {
  let color

  if (props.selected || hover) {
    color = rangeColors[props.color].dark
  } else {
    color = rangeColors[props.color].primary
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
      ? lightTextColor
      : rangeColors[props.color].dark
  } else {
    color = props.selected
      ? lightTextColor
      : rangeColors[props.color].primary
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