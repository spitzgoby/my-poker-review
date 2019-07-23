import Bar from 'components/range-composition-chart/bar'
import styles from 'components/range-composition-chart/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeCompositionChart extends Component {

  constructor(props) {
    super(props)

    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this)
  }

  static propTypes = {
    rangeComposition: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    }))
  }

  static defaultProps = {
    rangeComposition: []
  }

  render() {
    const {
      classes,  
      selectedRange
    } = this.props

    return (
      <Paper> 
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography className={classes.title} variant="h6">
                Range Composition 
                <span className={classes.rangename}>
                  {selectedRange.name}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              {this.renderCloseButton()} 
            </Grid>
          </Grid>
        </Toolbar>
        {this.renderChart()}

        <div className={classes.chart} ref={this.setChartContainerRef} />
      </Paper>
    ) 
  }

  renderCloseButton() {
    return (
      <Tooltip title="Close the Range Composition Chart">
        <IconButton {...this.getCloseButtonProps()}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    ) 
  }

  renderChart() {
    return (
      <List>
        {this.props.rangeComposition.map((hand) => <Bar hand={hand} />)}
      </List>
    )
  }


  getCloseButtonProps() {
    return {
      onClick: this.handleCloseButtonClick
    }
  } 

  handleCloseButtonClick() {
    const setCompositionChartOpen = this.props.actions.setCompositionChartOpen

    if (setCompositionChartOpen) {
      setCompositionChartOpen(false)
    }
  }
}

export default injectSheet(styles)(RangeCompositionChart)