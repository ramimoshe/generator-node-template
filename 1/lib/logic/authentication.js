'use strict';

const Promise = require('bluebird');
const Boom    = require('boom');

exports.authenticate = (token) => {
	// place to add token validations
	return token ? Promise.resolve() : Promise.reject(Boom.unauthorized('invalid token'));
};
