import {
  raceRange,
  rates
} from 'pec'

const DEFAULT_TIMES = 1E4

export const buildEquities = (playerHand, villainHands, times = DEFAULT_TIMES) => {
  const playerCards = getCards(playerHand)
  const remainingVillainHands = filterPlayerHand(playerCards, villainHands)
  const raceResults = raceRange(playerCards, remainingVillainHands, times)
  const results = rates(raceResults)

  return {
    win: results.winRate,
    lose: results.looseRate,
    tie: results.tieRate
  }
}

const filterPlayerHand = (playerCards, villainHands) => {
  const playerCardsDict = playerCards.reduce((result, card) => {
    result[card] = true

    return result
  }, {})

  return villainHands.filter((hand) => {
    return !(playerCardsDict[hand[0]] || playerCardsDict[hand[1]])
  })
}

const getCards = (hand) => {
  const card1 = hand.slice(0, 2)
  const card2 = hand.slice(2)

  return [card1, card2]
}

export default buildEquities