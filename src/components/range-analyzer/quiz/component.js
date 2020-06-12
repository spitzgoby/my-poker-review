import Answer from './answer'
import CardList from 'components/card-list'
import MissedQuestion from './missed-question'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const Quiz = props => {
    const {
        actions: {
            answerQuestion,
            exitQuiz,
            finishQuiz,
            startQuiz
        },
        classes,
        currentQuestion,
        currentQuestionIndex,
        missedQuestions,
        quizFinished,
        quizLength,
        totalCorrect,
        totalMissed
    } = props

    const handleAnswerSelect = answer => {
        answerQuestion && answerQuestion(answer)
    }

    const handleDoneButtonClick = () => {
        finishQuiz && finishQuiz()
    }

    const handleTakeNewQuizButtonClicked = () => {
        startQuiz && startQuiz()
    }

    const handleExitButtonClicked = () => {
        exitQuiz && exitQuiz()
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

    const quizResultsActionButtonColors = {
        exit: 'secondary',
        takeNewQuiz: 'primary'
    }
    const quizResultsActionHandlers = {
        exit: handleExitButtonClicked,
        takeNewQuiz: handleTakeNewQuizButtonClicked
    }
    const getQuizResultsActionButtonProps = (buttonName) => ({
        classes: {root: classes.quizResultsAction},
        color: quizResultsActionButtonColors[buttonName],
        onClick: quizResultsActionHandlers[buttonName],
        variant: 'outlined'
    })

    const renderQuizResults = () => {
        return (
            <>
                <div className={classes.quizResultsHeader}>
                    <Typography variant="h4">
                        Your Score: {totalCorrect}/{quizLength} 
                    </Typography>
                    <div className={classes.quizResultsActions}>
                        <Button {...getQuizResultsActionButtonProps('takeNewQuiz')}>
                            Take New Quiz
                        </Button>
                        <Button {...getQuizResultsActionButtonProps('exit')}>
                            Exit
                        </Button>
                    </div>
                </div>
                <br />
                <Typography variant="subtitle1">
                    You skipped {`${quizLength - (totalCorrect + totalMissed)}/${quizLength}`}
                </Typography>
                {missedQuestions.map((missedQuestion, index) => <MissedQuestion key={index} missedQuestion={missedQuestion} />)}
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
                <div className={classes.quizAnswers}>
                    {currentQuestion.answers.map(answer => <Answer {...getAnswerProps(answer)} />)}
                </div>
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