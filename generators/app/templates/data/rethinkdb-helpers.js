function deleteDuplicateTables(r, tableName) {
	return r.db('rethinkdb').table('current_issues').filter({
		type: 'table_name_collision',
		info: { name: tableName }
	})('info')('ids').run()
		.then((duplicateTableIdsArray) => {
			// This should return an array of arrays, each array corresponds to a collision,
			// We only expect one result since we filter by table name, so only one collision should return
			if (Array.isArray(duplicateTableIdsArray) && duplicateTableIdsArray.length > 0) {
				// Delete every table except the first one
				return r.db('rethinkdb').table('table_config')
					.getAll(r.args(duplicateTableIdsArray[0].slice(1)))
					.delete().run();
			}
			return Promise.resolve();
		});
}

exports.ensureTable = (r, tableName) => {
	return r.branch(r.tableList().contains(tableName),
		0, r.tableCreate(tableName)('tables_created')).run()
		.then((numOfCreatedTables) => {
			if (numOfCreatedTables > 0) {
				return deleteDuplicateTables(r, tableName);
			}
			return Promise.resolve();
		})
		.catch((e) => {
			// ReqlOpFailedError means race condition - table created on another process, we can ignore it.
			if (e.name !== 'ReqlOpFailedError') {
				throw e;
			}
		});
}