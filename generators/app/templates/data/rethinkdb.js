'use strict';

const Promise       = require('bluebird');
const rethinkdbdash = require('rethinkdbdash');
const products      = require('./products');


exports.init = (connectionConfig) => {
	const r = rethinkdbdash(connectionConfig);

	return Promise.all([
		products.init(r)
	]);
}

exports.products = products;

