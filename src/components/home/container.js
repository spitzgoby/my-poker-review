import {connect} from 'react-redux'
import Home from 'components/home/component'
import {getMode} from 'modules/application'
import {getRanges} from 'modules/range-builder'

const mapStateToProps = (state) => ({
  mode: getMode(state),
  ranges: getRanges(state)
})

export default connect(mapStateToProps)(Home)