'use strict';

const Joi = require('joi');


function headersSchema() {
	return Joi.object({
		authorization: Joi.string().optional().description('token')
	}).unknown();
}

exports.getMessage = {
	headers: headersSchema(),
	params : {
		message: Joi.string().min(1).max(20)
	},
	query  : {
		maxLengthResponse: Joi.number().integer().min(1).max(100).optional().default(20)
			.description('max length of the response message')
	}
};

exports.setPrefixMessage = {
	headers: headersSchema(),
	payload: {
		prefix: Joi.string().optional().default('hello')
			.description('prefix to the message')
	}
};
