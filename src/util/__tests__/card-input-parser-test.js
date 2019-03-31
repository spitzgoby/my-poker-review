import cards, {createCard} from 'lib/cards'
import parseCardInput from 'util/card-input-parser'

describe('Card Input Parser', () => {
  const aceOfDiamonds = createCard('A', 'd')
  const aceOfSpades = createCard('A', 's')

  it('should return an empty list for an empty input', () => {
    expect(parseCardInput('')).toEqual([])
  })

  it('should parse all valid card inputs', () => {
    cards.forEach((card) => {
      expect(parseCardInput(card.text)).toEqual([card])
    })
  })

  it('should ignore the case of the input', () => {
    expect(parseCardInput('aD')).toEqual([aceOfDiamonds])
  })

  it('should parse multiple cards from a valid input', () => {
    expect(parseCardInput('AdAs')).toEqual([aceOfDiamonds, aceOfSpades])
  })

  it('should ignore invalid input and return all valid cards', () => {
    expect(parseCardInput('AdA')).toEqual([aceOfDiamonds])
  })

  it('should parse the input if it does not contain a card', () => {
    expect(parseCardInput('A')).toEqual([])
  })

  it('should only return one instance of a valid card', () => {
    expect(parseCardInput('AdAd')).toEqual([aceOfDiamonds])
  })
})