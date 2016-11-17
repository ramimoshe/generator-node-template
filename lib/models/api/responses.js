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

function getMessageSchema() {
	return Joi.object({
		message: Joi.string().required().description('return message')
	});
}

exports.default = {
	responses: {
		200: {
			description: 'Success'
		},
		400: createErrorResponse('invalid message')
	}
};

exports.getMessage = {
	responses: {
		200: {
			description: 'Success',
			schema     : getMessageSchema()
		}
		// 404: createErrorResponse('message not found')
	}
};
