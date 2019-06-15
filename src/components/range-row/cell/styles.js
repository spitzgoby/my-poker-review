import {gutterWidth} from 'styles/layout'

export default {
  root: {
    paddingLeft: gutterWidth,
    paddingRight: gutterWidth,

    '&:last-child': {
      paddingRight: gutterWidth
    }
  }
}