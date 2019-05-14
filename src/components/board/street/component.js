import styles from 'components/board/street/styles'
import CardIcon from 'components/card-icon'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Street extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const {
      cards,
      classes,
      street
    } = this.props

    return (
      <div className={classes.street}> 
        <span className={classes.cards}>{
          cards.map((card) => 
            <CardIcon card={card} key={card.id} /> 
          )
        }</span>
        <div className={classes.subtitle}>
          <Typography color="secondary" variant="subtitle2">
            {cards.length ? street : null}
          </Typography>
        </div>
      </div>
    ) 
  }
}

export default injectSheet(styles)(Street)