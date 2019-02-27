import CssBaseline from '@material-ui/core/CssBaseline'
import Home from 'components/home'
import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react'
import {Route} from 'react-router-dom'
import theme from 'components/app/theme'

const App = () => (
  <div>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <main>
        <Route exact path="/" component={Home} />
      </main>
    </MuiThemeProvider>
  </div>
)

export default App
