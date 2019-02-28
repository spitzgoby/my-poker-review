import {CARD_REGEX} from 'util/poker-constants'
import {
  raceRange,
  rates
} from 'pec'

const DEFAULT_TIMES = 1E4

export const buildEquities = (options) => {
  const {
    board,
    playerHand,
    times = DEFAULT_TIMES,
    villainHands
  } = options
  const boardCards = getCards(board)
  const playerCards = getCards(playerHand)
  const deadCards = boardCards.concat(playerCards)
  const remainingVillainHands = filterHands(deadCards, villainHands)
  const raceResults = raceRange(playerCards, remainingVillainHands, times, board)
  const results = rates(raceResults)

  return {
    win: results.winRate,
    lose: results.looseRate,
    tie: results.tieRate
  }
}

const filterHands = (deadCards, hands) => {
  const deadCardsDict = deadCards.reduce((result, card) => {
    result[card] = true

    return result
  }, {})

  return hands.filter((hand) => {
    return !(deadCardsDict[hand[0]] || deadCardsDict[hand[1]])
  })
}

const getCards = (input) => {
  return input.match(CARD_REGEX)
}

export default buildEquities