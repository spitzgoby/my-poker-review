import {types} from 'lib/combos'
import {
  rangeColors,
  themeColors
} from 'styles/colors'

const comboCellColors = {
  [types.OFFSUIT]: 'rgb(255, 255, 255)',
  [types.PAIR]: 'rgb(221, 219, 203)',
  [types.SUITED]: 'rgb(245, 241, 227)'
}

const getBackgroundColor = (props, hover = false) => {
  let backgroundColor
  const {
    color,
    comboGroup,
    selected,
    selectedColor
  } = props

  if (hover) {
    if (selected) {
      console.log(selectedColor)
      console.log(rangeColors)
    }
    backgroundColor = selected
      ? rangeColors['dark' + selectedColor]
      : rangeColors[selectedColor]
  } else {
    backgroundColor = selected 
      ? rangeColors[color]
      : comboCellColors[comboGroup.type]
  }

  if (selected && hover) {
    console.log(backgroundColor)
  }

  return backgroundColor
}

const getBorderWidth = (props) => {
  const bottom = props.lastRow ? '0' : '1px'
  const right = props.lastColumn ? '0' : '1px'

  return `0 ${right} ${bottom} 0`
}

const getColor = (props, hover = false) => {
  return props.color || hover
    ? themeColors.lightTextColor 
    : themeColors.darkTextColor
}

export const styles = {
  combocell: {
    alignItems: 'center',
    backgroundColor: (props) => getBackgroundColor(props, false),
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
    borderWidth: (props) => getBorderWidth(props),
    color: (props) => getColor(props, false),
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    fontWeight: '300',
    fontSize: '1rem',
    height: '45px',
    justifyContent: 'center',
    width: 'calc(100% / 13)',

    '&:hover': {
      backgroundColor: (props) => getBackgroundColor(props, true),
      color: (props) => getColor(props, true),

    },

    '&:hover $selectorbutton': {
      visibility: 'visible'
    },

    '&.firstdragged': {
      backgroundColor: (props) => getBackgroundColor(props, false),
      color: (props) => getColor(props, false)
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
  },

  selectorbutton: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}