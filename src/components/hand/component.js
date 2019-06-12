import CardInput from 'components/card-input'
import CardList from 'components/card-list'
import styles from 'components/hand/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Hand extends Component {

  constructor(props) {
    super(props)

    this.handleCardInputChange = this.handleCardInputChange.bind(this)
  }

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    })),
    hand: PropTypes.string
  }

  render() {
    const classes = this.props.classes

    return (
      <Paper className={classes.hand}>
        <Grid container>
          <Grid item xs={12}>
            <CardInput label="Hand" />
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.cards} container direction="row">
              <CardList {...this.getCardListProps()} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ) 
  }

  getCardInputProps() {


    return {
      onChange: this.handleCardInputChange,
      value: this.props.hand
    }
  }

  getCardListProps() {
    return {
      cards: [],
      count: 2,
      label: 'HOLE'
    }
  }

  handleCardInputChange(event) {
    const onChange = this.props.actions.onChange

    if (onChange) {
      onChange(event.target.value)
    }
  }
}

export default injectSheet(styles)(Hand)