import CardList from 'components/card-list'
import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const propTypes = {
    missedQuestion: PropTypes.shape({
        answer: PropTypes.shape({
            color: PropTypes.string,
            name: PropTypes.string
        }),
        question: PropTypes.shape({
            cards: PropTypes.arrayOf(PropTypes.object)
        })
    })
}

const MissedQuestion = (props) => {
    const {
        classes,
        missedQuestion: {
            question: {
                cards
            }
        }
    } = props


    return (
        <div className={classes.missedQuestion}>
            <CardList cards={cards} count={2} showCardSelector={false} />
        </div>
    )
}

MissedQuestion.propTypes = propTypes

export default injectSheet(styles)(MissedQuestion)