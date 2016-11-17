'use strict';

let prefix = 'hello ';

exports.handleGetMessage = (param) => {
	return Promise.resolve(prefix + param.params.message);
};

exports.handleSetPrefix = (param) => {
	prefix = param.body.prefix;

	return Promise.resolve();
};

// TODO: find solution to return promise and value from handlers
