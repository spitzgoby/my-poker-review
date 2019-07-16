import styles from 'components/range-composition-chart/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeCompositionChart extends Component {
  render() {
    return (
      <Paper> 
        <Typography variant="h6">
          Range Composition
        </Typography>
      </Paper>
    ) 
  }
}

export default injectSheet(styles)(RangeCompositionChart)