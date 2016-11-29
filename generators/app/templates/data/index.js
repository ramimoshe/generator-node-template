const Promise  = require('bluebird');
const products = require('./products');

exports.init = () => {
	return Promise.all([
		products.ensureTable(),
	]);
}