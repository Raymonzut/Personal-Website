const assert = require('chai').assert
const me = require('../src/me')

describe('me', () => {
  describe('age', () => {
    it('should return a positive number', () => {
      assert.isAbove(me.age(), 0)
    })
  })
})
