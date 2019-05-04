import Color from 'color'
import {transitionTime} from 'styles/animations'
import {themeColors} from 'styles/colors'

const darkerMediumGray = Color(themeColors.neutralGray)
  .darken(0.02)
  .string()

export default {
  dropzone: {
    backgroundColor: themeColors.neutralGray,
    border: `dashed 2px ${themeColors.mediumGray}`,
    borderRadius: '4px',
    color: themeColors.lightGray,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '2px',
    minWidth: '30rem',
    padding: '1rem',
    transition: transitionTime,

    '&:hover': {
      backgroundColor: darkerMediumGray,
      borderColor: themeColors.secondary,
      cursor: 'pointer',

      '& $text, & $cloudcontainer': {
        color: themeColors.secondary
      }
    }
  },

  cloudcontainer: {
    display: 'flex',
    justifyContent: 'center',
    transition: transitionTime
  },

  cloudicon: {
    fontSize: '64px'
  },

  fileinput: {
    display: "none"
  },

  text: {
    color: themeColors.lightGray,
    transition: transitionTime
  }
}