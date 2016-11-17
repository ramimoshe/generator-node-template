'use strict';

let prefix = 'hello ';

exports.handleGetMessage = (param) => {
	return Promise.resolve(prefix + param.params.message);
};

exports.handleSetPrefix = (param) => {
	prefix = param.body.prefix;
};
