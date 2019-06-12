import Hand from 'components/hand/component'
import {
  getHand,
  setHand
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  hand: getHand(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectCards: () => {},
    setHand
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
