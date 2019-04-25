import {themeColors} from 'styles/colors'
import {
  getColor,
  getRangeColor
} from 'components/range-analyzer/shared/styles'

/*-------------*
 * ROW HELPERS *
 *-------------*/
const getBackgroundColor = (props, hover = false) => {
  let color

  if (hover) {
    color = props.selected
      ? getRangeColor(props.range, true)
      : themeColors.neutralGray
  } else {
    color = props.selected
      ? getRangeColor(props.range, false)
      : 'white'
  }

  return color
}

const getBorderColor = (props, hover) => {
  let dark = (props.selected || hover)

  return getRangeColor(props.range, dark)
}

const getBorder = (props, hover) => {
  return `2px solid ${getBorderColor(props, hover)}`
}

/*--------------*
 * CELL HELPERS *
 *--------------*/

export const styles = {
  row: {
    backgroundColor: (props) => getBackgroundColor(props, false),
    borderLeft: (props) => getBorder(props, false),
    borderRight: (props) => getBorder(props, false),
    color: (props) => getColor(props.range, props.selected, false),
    transition: '100ms',

    '&:hover': {
      backgroundColor: props => getBackgroundColor(props, true),
      color: props => getColor(props.range, props.selected, true)
    }
  }
}