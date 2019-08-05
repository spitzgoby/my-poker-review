import styles from 'components/range-composition-chart/bar/styles'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeCompositionChartBar extends Component {

  constructor(props) {
    super(props)

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setHighlightedCombos: PropTypes.func
    }),
    checked: PropTypes.bool,
    hand: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    }),
    combosMode: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    const {
      classes,
      combosMode,
      hand
    } = this.props

    return (
      <ListItem {...this.getProps()}> 
        <Checkbox {...this.getCheckboxProps()} />
        <div className={classes.name}>
          {hand.name}
        </div>
        <div className={classes.rectContainer}>
          <Tooltip title={combosMode ? this.getRatioValue() : this.getCombosValue()}>
            <div className={classes.rect} />
          </Tooltip>
          <span className={classes.value}>{
            combosMode 
              ? this.getCombosValue() 
              : this.getRatioValue()}
          </span>
        </div>
      </ListItem>
    ) 
  }

  getProps() {
    return {
      className: this.props.classes.root,
      onMouseOut: this.handleMouseOut,
      onMouseOver: this.handleMouseOver
    }
  }

  getCheckboxProps() {
    const {
      checked,
      classes
    } = this.props

    return {
      checked,
      className: classes.checkbox,
      onChange: this.handleCheckboxChange
    }
  }

  handleMouseOver() {
    this.highlightCombos(this.props.hand.combos)
  }

  handleMouseOut() {
    this.highlightCombos([])
  }

  handleCheckboxChange(event, checked) {
    const {
      hand,
      onChange
    } = this.props

    if (onChange) {
      onChange(hand.name, checked)
    }
  }

  getCombosValue() {
    return `${this.props.hand.combos.length} combos`
  }

  getRatioValue() {
    return `${(this.props.hand.value * 100).toFixed(1)}%`
  }

  highlightCombos(combos) {
    const {
      actions: {
        setHighlightedCombos
      },
      hand
    } = this.props


    if (setHighlightedCombos && hand.combos.length > 0) {
      setHighlightedCombos(combos)
    }
  }
}

export default injectSheet(styles)(RangeCompositionChartBar)