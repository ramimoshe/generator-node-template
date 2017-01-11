'use strict';

const Promise = require('bluebird');
const _       = require('lodash');

class Product {

	init() {
		this.db = [];
		return Promise.resolve();
	}

	get(id) {
		const result = _.find(this.db, (item) => {
			return id === item.id;
		});

		return Promise.resolve(result);
	}

	getAll() {
		return Promise.resolve(this.db);
	}

	searchByName(name) {
		const result = _.find(this.db, (item) => {
			return name === item.name;
		});

		return Promise.resolve(result);
	}

	create(product) {
		if (product) {
			this.db.push(product);
		}

		return Promise.resolve(product.id);
	}
}

module.exports = Product;
