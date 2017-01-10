'use strict';

const Promise = require('bluebird');
const _       = require('lodash');

const MODEL_NAME = 'Product';

class Product {

	static convertSingleItem(item) {
		item._doc    = _.omit(item._doc, '__v');
		item._doc.id = item._doc._id;
		return _.omit(item._doc, '_id');
	}

	static convertResponse(documentPromise) {
		// omit mongo doc version from the result
		return documentPromise.then((document) => {
			if (_.isArray(document)) {
				return _.map(document, Product.convertSingleItem);
			}

			return document ? Product.convertSingleItem(document) : document;
		});
	}

	static createSchema(mongoos) {
		const productSchema = new mongoos.Schema({
			_id : String,
			name: String
		});

		productSchema.statics.findById = function findById(id, callback) {
			return this.findOne({ _id: id }, callback);
		};

		productSchema.statics.findByName = function findByName(name, callback) {
			return this.find({ name: name }, callback);
		};

		productSchema.statics.findAll = function findAll(callback) {
			return this.find({}, callback);
		};

		return productSchema;
	}

	init(mongoose) {
		this.Product = mongoose.model(MODEL_NAME, Product.createSchema(mongoose));

		return Promise.resolve();
	}

	get(id) {
		const query = this.Product.findById(id);

		return Product.convertResponse(query.exec());
	}

	getAll() {
		const query = this.Product.findAll();

		return Product.convertResponse(query.exec());
	}

	searchByName(name) {
		const query = this.Product.findByName(name);

		return Product.convertResponse(query.exec());
	}

	create(product) {
		const productDal = new this.Product({
			_id : product.id,
			name: product.name
		});

		return Product.convertResponse(productDal.save());
	}
}

module.exports = Product;
