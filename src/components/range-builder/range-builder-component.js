import classnames from 'classnames'
import ComboCell from 'components/range-builder/combo-cell'
import comboRows from 'modules/range-builder/combo-rows'
import comboGroups from 'lib/combo-groups'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import 'components/range-builder/range-builder.scss'

class RangeBuilder extends Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return (
      <div className={this.getClass()}>
        {this.renderRangeTable()}
      </div>
    ) 
  }

  renderRangeTable() {
    return (
      <div className="range-builder">
        <table> 
          <tbody>
            {this.renderComboGroups()}
          </tbody>
        </table>
      </div>
    )
  }

  renderComboGroups() {
    return comboRows.map((comboRow) => this.renderRow(comboRow))
  }

  renderRow(row, index) {
    return (
      <tr key={index}>
        {row.map(comboGroupId => 
          <ComboCell key={comboGroupId} comboGroup={comboGroups[comboGroupId]} />
        )}
      </tr>
    )
  }

  getClass() {
    return classnames("range-builder", this.props.className)
  }
}

export default RangeBuilder