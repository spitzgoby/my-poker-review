import PropTypes from 'prop-types'
import React from 'react'

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
        missedQuestion: {
            question: {
                cards
            }
        }
    } = props


    return (
        <div>Missed Question: {cards[0].text}{cards[1].text}</div>
    )
}

MissedQuestion.propTypes = propTypes

export default MissedQuestion