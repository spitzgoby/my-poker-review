import Color from 'color'
import {transitionTimes} from 'styles/animations'
import {
  cardColors,
  themeColors
} from 'styles/colors'

const lightSecondary = Color(themeColors.secondary).lighten(.25).string()

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
      ? lightSecondary
      : themeColors.secondary
  }

  return color
}

const getCursor = props => {
  return (isClickable(props))
    ? 'pointer'
    : 'default'
}

const getHoverBackgroundColor = props => {
  return (isClickable(props))
    ? themeColors.neutralGray
    : 'white'
}

const getHeight = (props, smallScreen) => {
  let height

  switch (props.size) {
    case 'lg':
      height = smallScreen ? '72px' : '96px'
      break

    default:
      height = smallScreen ? '36px' : '48px'      
      break
  }

  return height
}

const getWidth = (props, smScreen) => {
  let width

  switch (props.size) {
    case 'lg':
      width = smScreen ? '54px' : '72px'
      break

    default:
      width = smScreen ? '27px' : '36px' 
      break
  }

  return width
}

const isClickable = props => !props.disabled

const boxShadow = '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);'
const border = `1px solid ${themeColors.mediumGray}`

export default {
  icon: {
    backgroundColor: 'white',
    border: props => props.variant === 'outline' ? border : 'none',
    borderRadius: '4px',
    boxShadow: props => props.variant === 'shadow' ? boxShadow : 'none',
    fill: props => getColor(props, false),
    height: props => getHeight(props, false),
    stroke: props => getColor(props, false),
    width: props => getWidth(props, false),
    transition: transitionTimes.default,

    '@media (max-width: 600px)': {
      height: (props) => getHeight(props, true),
      width: (props) => getWidth(props, true)
    }
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