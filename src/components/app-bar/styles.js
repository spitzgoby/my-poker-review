import {themeColors} from 'styles/colors'
import {gutterWidth} from 'styles/layout'

const {
  lightText
} = themeColors

export default {
  toolbar: {
    paddingLeft: gutterWidth,
    paddingRight: gutterWidth,
  },

  title: {
    color: lightText,
    paddingTop: '12px'
  },

  cancelediting: {
    bottom: '16px',
    position: 'fixed',
    right: '16px'
  }
}