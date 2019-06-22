import {themeColors} from 'styles/colors'

export default {
  street: {
    display: 'flex',
    flexDirection: 'column'
  },

  cards: {
    display: 'flex',
    flexDirection: 'row'
  },

  card: {
    marginRight: '8px'
  },

  subtitle: {
    color: (props) => props.disabled ? themeColors.mediumGray : themeColors.secondary,
    marginRight: '8px'
  }
}