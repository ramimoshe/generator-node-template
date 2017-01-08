'use strict';

const Promise = require('bluebird');
const rp      = require('request-promise');
const config  = require('config');
const server  = require('../../lib/server');


describe('message service', () => {

	beforeAll((done) => {
		config.service.useAuth   = false;
		config.service.http.port = 1234;
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

	describe('service integrations', () => {
		it('create product -> get product', (done) => {

			const createProductOptions = {
				uri    : 'http://localhost:1234/api/products',
				method : 'POST',
				headers: {
					authorization: '123'
				},
				body   : {
					name: 'box'
				},
				json   : true
			};
			return rp(createProductOptions)
				.then((body) => {
					const getProductOptions = {
						uri    : 'http://localhost:1234/api/products/' + body._id,
						method : 'GET',
						headers: {
							authorization: '123'
						},
						json   : true
					};

					return Promise.all([body, rp(getProductOptions)]);
				})
				.spread((createBody, getBody) => {
					expect(getBody, {
						_id : createBody._id,
						name: createBody.name
					});

					return done();
				})
				.catch((err) => {
					done.fail(err);
				});
		});
	});
});