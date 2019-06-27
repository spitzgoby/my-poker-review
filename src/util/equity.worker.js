import pec from 'pec'

// eslint-disable-next-line
self.addEventListener('message', (event) => {
  const {
    board,
    hand,
    range
  } = event.data

  // eslint-disable-next-line
  self.postMessage(pec.raceRangeForBoard(hand, range, 10000, true, board))
})