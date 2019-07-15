import {gutterWidth} from 'styles/layout'

export const styles = {
  root: {
    margin: `80px 0 ${gutterWidth} ${gutterWidth}`
  },

  analyzergrid: {
    display: 'inline-block',
    marginTop: 0
  },

  '@media (max-width: 1280px)':{
    rangebuilder: {
      marginRight: gutterWidth
    }
  }
}

export default styles