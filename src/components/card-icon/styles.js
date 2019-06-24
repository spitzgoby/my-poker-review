import Color from 'color'
import {transitionTimes} from 'styles/animations'
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

const getCursor = (props) => {
  return (isClickable(props))
    ? 'pointer'
    : 'default'
}

const getHoverBackgroundColor = (props) => {
  return (isClickable(props))
    ? themeColors.neutralGray
    : 'white'
}

const isClickable = (props) => !props.disabled

const boxShadow = '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);'
const border = `1px solid ${themeColors.mediumGray}`

export default {
  icon: {
    backgroundColor: 'white',
    border: (props) => props.variant === 'outline' ? border : 'none',
    borderRadius: '4px',
    boxShadow: (props) => props.variant === 'shadow' ? boxShadow : 'none',
    fill: (props) => getColor(props, false),
    height: (props) => '48px',
    stroke: (props) => getColor(props, false),
    width: (props) => '36px',
    transition: transitionTimes.default
  },

  '@media (hover: hover)': {
    'icon': {
      '&:hover': {
        backgroundColor: (props) => getHoverBackgroundColor(props),
        cursor: (props) => getCursor(props),
        fill: (props) => getColor(props, true),
        stroke: (props) => getColor(props, true)
      }
    }
  }
}