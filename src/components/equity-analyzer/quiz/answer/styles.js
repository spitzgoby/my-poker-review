import {
  getRangeColor
} from 'components/range-row/shared/styles'

const getBackgroundColor = (props, hover) => {
    return getRangeColor(props.answer, hover)
}

export default {
    answer: {
        backgroundColor: props => getBackgroundColor(props, false),
        borderLeft: '1px solid black',
        marginTop: '1rem',
        padding: '1rem',

        '&:hover': {
            backgroundColor: props => getBackgroundColor(props, true),
            cursor: 'pointer'
        }
    }
}