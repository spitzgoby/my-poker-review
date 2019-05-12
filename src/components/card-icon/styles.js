import {cardColors} from 'styles/colors'

const getColor = (props, hover) => {
  const suit = props.card.suit
  return hover 
    ? cardColors['dark' + suit]
    : cardColors[suit]
}

export default {
  icon: {
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
    borderRadius: '4px',
    fill: (props) => getColor(props, false),
    height: '56px',
    marginRight: '0.5rem',
    stroke: (props) => getColor(props, false),
    width: '44px',

    '&:hover': {
      fill: (props) => getColor(props, true),
      stroke: (props) => getColor(props, true)
    }
  }
}