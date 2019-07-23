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

    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setHighlightedCombos: PropTypes.func
    }),
    hand: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })
  }

  render() {
    const {
      classes,
      hand
    } = this.props

    return (
      <ListItem {...this.getProps()}> 
        <Checkbox className={classes.checkbox} />
        <div className={classes.name}>
          {hand.name}
        </div>
        <div className={classes.rectContainer}>
          <Tooltip title={`${hand.combos.length} combos`}>
            <div className={classes.rect} />
          </Tooltip>
          <span className={classes.value}>{`${(hand.value * 100).toFixed(1)}%`}</span>
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

  handleMouseOver() {
    this.highlightCombos(this.props.hand.combos)
  }

  handleMouseOut() {
    this.highlightCombos([])
  }

  highlightCombos(combos) {
    const setHighlightedCombos = this.props.actions.setHighlightedCombos

    if (setHighlightedCombos) {
      setHighlightedCombos(combos)
    }
  }
}

export default injectSheet(styles)(RangeCompositionChartBar)