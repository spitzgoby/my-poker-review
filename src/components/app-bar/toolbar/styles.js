import {themeColors} from 'styles/colors'
import {gutterWidth} from 'styles/layout'

const {
  lightText
} = themeColors

export default {
  button: {
    color: lightText
  },

  snackbar: {
    color: lightText
  },

  toolbar: {
    paddingLeft: gutterWidth,
    paddingRight: gutterWidth,
  },

  title: {
    color: lightText,
    paddingTop: '12px'
  },

  wrapper: {
    display: 'inline-block'
  }
}