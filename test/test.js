const assert = require('chai').assert;
const app = require('../src/app');

describe('App', () => {
	it('should greet with Hello World!', () => {
		assert.equal(app(), 'Hello World!');
	});
});
