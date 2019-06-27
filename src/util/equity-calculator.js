import {
  flatMap,
  intersection
} from 'lodash'
import EquityWorker from 'util/equity.worker.js'

export const calculateEquity = (board, hand, range) => {
  return new Promise((resolve, reject) => {
    const boardText = board.map((card) => card.text)
    const handText = hand.map((card) => card.text)
    const deadText = handText.concat(boardText)
    const rangeText = flatMap(range.selectedCombos, (comboGroup) =>
      filterComboGroup(comboGroup, deadText)
    )

    if (rangeText.length > 0 && handText.length === 2) {
      const equityWorker = new EquityWorker()
      
      equityWorker.onmessage = (event) => {
        resolve(convertResultsToRatios(event.data))
      }
      equityWorker.postMessage({
        board: boardText,
        hand: handText,
        range: rangeText
      })
    } else {
      resolve({win: null, lose: null, tie: null})
    }
  })
}

const filterComboGroup = (comboGroup, deadCards) => {
  return comboGroup.reduce((acc, combo) => {
    const splitCombo = [combo.slice(0, 2), combo.slice(2)]

    if (intersection(splitCombo, deadCards).length === 0) {
      acc.push(splitCombo)
    } 

    return acc
  }, []) 
}

const convertResultsToRatios = (results) => {
  const {
    loose: lose,
    tie,
    win
  } = results
  const count = win + lose + tie

  return {
    lose: lose / count,
    tie: tie / count,
    win: win / count
  }
}

export default calculateEquity