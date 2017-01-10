'use strict';

const Promise = require('bluebird');
const Product = require('./Product');

const product = new Product();

exports.init = () => {
	return Promise.all([
		product.init()
	]);
};

exports.product = product;
