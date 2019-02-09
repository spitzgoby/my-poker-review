import ComboCell from './combo-cell'
import React, { Component } from 'react'

import './range-builder.scss'

class RangeBuilder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: []
    }
  }

  componentWillMount() {
    this.combos = this.buildCombos() 
  }

  buildCombos() {
    const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']

    let combos = []

    for (let i = 0; i < ranks.length; i++) {
      combos.push([])
      for (let j = 0; j < ranks.length; j++) {
        let combo = ''
        if (i < j) {
          combo = {
            suited: true,
            value: `${ranks[i]}${ranks[j]}`
          }
        } else if (i > j) {
          combo = {
            suited: false,
            value: `${ranks[j]}${ranks[i]}`
          }
        } else {
          combo = {
            suited: false,
            value: `${ranks[j]}${ranks[i]}`
          }
        }

        combos[i].push(combo)
      }
    }

    return combos
  }

  render() {
    return (
      <div className="range-builder">
        <h1>Range Builder</h1> 
        <table>
          <tbody>
            {this.renderCombos()}
          </tbody>
        </table>
      </div>
    ) 
  }

  renderCombos() {
    return this.combos.map((comboRow, index) => {
        return (
          <tr key={index}>
            {comboRow.map(combo => {
              return <ComboCell {...this.getComboProps(combo)} />
            })}
          </tr>
        )
      })
  }

  getComboProps(combo) {
    return {
      combo: combo,
      key: combo.value,
      onSelect: this.handleSelect.bind(this, combo),
      selected: this.state.selected.includes(combo)
    }
  }

  handleSelect(selectedCombo) {
    if (this.state.selected.includes(selectedCombo)) {
      this.setState({
        selected: this.state.selected.filter(combo => combo !== selectedCombo)
      })
    } else {
      this.setState({
        selected: this.state.selected.concat([selectedCombo])
      })
    }
  }
}

export default RangeBuilder