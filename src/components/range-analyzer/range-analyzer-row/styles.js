import {
  rangeColors,
  themeColors
} from 'styles/colors'


const getBackgroundColor = (props, hover = false) => {
  let color

  if (hover) {
    color = props.selected
      ? rangeColors['dark'+props.range.color]
      : themeColors.neutralGray
  } else {
    color = props.selected
      ? rangeColors[props.range.color]
      : 'white'
  }

  return color
}

const getBorderColor = (props, hover) => {
  let color

  if (props.selected || hover) {
    color = rangeColors['dark'+props.range.color]
  } else {
    color = rangeColors[props.range.color]
  }

  return color
}

const getBorder = (props, hover) => {
  return `2px solid ${getBorderColor(props, hover)}`
}

const getColor = (props, hover) => {
  let color

  if (hover) {
    color = props.selected
      ? themeColors.lightTextColor
      : rangeColors['dark'+props.range.color]
  } else {
    color = props.selected
      ? themeColors.lightTextColor
      : rangeColors[props.range.color]
  }

  return color
}


export const styles = {
  row: {
    backgroundColor: (props) => getBackgroundColor(props, false),
    borderLeft: (props) => getBorder(props, false),
    borderRight: (props) => getBorder(props, false),
    color: (props) => getColor(props, false),

    '&:hover': {
      backgroundColor: props => getBackgroundColor(props, true),
      color: props => getColor(props)
    }
  },

  cell: {
    color: (props) => getColor(props, false),
    fontWeight: 600
  },

  name: {
    fontWeight: 600 
  },

  editable: {
    color: (props) => getColor(props, false),
    '&:after': {
      borderBottom: `2px solid ${themeColors.lightTextColor}`
    }
  },
  clear: {
    color: (props) => getColor(props, false)
  }
}