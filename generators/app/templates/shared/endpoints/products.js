'use strict';

const requests        = require('./models/requests');
const responses       = require('./models/responses');
const productsHandler = require('../logic/productsHandler');

function convertRequestToHandlerParameter(request) {
	return {
		body          : request.payload,
		params        : request.params,
		headers       : request.headers,
		authentication: request.authentication
	};
}

function handle(handler, request, reply) {
	const handlerResult = handler(convertRequestToHandlerParameter(request));

	if (handlerResult && handlerResult.then)
		return handlerResult.then(reply);

	if (handlerResult && handlerResult.catch)
		return handlerResult.catch(reply);

	reply(handlerResult);
}

exports.register = function (server, options, next) {

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
				return handle(productsHandler.get, request, reply);
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
				return handle(productsHandler.search, request, reply);
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
				return handle(productsHandler.create, request, reply);
			}
		}
	});

	next();

};

exports.register.attributes = {
	name   : 'products-api',
	version: '0.0.0'
};
