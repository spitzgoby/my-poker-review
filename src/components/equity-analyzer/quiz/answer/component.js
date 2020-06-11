import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Answer = props => {
    const {
        answer,
        classes,
        onSelectAnswer
    } = props

    const handleClick = () => {
        if (onSelectAnswer) {
            onSelectAnswer(answer)
        }
    }

    return (
        <div className={classes.answer} onClick={handleClick}>
            {answer.name}
        </div>
    )
}

export default injectSheet(styles)(Answer)