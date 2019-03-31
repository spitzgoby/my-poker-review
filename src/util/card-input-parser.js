import {CARD_REGEX} from 'lib/poker-constants'
import {createCard} from 'lib/cards'
import {uniqBy} from 'lodash'

export const parseCardInput = (input) => {
  const tokens = input.match(CARD_REGEX) || []
  const cards = tokens.map((token) => {
    const rank = token[0].toUpperCase()
    const suit = token[1].toLowerCase()

    return createCard(rank, suit)
  })

  return uniqBy(cards, 'id')
}

export default parseCardInput