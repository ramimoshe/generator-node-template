'use strict';

const Promise = require('bluebird');

const MODEL_NAME = 'Product';

let Product = {};

function createSchema(mongoos) {
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

exports.init = (mongoose) => {
	Product = mongoose.model(MODEL_NAME, createSchema(mongoose));

	return Promise.resolve();
}

exports.get = (id) => {
	return Product.findById(id).exec();
}

exports.getAll = () => {
	return Product.findAll().exec();
}

exports.searchByName = (name) => {
	return Product.findByName(name).exec();
}

exports.create = (product) => {
	const productDal = new Product({
		_id  : product.id,
		name: product.name
	});

	return productDal.save();
}
