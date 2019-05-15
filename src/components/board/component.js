import classnames from 'classnames'
import BoardInput from 'components/board/input'
import CardIcon from 'components/card-icon'
import styles from 'components/board/styles'
import Street from 'components/board/street'
import {HANDS} from 'lib/poker-constants'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
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
        <Toolbar className={classes.title}>
          <Typography variant="h5">
            Board
          </Typography>
        </Toolbar>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <BoardInput {...this.getFlopProps()} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
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

  renderCardIcons() {
    return this.props.cards.map((card) => {
      return <CardIcon card={card} key={card.id} />
    })
  }

  getFlopProps() {
    const {
      board,
      classes
    } = this.props

    return {
      board,
      className: classnames(classes.input, classes.flop),
      street: 'Flop',
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