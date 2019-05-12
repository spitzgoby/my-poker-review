import classnames from 'classnames'
import BoardInput from 'components/board/input'
import CardIcon from 'components/card-icon/component'
import styles from 'components/board/styles'
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
    return (
      <Paper className={this.props.className}> 
        <Toolbar>
          <Typography className={this.props.classes.title} variant="h5">
            Board
          </Typography>
        </Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <BoardInput {...this.getFlopProps()} />
            {this.renderCardIcons()}
          </Grid>
          <Grid item xs={3}>
            <BoardInput {...this.getFlopProps()} />
            {this.renderCardIcons()}
          </Grid>
          <Grid item xs={3}>
            <BoardInput {...this.getFlopProps()} />
            {this.renderCardIcons()}
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

  handleBoardChange(value) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({value})
    }
  }
}

export default injectSheet(styles)(Board)