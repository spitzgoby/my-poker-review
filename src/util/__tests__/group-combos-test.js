import {groupComboIds} from 'util/group-combos'

describe('when grouping combo ids', () => {
  it('should return an empty object if there are no combos', () => {
    expect(groupComboIds([])).toEqual({})
  })

  it('should return an object with grouped combos', () => {
    const combos = [{
      comboGroupId: 'AA',
      id: 'AcAd'
    }, {
      comboGroupId: 'AA',
      id: 'AcAh'
    }, {
      comboGroupId: 'KK',
      id: 'KcKh'
    }]

    expect(groupComboIds(combos)).toEqual({
      AA: ['AcAd', 'AcAh'],
      KK: ['KcKh']
    })
  })
})