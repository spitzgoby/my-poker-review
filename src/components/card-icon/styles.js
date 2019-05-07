const getFill = (props) => {
  const black = props.cardId.includes('s') || props.cardId.includes('c')

  return black ? 'black' : 'red'
}

export default {
  icon: {
    fill: (props) => getFill(props, false),
    height: '56px',
    marginRight: '0.5rem',
    width: '44px'
  }
}