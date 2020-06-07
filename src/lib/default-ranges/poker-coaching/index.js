import gto6MaxRanges from './gto-6-max-ranges'
import homework from './homework'
import types from 'lib/default-ranges/types'

export default [
    {
        name: 'PokerCoaching.com Homework',
        range: homework,
        type: types.range
    },
    {
        name: 'PokerCoaching.com GTO 6-max Preflop Ranges',
        ranges: gto6MaxRanges,
        type: types.list
    }
]
