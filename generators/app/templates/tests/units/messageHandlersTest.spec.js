'use strict';

const messageHandlers = require('../../shared/logic/messageHandlers');


describe('message service', () => {

	beforeAll((done) => {
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

			const handlerParameter = {
				params: {
					message: "world"
				}
			}
			messageHandlers.handleGetMessage(handlerParameter)
				.then((message) => {
					expect(message, "hello world");
					done();
				});

			//			done.fail(new Error('GetServerTime return invalid iso date'));
		});
	});

	describe('setPrefix', () => {
		it('set valid prefix - no error', (done) => {

			const handlerParameter = {
				body: {
					prefix: "world"
				}
			}
			messageHandlers.handleSetPrefix(handlerParameter);
			done();
		});
	});
});
