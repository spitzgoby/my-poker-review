import {
  darkTextColor,
  lightTextColor,
  rangeColors} from 'styles/colors'

const generateStyleForRange = (rangeName, textColor = lightTextColor) => {
  const color = rangeColors[rangeName]
  const darkColor = rangeColors[rangeName + 'Dark']

  return {
    borderColor: color,
    color: color,

    '&:hover': {
      backgroundColor: '#fafafa',
      borderColor: darkColor,
      color: darkColor,
    },

    '&--selected': {
      backgroundColor: color,
      borderColor: darkColor,
      textColor: textColor,

      '&:hover': {
        backgroundColor: darkColor
      }
    }
  }
}

export const styles = {
  card: {
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: 'none',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  
  cardcontent: {
    '&:last-child': {
      paddingBottom: '16px'
    },
  },
  red: generateStyleForRange('red'),
  purple: generateStyleForRange('purple'),
  yellow: generateStyleForRange('yellow', darkTextColor),
  blue: generateStyleForRange('blue'),
  green: generateStyleForRange('green')
}

export default styles