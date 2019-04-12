import {rangeFromCombos} from 'util/range-output-builder'

describe('when building range output', () => {
  const AA = {'AA': ['AcAd', 'AcAh', 'AcAs', 'AdAh', 'AdAs', 'AhAs']}
  const KK = {'KK': ['KcKd', 'KcKh', 'KcKs', 'KdKh', 'KdKs', 'KhKs']}
  const QQ = {'QQ': ['QcQd', 'QcQh', 'QcQs', 'QdQh', 'QdQs', 'QhQs']}
  const JJ = {'JJ': ['JcJd', 'JcJh', 'JcJs', 'JdJh', 'JdJs', 'JhJs']}
  const TT = {'TT': ['TcTd', 'TcTh', 'TcTs', 'TdTh', 'TdTs', 'ThTs']}
  const AKs = {'AKs': ['AcKc', 'AdKd', 'AhKh', 'AsKs']}
  const AQs = {'AQs': ['AcQc', 'AdQd', 'AhQh', 'AsQs']}

  it('should return empty output from an empty list of combos', () => {
    expect(rangeFromCombos({})).toEqual('')
  })

  it('should return a range output from a single combo', () => {
    expect(rangeFromCombos({'AA': ['AcAd']})).toEqual('AcAd')
  })

  it('should return a range output from a single combo group', () => {
    expect(rangeFromCombos(AA)).toEqual('AA')
  })

  it('should include + when there are pairs to the ace', () => {
    const range = {
      ...AA,
      ...KK,
      ...QQ
    }

    expect(rangeFromCombos(range)).toEqual('QQ+')
  })

  it('should include + when there are suited hands to the ace', () => {
    const range = {
      ...AKs,
      ...AQs
    }

    expect(rangeFromCombos(range)).toEqual('AQs+')
  })

  it('should include a dash for a run of combos that can be combined', () => {
    const range = {
      ...KK,
      ...QQ
    }

    expect(rangeFromCombos(range)).toEqual('KK-QQ')
  })

  it('should include dashes for multiple runs of combos that can be combined', () => {
    const range = {
      ...AA,
      ...KK,
      ...JJ,
      ...TT
    }

    expect(rangeFromCombos(range)).toEqual('KK+,JJ-TT')
  })

  it('should create a range for a mix of pairs, suited and offsuit hands', () => {
    const range = {
      ...AA,
      ...AKs,
      '76s': ['7c6c','7d6d','7h6h'],
      AKo: ['AcKh','AcKs']
    }

    expect(rangeFromCombos(range)).toEqual('AA,AKs,7c6c,7d6d,7h6h,AcKh,AcKs')
  })
})