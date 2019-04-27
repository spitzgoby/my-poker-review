import {
  importRanges  
} from 'util/range-file-converter'

const makeJsonFileWithData = (data) => {
  return new Blob([JSON.stringify(data)], {type: 'application/json'})
}

describe('when converting range files', () => {
  describe('and when importing range files', () => {

    it('should import a valid range file', () => {
      const fileData = {
        test: {
          color: 'blue',
          id: 'test',
          name: 'test',
          selectedCombos: {}
        }
      }
      const file = makeJsonFileWithData(fileData)

      return expect(importRanges(file)).resolves.toEqual(fileData)
    })

    describe('and when validating imported data', () => {
      it('should throw an error when the file is not valid JSON', () => {
        const invalidJSONFile = new Blob([''], {type: 'text/html'})
        invalidJSONFile.name = 'invalidJson.txt'

        return expect(importRanges(invalidJSONFile)).rejects.toThrow()
      })

      it('should not import an invalidly formatted range file', () => {
        const invalidFileData = {test: 'test'}
        const invalidFileName = 'invalidRanges.json'
        const invalidFile = makeJsonFileWithData(invalidFileData, invalidFileName)

        return expect(importRanges(invalidFile)).resolves.toBeNull()
      })

      it('should not import a range without an id', () => {
        const file = makeJsonFileWithData({
          test: {color: 'blue', name: 'test', selectedCombos: {}}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range without a color', () => {
        const file = makeJsonFileWithData({
          test: {id: 'test', name: 'test', selectedCombos: {}}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range without selected combos', () => {
        const file = makeJsonFileWithData({
          test: {color: 'blue', id: 'test', name: 'test'}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range with an unknown color ', () => {
        const file = makeJsonFileWithData({
          test: {color: 'taupe', id: 'test', name: 'test', selectedCombos: {}}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range with an unknown combo group', () => {
        const file = makeJsonFileWithData({
          test: {color: 'blue', id: 'test', name: 'test', selectedCombos: {
            AA1: []
          }}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range with an unknown combo', () => {
        const file = makeJsonFileWithData({
          test: {color: 'blue', id: 'test', name: 'test', selectedCombos: {
            AA: ['AcAz']
          }}
        })

        return expect(importRanges(file)).resolves.toBeNull()
      })

      it('should not import a range with a combo in the wrong combo group', () => {
        const file = makeJsonFileWithData({
          test: {color: 'blue', id: 'test', name: 'test', selectedCombos: {
            AA: ['KcKd']
          }}
        })
        
        return expect(importRanges(file)).resolves.toBeNull()
      })
    })
  })
})
