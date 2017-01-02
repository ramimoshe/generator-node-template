'use strict';

const Promise = require('bluebird');
const _       = require('lodash');

const MODEL_NAME = 'Product';

class Product {

	convertResponse(documentPromise) {
		return documentPromise.then((document) => {
			return _.omit(document, '__v');
		})

	}

	createSchema(mongoos) {
		const productSchema = new mongoos.Schema({
			_id : String,
			name: String
		});

		productSchema.statics.findById = function findById(id, callback) {
			return this.findOne({ _id: id }, callback);
		}

		productSchema.statics.findByName = function findByName(name, callback) {
			return this.find({ name: name }, callback);
		}

		productSchema.statics.findAll = function findAll(callback) {
			return this.find({}, callback);
		}

		return productSchema;
	}

	init(mongoose) {
		this.product = mongoose.model(MODEL_NAME, this.createSchema(mongoose));

		return Promise.resolve();
	}

	get(id) {
		const query = this.product.findById(id);

		return this.convertResponse(query.exec());
	}

	getAll() {
		const query = this.product.findAll();

		return this.convertResponse(query.exec());
	}

	searchByName(name) {
		const query = this.product.findByName(name);

		return this.convertResponse(query.exec());
	}

	create(product) {
		const productDal = new this.product({
			_id : product.id,
			name: product.name
		});

		return this.convertResponse(productDal.save());
	}
}

module.exports = Product;
