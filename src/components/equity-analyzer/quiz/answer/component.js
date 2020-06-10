import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Answer = props => {
    const {
        answer,
        classes
    } = props

    return (
        <div className={classes.answer}>
            {answer.name}
        </div>
    )
}

export default injectSheet(styles)(Answer)