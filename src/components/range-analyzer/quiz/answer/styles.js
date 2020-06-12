import {
  getRangeColor
} from 'components/range-row/shared/styles'

const getBackgroundColor = (props, hover) => {
    return getRangeColor(props.answer, hover)
}

export default {
    answer: {
        backgroundColor: props => getBackgroundColor(props, false),
        border: '1px solid black',
        borderRadius: '0.25rem',
        marginTop: '0.5rem',
        padding: '1rem',

        '&:hover': {
            backgroundColor: props => getBackgroundColor(props, true),
            cursor: 'pointer'
        }
    }
}