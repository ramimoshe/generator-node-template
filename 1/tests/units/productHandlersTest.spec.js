'use strict';

const productsHandler    = require('../../lib/logic/productsHandler');
const ProductsRepository = require('../../lib/data/Product');


describe('product service', () => {

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

	describe('get', () => {
		it('should return valid message', (done) => {

			const productsRepositoryStub = new ProductsRepository();
			sinon.stub(productsRepositoryStub, "get").returns(Promise.resolve([{
				_id : "58482f12b8884bbf12323afb",
				name: "test name"
			}]));

			const products = new productsHandler(productsRepositoryStub);

			const handlerParameter = {
				headers: {
					authorization: ''
				},
				params : {
					id: '58482f12b8884bbf12323afb'
				}
			}
			products.get(handlerParameter)
				.then((product) => {
					expect(product, {
						_id : "58482f12b8884bbf12323afb",
						name: "test name"
					});

					done();
				})
				.catch((e) => {
					done.fail(e);
				});
		});
	});

	describe('create', () => {
		it('set valid prefix - no error', (done) => {

			const productsRepositoryStub = new ProductsRepository();
			sinon.stub(productsRepositoryStub, "create").returns(Promise.resolve());

			const products = new productsHandler(productsRepositoryStub);

			const handlerParameter = {
				headers: {
					authorization: ''
				},
				body   : {
					name: "box"
				}
			}
			products.create(handlerParameter)
				.then(() => {
					done();
				});
			done();
		});
	});
});
