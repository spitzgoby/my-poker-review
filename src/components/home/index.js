import BoardInput from 'components/board-input'
import { 
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import RangeBuilder from 'components/range-builder'
import RangeEquities from 'components/range-equities'
import RangeInput from 'components/range-input'
import RangeOutput from 'components/range-output'
import React, { Component } from 'react'

import './home.scss'
import 'typeface-roboto'

const theme = createMuiTheme({
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

class Home extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="home">
          <CssBaseline />
          <RangeBuilder className="home--range-builder" />
          <div className="home--range-info"> 
            {this.renderRangeOuput()}
            {this.renderRangeInput()}
            {this.renderBoardInput()}
            {this.renderRangeEquities()}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  renderRangeOuput() {
    return (
      <div>
        <h2>Opponent's Range</h2>
        <RangeOutput />
      </div>
    )
  }

  renderRangeInput() {
    return (
      <div className="home--range-input">
        <h2>My Hand</h2>
        <RangeInput />
      </div>
    )
  }

  renderBoardInput() {
    return (
      <div className="home--board-input">
        <h2>Board</h2>
        <BoardInput />
      </div>
    )
  }

  renderRangeEquities() {
    return (
      <div className="home--range-equities">
        <h2>Equity</h2>
        <RangeEquities />
      </div>
    )
  }
}

export default Home

