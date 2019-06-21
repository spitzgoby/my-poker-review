import Hand from 'components/hand/component'
import {getInputMode} from 'modules/application'
import {
  getHand,
  getHandCards,
  selectHandCards,
  setHand
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  hand: getHand(state),
  handCards: getHandCards(state),
  inputMode: getInputMode(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectHandCards,
    setHand
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
