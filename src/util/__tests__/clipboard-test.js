import Clipboard from 'util/clipboard'

describe('when copying to the clipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should past the given text to the clipboard', () => {
    Clipboard.copy('test')
    expect(document.execCommand).toBeCalledWith('copy')
  });
});