import cards, {createCard} from 'lib/cards'
import getCardsFromInput from '../card-input-parser'

describe('Card Input Parser', () => {
  const aceOfDiamonds = createCard('A', 'd')
  const aceOfSpades = createCard('A', 's')

  it('should return an empty list for an empty input', () => {
    expect(getCardsFromInput('')).toEqual([])
  })

  it('should parse all valid card inputs', () => {
    cards.forEach((card) => {
      expect(getCardsFromInput(card.text)).toEqual([card])
    })
  })

  it('should ignore the case of the input', () => {
    expect(getCardsFromInput('aD')).toEqual([aceOfDiamonds])
  })

  it('should parse multiple cards from a valid input', () => {
    expect(getCardsFromInput('AdAs')).toEqual([aceOfDiamonds, aceOfSpades])
  })

  it('should ignore invalid input and return all valid cards', () => {
    expect(getCardsFromInput('AdA')).toEqual([aceOfDiamonds])
  })

  it('should parse the input if it does not contain a card', () => {
    expect(getCardsFromInput('A')).toEqual([])
  })

  it('should only return one instance of a valid card', () => {
    expect(getCardsFromInput('AdAd')).toEqual([aceOfDiamonds])
  })
})