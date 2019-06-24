import Board from 'components/board/component'
import {
  getInputMode,
  setInputMode
} from 'modules/application'
import {
  clearBoard,
  getBoard,
  getBoardCards,
  selectBoardCards,
  setBoard
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  board: getBoard(state),
  cards: getBoardCards(state),
  inputMode: getInputMode(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearBoard,
    selectBoardCards,
    setBoard,
    setInputMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
