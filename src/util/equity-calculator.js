import {
  flatMap,
  intersection
} from 'lodash'
import pec from 'pec'

export const calculateEquity = (board, hand, range) => {
  let results = {
    lose: null,
    tie: null,
    win: null
  }
  const boardText = board.map((card) => card.text)
  const handText = hand.map((card) => card.text)
  const deadText = handText.concat(boardText)
  const rangeText = flatMap(range.selectedCombos, (comboGroup) =>
    filterComboGroup(comboGroup, deadText)
  )

  if (rangeText.length > 0 && handText.length === 2) {
    const pecResults = pec.raceRangeForBoard(handText, rangeText, 10000, true, boardText)

    results = convertResultsToRatios(pecResults)
  }

  return results
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
  const {win, loose, tie} = results
  const count = win + loose + tie

  return {
    lose: loose / count,
    tie: tie / count,
    win: win / count
  }
}

export default calculateEquity