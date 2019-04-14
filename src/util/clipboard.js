export const Clipboard = ((window, document, navigator) => {
  let textArea

  const isOS = () => navigator.userAgent.match(/ipad|iphone/i)

  const createTextArea = (text) => {
    textArea = document.createElement('textArea')
    textArea.value = text
    document.body.appendChild(textArea)
  }

  const selectText = () => {
    var range
    var selection

    if (isOS()) {
      range = document.createRange()
      range.selectNodeContents(textArea)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  const copyToClipboard = () => {        
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  const copy = (text) => {
    createTextArea(text)
    selectText()
    copyToClipboard()
  }

  return {
    copy: copy
  }
})(window, document, navigator)

export default Clipboard