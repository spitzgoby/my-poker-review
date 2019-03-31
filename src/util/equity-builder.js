import {getCards} from 'util/card-input-parser'
import {filterDeadCards} from 'util/hands-output-builder'
import {
  raceRange,
  rates
} from 'pec'

const DEFAULT_TIMES = 1E4

/*----------------*
 * BUILD EQUITIES *
 *----------------*/

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
  const remainingVillainHands = filterDeadCards(villainHands, deadCards)
  const raceResults = raceRange(playerCards, remainingVillainHands, times, board)
  const results = rates(raceResults)

  return {
    win: results.winRate,
    lose: results.looseRate,
    tie: results.tieRate
  }
}


export default buildEquities