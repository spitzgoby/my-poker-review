import Color from 'color'
import {themeColors} from 'styles/colors'

const darkerMediumGray = Color(themeColors.neutralGray)
  .darken(0.02)
  .string()

export default {
  dropzone: {
    backgroundColor: themeColors.neutralGray,
    border: `dashed 2px ${themeColors.mediumGray}`,
    borderRadius: '4px',
    color: themeColors.mediumGray,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '2px',
    minWidth: '30rem',
    padding: '1rem',
    transition: '200ms',

    '&:hover': {
      backgroundColor: darkerMediumGray,
      borderColor: themeColors.primary,
    }
  },

  cloudcontainer: {
    display: 'flex',
    justifyContent: 'center'
  },

  cloudicon: {
    fontSize: '64px'
  },

  fileinput: {
    display: "none"
  }
}