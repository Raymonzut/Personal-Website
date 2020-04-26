const assert = require('assert').strict
const me = require('../src/me')

assert(me.age() > 0, 'age should return a positive number')
