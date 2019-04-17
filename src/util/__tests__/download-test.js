import {download} from 'util/download'
import FileDownload from 'js-file-download'

jest.mock('js-file-download', () => jest.fn())

describe('when downloading a file', () => {
  const mockData = {
    test: 'test'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger a download with the given filename and data', () => {
    expect(download({test: 'test'}, 'test.txt')).toEqual(true)
    expect(FileDownload).toBeCalledWith(JSON.stringify(mockData), 'test.txt')
  })

  it('should trigger append .json to a file without an extension', () => {
    expect(download({test: 'test'}, 'test')).toEqual(true)
    expect(FileDownload).toBeCalledWith(JSON.stringify(mockData), 'test.json')
  })
})