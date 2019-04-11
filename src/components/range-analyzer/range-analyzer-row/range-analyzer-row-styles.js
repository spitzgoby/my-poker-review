import {
  rangeColors,
  themeColors
} from 'styles/colors'

const getRangeColor = (props, dark = false) => {
  return dark 
    ? rangeColors['dark' + props.range.color]
    : rangeColors[props.range.color]
}

/*-------------*
 * ROW HELPERS *
 *-------------*/
const getBackgroundColor = (props, hover = false) => {
  let color

  if (hover) {
    color = props.selected
      ? getRangeColor(props, true)
      : themeColors.neutralGray
  } else {
    color = props.selected
      ? getRangeColor(props)
      : 'white'
  }

  return color
}

const getBorderColor = (props, hover) => {
  let dark = (props.selected || hover)

  return getRangeColor(props, dark)
}

const getBorder = (props, hover) => {
  return `2px solid ${getBorderColor(props, hover)}`
}

const getColor = (props, hover) => {
  let color

  if (hover) {
    color = props.selected
      ? themeColors.lightTextColor
      : getRangeColor(props, true)
  } else {
    color = props.selected
      ? themeColors.lightTextColor
      : getRangeColor(props)
  }

  return color
}

/*--------------*
 * CELL HELPERS *
 *--------------*/

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
    fontSize: '1.5rem',
    fontWeight: 600,
  },

  expanded: {
    borderBottom: 'none'   
  },

  editable: {
    color: (props) => getColor(props, false),
    '&:after': {
      borderBottom: `2px solid ${themeColors.lightTextColor}`
    }
  },

  clear: {
    color: (props) => getColor(props, false)
  },

  expand: {
    color: (props) => props.selected 
      ? themeColors.lightTextColor 
      : getRangeColor(props),
    visibility: (props) => props.rangeAnalysis ? 'visible' : 'hidden' 
  }

}