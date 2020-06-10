import {cardify} from 'util/card-parser'

const NOT_IN_RANGE = {
    name: "Not In Range",
    color: "white",
    correct: false,
    id: 'not-in-range'
}

const generateAnswers = (ranges, correctRange) =>
    ranges.concat(NOT_IN_RANGE).map(range => ({
        color: range.color,
        correct: range.id === correctRange.id,
        id: range.id,
        name: range.name
    }))

export const generateQuestion = (combo, ranges, correctRange) => {
    return {
        cards: cardify(combo),
        answers: generateAnswers(ranges, correctRange)
    }
}