import Answer from 'components/equity-analyzer/quiz/answer'
import CardList from 'components/card-list'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import injectSheet from 'react-jss'
import styles from './styles'

const Quiz = props => {

    const {
        classes,
        currentQuestion
    } = props

    const renderQuestion = () => {
        return (
            <>
                <CardList count={2} cards={currentQuestion.cards} showCardSelector={false} />
                {currentQuestion.answers.map(answer => <Answer answer={answer} key={answer.id} />)}
            </>
        )
    }

    return (
        <div className={classes.quiz}>
            {currentQuestion 
                ? renderQuestion() 
                : <Typography>Please Select A Range To Generate A Quiz</Typography>
            }
        </div>
    )
}

export default injectSheet(styles)(Quiz)