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
		id: Joi.number().description('Product Id')
	}
};

exports.createProduct = {
	headers: headersSchema(),
	payload: {
		id  : Joi.number().required().description('product id'),
		name: Joi.string().required().default('hello')
			.description('product name')
	}
};

exports.searchProducts = {
	headers: headersSchema(),
	query  : {
		name: Joi.string().min(1).max(50).optional().default(20)
			.description('name of product')
	}
}
