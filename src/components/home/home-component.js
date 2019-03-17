import PropTypes from 'prop-types'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import RangeEquities from 'components/range-equities'
import RangeOutput from 'components/range-output'
import React, {Component} from 'react'

import './home.scss'
import 'typeface-roboto'


class Home extends Component {

  static propTypes = {
    ranges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      selectedComboIds: PropTypes.arrayOf(PropTypes.string)
    })).isRequired
  }

  render() {
    return (
      <div className="home">
        <RangeBuilder className="home--range-builder" />
        <div className="home--range-info"> 
          <RangeAnalyzer />
        </div>
      </div>
    )
  }
}

export default Home
