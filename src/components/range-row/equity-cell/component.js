import RangeRowCell from 'components/range-row/cell'
import styles from 'components/range-row/equity-cell/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class EquityCell extends Component {
  constructor(props) {
    super(props)

    this.handleCalculateButtonClick = this.handleCalculateButtonClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      calculateEquity: PropTypes.func
    }).isRequired,
    calculable: PropTypes.bool,
    equity: PropTypes.shape({
      lose: PropTypes.number,
      tie: PropTypes.number,
      win: PropTypes.number
    }),
    pending: PropTypes.bool,
    range: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <RangeRowCell align='right' className={this.props.classes.cell}>
        {this.renderContent()}
      </RangeRowCell>
    ) 
  }

  renderContent() {
    const {
      equity,
      pending
    } = this.props
    let component = null

    if (pending) {
      component = this.renderProgress()
    } else if (equity && equity.win) {
      component = this.renderValue()
    } else {
      component = this.renderButton()
    }

    return component
  }

  renderValue() {
    const {
      classes,
      equity 
    } = this.props
    const winResult = (equity.win * 100).toFixed(1) + '%'
    const tieResult = (equity.tie * 100).toFixed(1) + '%'

    return (
      <span>
        <span className={classes.strong}>{winResult}</span>
        <span className={classes.light}>({tieResult})</span>
      </span>
    )
  }

  renderProgress() {
    return (
      <CircularProgress color="inherit" size={32} />
    )
  }

  renderButton() {
    return (
      <Tooltip title={this.getTooltipTitle()}>
        <div className={this.props.classes.wrapper}>
          <Button {...this.getCalculateButtonProps()}>
            Calculate
          </Button>
        </div>
      </Tooltip>
    )
  }

  getCalculateButtonProps() {
    const {
      calculable,
      classes
    } = this.props

    return {
      className: classes.button,
      disabled: !calculable,
      onClick: this.handleCalculateButtonClick
    }
  }

  getTooltipTitle() {
    return `Calculate hand equity against ${this.props.range.name}`
  }

  handleCalculateButtonClick(event) {
    const calculateEquity = this.props.actions.calculateEquity

    event.stopPropagation()

    if (calculateEquity) {
      calculateEquity(this.props.range.id)
    }
  }
}

export default injectSheet(styles)(EquityCell)