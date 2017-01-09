'use strict';

const Promise           = require('bluebird');
const config            = require('config');
const Hapi              = require('hapi');
const logger            = require('./infrastructure/logger');
const productsEndpoints = require('./endpoints/products');
const hapiExtensions    = require('./infrastructure/hapi/extentions');
const db                = require('./data');


function convertConfigToJson(configSection) {
	return config.util.cloneDeep(configSection);
}

function getAuthenticationConfig() {
	return {
		useAuth: config.service.useAuth
	};
}

function initHttpServer(hapiServer) {
	logger.info('Initializing...');

	const apiConnection = hapiServer.connection({
		port  : config.service.http.port,
		labels: ['api']
	});

	const docsConfig   = convertConfigToJson(config.docs);
	const routesPrefix = 'api/products';

	return Promise.all([
		hapiExtensions.addRoutesPlugin(apiConnection, productsEndpoints, routesPrefix)
			.then(() => hapiExtensions.addAuthentication(apiConnection, getAuthenticationConfig()))
			.then(() => hapiExtensions.addLogging(apiConnection))
			.then(() => hapiExtensions.addMoreErrorsDetailsInResponse(apiConnection, config.includeStackOnErrorResponse))
			.then(() => hapiExtensions.addSwagger(apiConnection, docsConfig))
	]);
}

exports.run = () => {
	const hapiServer = new Hapi.Server();

	return Promise.all([
		db.init(config.database),
		initHttpServer(hapiServer) // EntryPoint to init components before server start
	]).then(() => {
		hapiServer.start(() => {
			logger.info('httpServer started on: ', hapiServer.connections[0].info.uri);
		});
	});
};
