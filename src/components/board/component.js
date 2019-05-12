import BoardInput from 'components/board/input'
import CardIcon from 'components/card-icon/component'
import styles from 'components/board/styles'
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
    )
  }

  render() {
    return (
      <div> 
        <BoardInput {...this.getBoardProps()} />
        {this.renderCardIcons()}
      </div>
    ) 
  }

  renderCardIcons() {
    return this.props.cards.map((card) => {
      return <CardIcon card={card} key={card.id} />
    })
  }

  getBoardProps() {
    return {
      board: this.props.board,
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