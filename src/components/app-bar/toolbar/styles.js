import {themeColors} from 'styles/colors'
import {gutterWidth} from 'styles/layout'

const {
  lightText,
  primary
} = themeColors

export default {
  button: {
    color: lightText
  },

  snackbar: {
    backgroundColor: primary,
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