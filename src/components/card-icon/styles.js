import {cardColors} from 'styles/colors'

const SUIT_INDEX = 1

const getFill = (props, hover) => {
  return hover 
    ? cardColors['dark' + props.cardId[SUIT_INDEX]]
    : cardColors[props.cardId[SUIT_INDEX]]
}

export default {
  icon: {
    fill: (props) => getFill(props, false),
    height: '56px',
    marginRight: '0.5rem',
    width: '44px',

    '&:hover': {
      fill: (props) => getFill(props, true),
    }
  }
}