import Answer from 'components/equity-analyzer/quiz/answer'
import CardList from 'components/card-list'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Quiz = props => {

    const {
        classes,
        currentQuestion,
        currentQuestionIndex,
        quizLength
    } = props

    const getCardListProps = () => ({
        count: 2,
        cards: currentQuestion.cards,
        display: 'inline',
        showCardSelector: false
    })

    const renderQuestion = () => {
        return (
            <>
                <div className={classes.quizHeader}>
                    <CardList {...getCardListProps()} />
                    <Typography display="inline">Answered <strong>{currentQuestionIndex}</strong> of <strong>{quizLength}</strong></Typography>
                    <Button variant="contained" color="primary">Done</Button>
                </div>
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