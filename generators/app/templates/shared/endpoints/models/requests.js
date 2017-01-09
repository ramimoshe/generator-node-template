'use strict';

const Joi = require('joi');


function headersSchema() {
	return Joi.object({
		authorization: Joi.string().optional().description('token')
	}).unknown();
}

exports.getProduct = {
	headers: headersSchema(),
	params : {
		id: Joi.string().guid().description('Product Id')
	}
};

exports.createProduct = {
	headers: headersSchema(),
	payload: {
		name: Joi.string().required().default('hello')
			.description('product name')
	}
};

exports.searchProducts = {
	headers: headersSchema(),
	query  : {
		name: Joi.string().min(1).max(50).optional()
			.description('name of product')
	}
}
