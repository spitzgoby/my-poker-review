import classnames from 'classnames'
import BoardInput from 'components/board/input'
import styles from 'components/board/styles'
import Street from 'components/board/street'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Board extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setBoard: PropTypes.func
    }).isRequired,
    board: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    ),
    className: PropTypes.string
  }

  render() {
    const classes = this.props.classes

    return (
      <Paper className={this.getClass()}> 
        <Grid container>
          <Grid item xs={12}>
            <BoardInput {...this.getFlopProps()} />
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.streets} container direction="row">
              <Street street="FLOP" />
              <Street street="TURN" />
              <Street street="RIVER" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ) 
  }

  getFlopProps() {
    const {
      board,
      classes
    } = this.props

    return {
      board,
      className: classnames(classes.input, classes.flop),
      onChange: this.handleBoardChange
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.board, className)
  }

  handleBoardChange(value) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({value})
    }
  }
}

export default injectSheet(styles)(Board)