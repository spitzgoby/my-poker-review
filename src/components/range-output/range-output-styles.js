import {
  darkTextColor,
  lightTextColor,
  rangeColors} from 'styles/colors'

const generateStyleForRange = (rangeName, textColor = lightTextColor) => ({
  backgroundColor: rangeColors[rangeName],
  color: textColor,
  '&:hover': {
    backgroundColor: rangeColors[rangeName+'Dark']
  },
  '&--selected': {
    backgroundColor: rangeColors[rangeName+'Dark']
  }
})

export const styles = {
  card: {
    marginBottom: '0.5rem'
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