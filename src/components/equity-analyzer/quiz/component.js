import Answer from 'components/equity-analyzer/quiz/answer'
import CardList from 'components/card-list'
import MissedQuestion from 'components/equity-analyzer/quiz/missed-question'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Quiz = props => {
    const {
        actions: {
            answerQuestion,
            finishQuiz
        },
        classes,
        currentQuestion,
        currentQuestionIndex,
        missedQuestions,
        quizFinished,
        quizLength,
        totalCorrect,
    } = props

    const handleAnswerSelect = answer => {
        if (answerQuestion) {
            answerQuestion(answer)
        }
    }

    const handleDoneButtonClick = () => {
        if (finishQuiz) {
            finishQuiz()
        }
    }

    const getCardListProps = () => ({
        cards: currentQuestion.cards,
        cardSize: 'lg',
        count: 2,
        display: 'inline',
        showCardSelector: false
    })

    const getDoneButtonProps = () => ({
        classes: {root: classes.doneButton}, 
        color:"secondary",
        onClick: handleDoneButtonClick,
        variant: "outlined"
    })

    const getAnswerProps = answer => ({
        answer,
        key: answer.id,
        onSelectAnswer: handleAnswerSelect
    })

    const renderQuizResults = () => {
        return (
            <>
                <Typography variant='h4' display='inline'>
                    Your Score: {totalCorrect}/{quizLength} 
                </Typography>
                <br />
                {missedQuestions.map(missedQuestion => <MissedQuestion missedQuestion={missedQuestion} />)}
            </>
        )
    }

    const renderQuestion = () => {
        return (
            <>
                <div className={classes.quizHeader}>
                    <CardList {...getCardListProps()} />
                    <div className={classes.quizInfo}>
                        <Button {...getDoneButtonProps()}>Done</Button>
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