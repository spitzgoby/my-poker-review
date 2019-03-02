import {connect} from 'react-redux'
import Home from 'components/home/home-component'
import {getRanges} from 'modules/range-builder'

const mapStateToProps = (state) => ({
  ranges: getRanges(state)
})

export default connect(mapStateToProps)(Home)