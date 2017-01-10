'use strict';

const uuid = require('uuid');

class productsHandler {

	constructor(productsRepository) {
		this.productsRepository = productsRepository || require('../data').product;
	}

	get(param) {
		return this.productsRepository.get(param.params.id);
	}

	create(param) {
		return this.productsRepository.create({
			id  : uuid.v4(),
			name: param.body.name
		});
	}

	search(param) {
		if (param.query && param.query.name && param.query.name !== '') {
			return this.productsRepository.searchByName(param.query.name);
		}

		return this.productsRepository.getAll();
	}
}

module.exports = productsHandler;
