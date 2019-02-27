import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    error: {
      main: '#f34213'  
    },
    primary: {
      main: '#136f63'
    },
    secondary: {
      main: '#3e2f5b'
    }
  },
  typography: {
    useNextVariants: true
  }
})

export default theme