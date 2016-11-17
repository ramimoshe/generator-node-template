'use strict';

const rp     = require('request-promise');
const server = require('../../lib/server');


describe('message service', () => {

	beforeAll((done) => {
		server.run();
		done()
	});

	beforeEach((done) => {
		done()
	});

	afterEach((done) => {
		done()
	});

	afterAll((done) => {
		done()
	});

	describe('getMessage', () => {
		it('should return valid message', (done) => {

			const options = {
				uri : 'http://localhost:1234/world',
				method: 'GET',
				json: true
			};
			return rp(options)
				.then((body) => {
					expect(body, "hello world");
					return done();
				})
				.catch((err) => {
					done.fail(err);
				});
		});
	});

	describe('setPrefix', () => {
		it('set valid prefix - no error', (done) => {

			const options = {
				uri : 'http://localhost:1234/',
				method: 'POST',
				body: {
					prefix: 'hello test '
				},
				json: true
			};

			return rp(options)
				.then((body) => {
					return done();
				})
				.catch((err) => {
					done.fail(err);
				});
		});
	});
});
