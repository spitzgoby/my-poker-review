import {modes} from 'lib/application-constants'
import {gutterWidth} from 'styles/layout'

export const styles = {
  root: {
    margin: `80px 0 ${gutterWidth} ${gutterWidth}`
  },

  analyzergrid: {
    display: 'inline-block',
    marginTop: 0,
    paddingTop: (props) => props.mode === modes.QUIZ ? '0px' : 'inherit'
  },

  '@media (max-width: 1280px)':{
    analyzergrid: {
      order: 2
    },

    rangebuilder: {
      marginRight: gutterWidth,
      order: 1
    }
  }
}

export default styles