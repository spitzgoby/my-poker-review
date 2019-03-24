import {CARD_REGEX} from 'util/poker-constants'
import {createCard} from 'lib/cards'
import {uniqBy} from 'lodash'

export const getCardsFromInput = (input) => {
  const tokens = input.match(CARD_REGEX) || []
  const cards = tokens.map((token) => {
    const rank = token[0].toUpperCase()
    const suit = token[1].toLowerCase()

    return createCard(rank, suit)
  })

  return uniqBy(cards, 'id')
}

export default getCardsFromInput