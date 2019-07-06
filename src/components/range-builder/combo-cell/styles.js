import {types} from 'lib/combos'
import {
  compact,
  map
} from 'lodash'
import {
  OFFSUIT_HANDS,
  PAIR_HANDS,
  SUITED_HANDS
} from 'lib/poker-constants'
import {
  rangeColors,
  themeColors
} from 'styles/colors'

const comboCellColors = {
  [types.OFFSUIT]: 'rgb(255, 255, 255)',
  [types.PAIR]: 'rgb(221, 219, 203)',
  [types.SUITED]: 'rgb(245, 241, 227)'
}
const comboCellCounts = {
  [types.OFFSUIT]: OFFSUIT_HANDS.length,
  [types.PAIR]: PAIR_HANDS.length,
  [types.SUITED]: SUITED_HANDS.length
}

const calculateRangeColorPercentages = (props) => {
  const {
    comboGroup,
    rangesComboGroupSelection
  } = props
  const rangePercentages = map(rangesComboGroupSelection, (rangeComboGroupSelection, rangeId) => {
    const ratio = rangeComboGroupSelection.length / comboCellCounts[comboGroup.type]

    if (ratio > 0) {
      return {
        rangeId,
        value: ratio
      }
    }
  })

  return compact(rangePercentages)
}

const convertPercentagesToGradient = (rangePercentages, ranges, type) => {
  let totalPercent = 0
  let gradient = rangePercentages.map((rangePercentage) => {
    const rangeColor = ranges[rangePercentage.rangeId].color
    const value = rangePercentage.value * 100
    const piece = `${rangeColors[rangeColor]} ${totalPercent.toFixed(0)}% ${(totalPercent + value).toFixed(0)}%`

    totalPercent += value

    return piece
  }).join(', ')

  if (totalPercent < 100) {
    gradient += `, ${comboCellColors[type]} ${totalPercent.toFixed(0)}% 100%`
  }

  return `linear-gradient(to right, ${gradient})`
}

const calculateRangeColorGradient = (props) => {
  const rangePercentages = calculateRangeColorPercentages(props)
  const {
    comboGroup,
    ranges
  } = props

  return convertPercentagesToGradient(rangePercentages, ranges, comboGroup.type)
}

const getBackground = (props, hover = false) => {
  let backgroundColor
  const {
    comboGroup,
    selected,
    selectedColor
  } = props

  if (hover) {
    backgroundColor = selectedColor 
      ? selected
        ? rangeColors['dark' + selectedColor]
        : rangeColors[selectedColor]
      : selected 
        ? calculateRangeColorGradient(props)
        : comboCellColors[comboGroup.type]
  } else {
    backgroundColor = selected 
      ? calculateRangeColorGradient(props)
      : comboCellColors[comboGroup.type]
  }

  return backgroundColor
}

const getBorderWidth = (props) => {
  const right = props.lastColumn ? '0' : '1px'

  return `0 ${right} 1px 0`
}

export const styles = {
  combocell: {
    alignItems: 'center',
    background: (props) => getBackground(props, false),
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
    borderWidth: (props) => getBorderWidth(props),
    color: themeColors.darkText,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    fontWeight: '300',
    fontSize: '1rem',
    height: '45px',
    justifyContent: 'center',
    width: 'calc(100% / 13)',

    '&.firstdragged': {
      background: (props) => getBackground(props, false)
    }
  },

  '@media (hover: hover)': {
    combocell: {
      '&:hover': {
        background: (props) => getBackground(props, true),
        cursor: (props) => props.selectedColor ? 'pointer' : 'default'
      }
    }
  },

  '@media (max-width: 1280px)': {
    combocell: {
      height: '40px'
    }
  },

  '@media (max-width: 600px)': {
    combocell: {
      fontSize: '0.5rem',
      height: '30px'
    }
  }
}