import {createMuiTheme} from '@material-ui/core/styles';
import {themeColors} from 'styles/colors'

export const theme = createMuiTheme({
  palette: {
    error: {
      main: themeColors.error
    },
    primary: {
      main: themeColors.primary
    },
    secondary: {
      main: themeColors.secondary
    }
  },
  typography: {
    useNextVariants: true
  }
})

export default theme