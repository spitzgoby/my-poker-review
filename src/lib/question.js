import {cardify} from 'util/card-parser'

const NOT_IN_RANGE_ID = 'not-in-range'
const NOT_IN_RANGE = {
    name: "Not In Range",
    color: "white",
    id: NOT_IN_RANGE_ID
}

const isCorrectRange = (range, correctRange) =>
    (!correctRange && range.id === NOT_IN_RANGE_ID) ||
    (correctRange && correctRange.id === range.id)

const generateAnswers = (ranges, correctRange) =>
    ranges.concat(NOT_IN_RANGE).map(range => ({
        color: range.color,
        correct: isCorrectRange(range, correctRange),
        id: range.id,
        name: range.name
    }))

export const generateQuestion = (combo, ranges, correctRange) => {
    return {
        cards: cardify(combo),
        answers: generateAnswers(ranges, correctRange)
    }
}