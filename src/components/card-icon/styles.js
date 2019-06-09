import Color from 'color'
import {
  cardColors,
  themeColors
} from 'styles/colors'

const darkPrimary = Color(themeColors.primary).darken(.10).string()

const getColor = (props, hover) => {
  const {
    card,
    disabled
  } = props
  let color

  if (disabled) {
    color = themeColors.lightGray 
  } else if (card) {
    const suit = card.suit
    color = hover 
      ? cardColors['dark' + suit]
      : cardColors[suit]
  } else {
    color = hover
      ? darkPrimary
      : themeColors.primary
  }

  return color
}

const heights = {
  sm: '36px',
  md: '56px'
}

const getHeight = (props) => {
  const size = props.size || 'md'

  return heights[size]
}

const widths = {
  sm: '29px',
  md: '44px'
}

const getWidth = (props) => {
  const size = props.size || 'md'

  return widths[size]
}

const boxShadow = '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);'
const border = `1px solid ${themeColors.mediumGray}`

export default {
  icon: {
    backgroundColor: 'white',
    border: (props) => props.variant === 'outline' ? border : 'none',
    borderRadius: '4px',
    boxShadow: (props) => props.variant === 'shadow' ? boxShadow : 'none',
    fill: (props) => getColor(props, false),
    height: (props) => getHeight(props),
    stroke: (props) => getColor(props, false),
    width: (props) => getWidth(props),

    '&:hover': {
      cursor: (props) => props.disabled ? 'default': 'pointer',
      fill: (props) => getColor(props, true),
      stroke: (props) => getColor(props, true)
    }
  }
}