'use strict';

const Promise              = require('bluebird');
const HapiSwagger          = require('hapi-swagger');
const inert                = require('inert');
const vision               = require('vision');
const logger               = require('../../infrastructure/logger');
const authenticationPlugin = require('./authenticationPlugin');


function isDocsRoute(request) {
	return request.path.substring(0, 5) === 'docs';
}

exports.addAuthentication = (hapiServer, config) => {
	const AUTH_STRATEGY_NAME = 'verifyToken';

	return new Promise((resolve, reject) => {
		hapiServer.register([authenticationPlugin],
			(err) => {
				if (err) {
					reject(err);
				}

				hapiServer.auth.strategy(AUTH_STRATEGY_NAME, authenticationPlugin.schemaName, true, config);
				resolve(hapiServer, AUTH_STRATEGY_NAME);
			});
	});
};

exports.addLogging = (hapiServer) => {
	return Promise.try(() => {
		hapiServer.on('request', (request, event, tags) => {
			if (tags.received && !isDocsRoute(request)) {
				logger.debug('hapiExtensions - New request', request.id);
			}
		});

		hapiServer.on('request-error', (request, err) => {
			logger.warn('hapiExtensions - Server Error', err.message, err.stack.split('\n'));
		});

		return hapiServer;
	});
};

exports.addMoreErrorsDetailsInResponse = (hapiServer, includeStackOnErrorResponse) => {
	return Promise.try(() => {
		hapiServer.ext('onPostHandler', (request, reply) => {
			const response = request.response;
			if (response.isBoom && response.output.statusCode === 500 && includeStackOnErrorResponse) {
				response.output.payload.message = response.message;
				response.output.payload.stack   = response.stack.split('\n');
			}

			reply.continue();
		});
	});
};

exports.addSwagger = (hapiServer, config) => {
	const register = Promise.promisify(hapiServer.register).bind(hapiServer);
	return register([
		inert,
		vision, {
			register: HapiSwagger,
			options : config
		}
	], {
		select: hapiServer.table()[0].labels
	});
};
