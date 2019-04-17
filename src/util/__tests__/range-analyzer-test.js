import {analyzeRanges} from 'util/range-analyzer'
import {createCard} from 'lib/cards'

describe('when analyzing ranges', () => {
  it('should return an empty range analysis for an empty range', () => {
    const ranges = [{
      id: 'empty',
      selectedCombos: {}
    }]

    expect(analyzeRanges(ranges)).toEqual({})
  })

  it('should analyze multiple ranges', () => {
    const ranges = [{
      id: 'test1',
      selectedCombos: {
        AA: ['AcAd', 'AcAh']
      }
    }, {
      id: 'test2',
      selectedCombos: {
        KK: ['KcKd', 'KcKh', 'KdKh']
      }
    }]

    expect(analyzeRanges(ranges)).toEqual({
      test1: {
        combosCount: 2,
        handsRatio: 2 / 1326,
        rangeRatio: 2 / 5
      }, 
      test2: {
        combosCount: 3,
        handsRatio: 3 / 1326,
        rangeRatio: 3 / 5
      }
    })
  })

  it('should remove combos that contain dead cards', () => {
    const aceOfDiamonds = createCard('A', 'd')
    const ranges = [{
      id: 'test',
      selectedCombos: {
        AA: ['AcAd','AcAh']
      }
    }]

    expect(analyzeRanges(ranges, [aceOfDiamonds])).toEqual({
      test: {
        combosCount: 1,
        handsRatio: 1 / 1326,
        rangeRatio: 1
      }
    })
  })

  it('should show stats when no selected combos are possible due to dead cards', () => {
    const aceOfClubs = createCard('A', 'c')
    const aceOfHearts = createCard('A', 'h')
    const ranges = [{
      id: 'test',
      selectedCombos: {
        AA: ['AcAd','AcAh']
      }
    }]

    expect(analyzeRanges(ranges, [aceOfClubs, aceOfHearts])).toEqual({
      test: {
        combosCount: 0,
        handsRatio: 0,
        rangeRatio: 0
      }
    })
  })
})