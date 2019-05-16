import Board from 'components/board/component'
import {
  getBoard,
  getBoardCards,
  setBoard
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  board: getBoard(state),
  cards: getBoardCards(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setBoard
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)