import {cardColors} from 'styles/colors'

const SUIT_INDEX = 1

const getColor = (props, hover) => {
  return hover 
    ? cardColors['dark' + props.cardId[SUIT_INDEX]]
    : cardColors[props.cardId[SUIT_INDEX]]
}

export default {
  icon: {
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
    borderRadius: '4px',
    fill: (props) => getColor(props, false),
    height: '56px',
    marginRight: '0.5rem',
    stroke: (props) => getColor(props, false),
    width: '38px',

    '&:hover': {
      fill: (props) => getColor(props, true),
      stroke: (props) => getColor(props, true)
    }
  }
}