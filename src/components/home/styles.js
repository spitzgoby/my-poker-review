import {gutterWidth} from 'styles/layout'

export const styles = {
  root: {
    margin: `${gutterWidth} 0 ${gutterWidth} ${gutterWidth}`
  },

  '@media (max-width: 1280px)':{
    rangebuilder: {
      marginRight: gutterWidth
    }
  },

  subtitle: {
    padding: gutterWidth
  }
}

export default styles