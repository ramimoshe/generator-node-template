'use strict';

const requests        = require('./models/requests');
const responses       = require('./models/responses');
const ProductsHandler = require('../logic/productsHandler');

function convertRequestToHandlerParameter(request) {
	return {
		body          : request.payload,
		params        : request.params,
		query         : request.query,
		headers       : request.headers,
		authentication: request.authentication
	};
}

function handle(handler, request, reply) {
	const handlerResult = handler(convertRequestToHandlerParameter(request));

	if (handlerResult && handlerResult.then) {
		return handlerResult.then(reply);
	}

	if (handlerResult && handlerResult.catch) {
		return handlerResult.catch(reply);
	}

	return reply(handlerResult);
}

exports.register = (server, options, next) => {
	const products = new ProductsHandler();

	server.route({
		path  : '/{id}',
		method: 'GET',
		config: {
			tags       : ['api', 'products'],
			description: 'Get product',
			notes      : 'Get product',
			validate   : requests.getProduct,
			plugins    : {
				'hapi-swagger': responses.getProduct
			},
			handler    : (request, reply) => {
				return handle(products.get.bind(products), request, reply);
			}
		}
	});

	server.route({
		path  : '/',
		method: 'GET',
		config: {
			tags       : ['api', 'products'],
			description: 'Get product',
			notes      : 'Get product',
			validate   : requests.searchProducts,
			plugins    : {
				'hapi-swagger': responses.searchProducts
			},
			handler    : (request, reply) => {
				return handle(products.search.bind(products), request, reply);
			}
		}
	});

	server.route({
		path  : '/',
		method: 'POST',
		config: {
			tags       : ['api', 'products'],
			description: 'Create product',
			notes      : 'Create product',
			validate   : requests.createProduct,
			plugins    : {
				'hapi-swagger': responses.default
			},
			handler    : (request, reply) => {
				return handle(products.create.bind(products), request, reply);
			}
		}
	});

	next();
};

exports.register.attributes = {
	name   : 'products-api',
	version: '0.0.0'
};
