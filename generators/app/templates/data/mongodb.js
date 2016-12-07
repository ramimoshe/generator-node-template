'use strict';

const Promise  = require('bluebird');
const mongoose = require('mongoose');
const products = require('./products');

exports.init = (connectionConfig) => {
	mongoose.Promise = require('bluebird');
	mongoose.connect(connectionConfig);

	return Promise.all([
		products.init(mongoose)
	]);
}

exports.products = products;