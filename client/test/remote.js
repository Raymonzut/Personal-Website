const assert = require('chai').assert
const remote = require('../src/remote')

describe('remote', () => {
  const data = remote.postData

  describe('postData', () => {
    it('should return an array', () => {
      assert.typeOf(data, 'array')
    })
    it('should not be empty', () => {
      assert.isAtLeast(data.length, 1)
    })
    it('should contain objects', () => {
      for (obj of data) {
        assert.typeOf(obj, 'object')
      }
    })
    it('should have objects with properties', () => {
      for (obj of data) {
        assert.isAtLeast(Object.keys(obj).length, 1)
      }
    })
  })
})
