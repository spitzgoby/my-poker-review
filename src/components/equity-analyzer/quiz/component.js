import Answer from 'components/equity-analyzer/quiz/answer'
import CardList from 'components/card-list'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Quiz = props => {
    const {
        actions: {
            answerQuestion
        },
        classes,
        currentQuestion,
        currentQuestionIndex,
        quizFinished,
        quizLength,
        totalCorrect,
        totalMissed
    } = props

    const handleAnswerSelect = answer => {
        if (answerQuestion) {
            answerQuestion(answer)
        }
    }

    const getCardListProps = () => ({
        cards: currentQuestion.cards,
        cardSize: 'lg',
        count: 2,
        display: 'inline',
        showCardSelector: false
    })

    const getAnswerProps = answer => ({
        answer,
        key: answer.id,
        onSelectAnswer: handleAnswerSelect
    })

    const renderQuizResults = () => {
        return (
            <>
                <div>You got {totalCorrect} right</div>
                <div>You got {totalMissed} wrong</div>
            </>
        )
    }

    const renderQuestion = () => {
        return (
            <>
                <div className={classes.quizHeader}>
                    <CardList {...getCardListProps()} />
                    <div className={classes.quizInfo}>
                        <Button variant="contained" color="primary">Done</Button>
                        <div className={classes.spacer}/>
                        <Typography display="inline">Answered <strong>{currentQuestionIndex}</strong> of <strong>{quizLength}</strong></Typography>
                    </div>
                </div>
                {currentQuestion.answers.map(answer => <Answer {...getAnswerProps(answer)} />)}
            </>
        )
    }

    const renderQuiz = () => {
        return quizFinished 
            ? renderQuizResults()
            : renderQuestion()
    }

    return (
        <div className={classes.quiz}>
            {currentQuestion || quizFinished
                ? renderQuiz() 
                : <Typography>Please Select A Range To Generate A Quiz</Typography>
            }
        </div>
    )
}

export default injectSheet(styles)(Quiz)