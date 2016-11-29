/* eslint no-prototype-builtins: "off" */

'use strict';

const requests        = require('./models/api/requests');
const responses       = require('./models/api/responses');
const productsHandler = require('./logic/productsHandler');

const routes = {};

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

routes.getProduct = (hapiServer) => {
	hapiServer.route({
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
				return handle(productsHandler.getProduct, request, reply);
			}
		}
	});
};

routes.searchProducts = (hapiServer) => {
	hapiServer.route({
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
				return handle(productsHandler.searchProducts, request, reply);
			}
		}
	});
};

routes.createProduct = (hapiServer) => {
	hapiServer.route({
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
				return handle(productsHandler.createProduct, request, reply);
			}
		}
	});
};

exports.addAllRoutes = (hapiServer) => {
	for (const route in routes) {
		if (routes.hasOwnProperty(route)) {
			routes[route](hapiServer);
		}
	}

	return hapiServer;
};
