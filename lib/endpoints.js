'use strict';

/* eslint no-prototype-builtins: "off" */

const requests             = require('./models/api/requests');
const responses            = require('./models/api/responses');
const messageHandlers = require('./logic/messageHandlers');

const routes = {};

function convertRequestToHandlerParameter(request) {
	return {
		body          : request.payload,
		params        : request.params,
		headers       : request.headers,
		authentication: request.authentication
	};
}

routes.getMessage = (hapiServer) => {
	hapiServer.route({
		path  : '/{message}',
		method: 'GET',
		config: {
			tags       : ['api', 'message'],
			description: 'get message',
			notes      : 'Get message and return hello message',
			validate   : requests.getMessage,
			plugins    : {
				'hapi-swagger': responses.getMessage
			},
			handler    : (request, reply) => {
				return messageHandlers.handleGetMessage(convertRequestToHandlerParameter(request)).then(reply);
			}
		}
	});
};

routes.setMessagePrefix = (hapiServer) => {
	hapiServer.route({
		path  : '/',
		method: 'POST',
		config: {
			tags       : ['api', 'message'],
			description: 'set message prefix',
			notes      : 'Set message prefix',
			validate   : requests.setPrefixMessage,
			plugins    : {
				'hapi-swagger': responses.default
			},
			handler    : (request, reply) => {
				return messageHandlers.handleSetPrefix(convertRequestToHandlerParameter(request)).then(reply);
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
