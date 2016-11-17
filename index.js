'use strict';

const Promise        = require('bluebird');
const config         = require('config');
const Hapi           = require('hapi');
const logger         = require('./lib/infrastructure/logger');
const endpoints      = require('./lib/endpoints');
const hapiExtensions = require('./lib/infrastructure/hapi/extentions');


const hapiServer = new Hapi.Server();

function convertConfigToJson(configSection) {
	return config.util.cloneDeep(configSection);
}

function getAuthenticationConfig() {
	return {
		useAuth: config.service.useAuth
	};
}

function initHttpServer() {
	const apiConnection = hapiServer.connection({
		port  : config.service.http.port,
		labels: ['api']
	});

	const docsConfig = convertConfigToJson(config.docs);
	endpoints.addAllRoutes(apiConnection);

	return Promise.all([
		hapiExtensions.addAuthentication(apiConnection, getAuthenticationConfig())
			.then(() => hapiExtensions.addLogging(apiConnection))
			.then(() => hapiExtensions.addMoreErrorsDetailsInResponse(apiConnection, config.includeStackOnErrorResponse))
			.then(() => hapiExtensions.addSwagger(apiConnection, docsConfig))
	]);
}

logger.info('Initializing...');
Promise.all([
	initHttpServer() // EntryPoint to init components before server start
]).then(() => {
	hapiServer.start(() => {
		logger.info('httpServer started on: ', hapiServer.connections[0].info.uri);
	});
});
