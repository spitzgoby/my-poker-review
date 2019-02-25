import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getPlayerHand,
  setPlayerHand
} from 'modules/range-builder'
import RangeInput from 'components/range-input/range-input-component'

const mapStateToProps = (state) => ({
  playerHand: getPlayerHand(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setPlayerHand
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeInput)