import {rangeColors} from 'styles/colors'

export default {
  root: {
    width: '100%',

    '&:hover': {
      backgroundColor: '#eee',

      '$rect': {
        border: '1px solid black'
      }
    }
  },

  checkbox: {
    padding: 0
  },

  name: {
    marginRight: '16px',
    textAlign: 'right',
    width: '128px',
  },

  rectContainer: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '16px',
    width: 'calc(100% - 160px)',
  },

  rect: {
    backgroundColor: (props) => rangeColors[props.selectedRange.color],
    borderRadius: '4px',
    display: 'inline-block',
    height: '16px',
    marginRight: (props) => props.hand.value > 0 ? '8px' : '0px',
    transition: '200ms ease-out',
    width: (props) => `${(80 * props.hand.value).toFixed(1)}%`,

    '&:hover': {
      border: '1px solid black'
    }
  }
}