import {bindActionCreators} from 'redux'
import BoardInput from 'components/board-input/board-input-component'
import {connect} from 'react-redux'
import {
  getBoard,
  setBoard
} from 'modules/range-builder'

const mapStateToProps = (state) => ({
  board: getBoard(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setBoard
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardInput)