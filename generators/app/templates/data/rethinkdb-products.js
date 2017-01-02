'use strict';

const Promise   = require('bluebird');
const Boom      = require('boom');
const logger    = require('../infrastructure/logger');
const dbHelpers = require('./dbHelpers');


const TABLE_NAME = 'products';

let r = {};
//TODO: update to class
function ensureTable() {
	return dbHelpers.ensureTable(r, TABLE_NAME);
}

exports.init = (r) => {
	this.r = r;

	return ensureTable();
}

exports.get = (id) => {
	return r.table(TABLE_NAME).get(id).run().then(function (user) {
		if (!user) return Boom.notFound("product not found");

		return {
			id  : user.id,
			name: user.name,
		}
	});
}

exports.getAll = () => {
	return r.table(TABLE_NAME).run();
}

exports.searchByName = (name) => {
	return r.table(TABLE_NAME).filter({ name: name }).run();
}

exports.create = (product) => {
	const productDal = {
		id  : product.id,
		name: product.name
	};
	return r.table(TABLE_NAME).insert(productDal, { returnChanges: 'always' })('changes')(0)
		.do((doc) => {
			return r.branch(doc('conflict').default(0).eq(0), doc('new_val'), doc('old_val'));
		})
		.run()
		.catch((err) => {
			logger.error('failed to create product, ' + err.message);
			if (err.message == 'conflict') {
				return Promise.reject(Boom.conflict("Error: product already exists"));
			}

			return Promise.reject(Boom.badImplementation('Unknown error from rethinkdb'));
		});
}
