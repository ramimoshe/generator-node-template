'use strict';

const Joi = require('joi');

function createErrorResponse(description) {
	return {
		description,
		schema: Joi.object({
			statusCode: Joi.number().required(),
			error     : Joi.string().required(),
			message   : Joi.string().required()
		})
	};
}

function getProductSchema() {
	return Joi.object({
		name: Joi.string().required().description('product name')
	});
}

function arrayResult(itemsSchema) {
	return Joi.object({
		items: Joi.array().items(itemsSchema).description('items')
	});
}

exports.default = {
	responses: {
		200: {
			description: 'Success'
		},
		400: createErrorResponse('invalid request')
	}
};

exports.getProduct = {
	responses: {
		200: {
			description: 'Success',
			schema     : getProductSchema()
		},
		404: createErrorResponse('product not found')
	}
};

exports.searchProducts = {
	responses: {
		200: {
			description: 'Success',
			schema     : arrayResult(getProductSchema())
		}
	}
};
