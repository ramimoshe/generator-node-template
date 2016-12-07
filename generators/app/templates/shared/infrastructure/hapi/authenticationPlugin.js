'use strict';

const Boom = require('boom');
const pkg  = require('../../../package.json');

const SCHEMA_NAME = 'verifyToken';
const internals   = {};


internals.getToken = (request) => {
	const match = (request.headers.authorization || '').match(/Basic +(.+)/i);
	if (!match || !match[1]) {
		return null;
	}

	return match[1];
};

internals.implementation = (server, options) => {
	const response = {};

	response.authenticate = (request, reply) => {
		if (!options.useAuth) {
			const result = { credentials: 'none' };
			reply.continue(result);
			return result;
		}

		const token = internals.getToken(request);
		if (token === null) return reply(Boom.unauthorized('Token not found'));

		return reply.continue({ credentials: token });
	};

	return response;
};

exports.schemaName = SCHEMA_NAME;

exports.register = (server, options, next) => {
	server.auth.scheme(SCHEMA_NAME, internals.implementation);
	return next();
};

// hapi requires attributes for a plugin.
// See: http://hapijs.com/tutorials/plugins
exports.register.attributes = {
	pkg
};
