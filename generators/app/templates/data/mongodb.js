'use strict';

const Promise  = require('bluebird');
const mongoose = require('mongoose');
const Product  = require('./Product');

const product = new Product();

exports.init = (connectionConfig) => {
	mongoose.Promise = require('bluebird');
	mongoose.connect(connectionConfig);

	return Promise.all([
		product.init(mongoose)
	]);
};

exports.product = product;
