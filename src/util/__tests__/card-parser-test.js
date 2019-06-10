import cards, {createCard} from 'lib/cards'
import {cardify, stringify} from 'util/card-parser'

describe('Card Parser', () => {
  const aceOfDiamonds = createCard('A', 'd')
  const aceOfSpades = createCard('A', 's')
  describe('when cardifying', () => {
    it('should return an empty list for an empty input', () => {
      expect(cardify('')).toEqual([])
    })

    it('should parse all valid card inputs', () => {
      cards.forEach((card) => {
        expect(cardify(card.text)).toEqual([card])
      })
    })

    it('should ignore the case of the input', () => {
      expect(cardify('aD')).toEqual([aceOfDiamonds])
    })

    it('should parse multiple cards from a valid input', () => {
      expect(cardify('AdAs')).toEqual([aceOfDiamonds, aceOfSpades])
    })

    it('should ignore invalid input and return all valid cards', () => {
      expect(cardify('AdA')).toEqual([aceOfDiamonds])
    })

    it('should parse the input if it does not contain a card', () => {
      expect(cardify('A')).toEqual([])
    })

    it('should only return one instance of a valid card', () => {
      expect(cardify('AdAd')).toEqual([aceOfDiamonds])
    })
  })

  describe('when stringifying', () => {
    it('should return an empty string for an empty list of cards', () => {
      expect(stringify([])).toEqual('')
    })

    it('should convert a single card in a list', () => {
      expect(stringify([aceOfDiamonds])).toEqual('Ad')
    })

    it('should combine multiple cards in a list', () => {
      expect(stringify([aceOfSpades])).toEqual('As')
    })
  })
})