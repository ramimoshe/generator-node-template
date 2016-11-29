'use strict';

const generators = require('yeoman-generator');


module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		// add option to skip install
		//this.option('skip-install');
	},
	prompting: {
		dirname: function () {
			if (this.options.createDirectory) {
				return true;
			}

			var prompt = [{
				type: 'input',
				name: 'dirname',
				message: 'Enter directory name'
			}];

			return this.prompt(prompt).then(function (response) {
				this.options.dirname = response.dirname;
			}.bind(this));
		},
		database: function () {
			if (this.options.database) {
				return true;
			}

			var prompt = [{
				type: 'list',
				name: 'database',
				message: 'Select a database to use:',
				choices: [
					'None',
					'MongoDB',
					'RethinkDB'
				],
				store: true
			}];

			return this.prompt(prompt).then(function (response) {
				this.options.database = response.database.toLowerCase();
			}.bind(this));
		},
		lint: function () {
			if (this.options.lint) {
				return true;
			}

			var prompt = [{
				type: 'list',
				name: 'lint',
				message: 'Select a lint to use:',
				choices: [
					'None',
					'EsLint',
					'LintJs'
				],
				store: true
			}];

			return this.prompt(prompt).then(function (response) {
				this.options.lint = response.lint.toLowerCase();
			}.bind(this));
		},
		docker: function () {
			if (this.options.docker) {
				return true;
			}

			const prompt = [{
				type: 'confirm',
				name: 'docker',
				message: 'Do you want to use Docker:'
			}];

			return this.prompt(prompt).then(function (response) {
				this.options.docker = response.docker;
			}.bind(this));
		}
	},
	writing: {
		buildEnv: function () {

			// create directory
			this.destinationRoot(this.options.dirname);

			copyServiceFiles.call(this);
			copyDbFiles.call(this, this.options.database);
			copyDocker.call(this, this.options.docker);
			copyLint.call(this, this.options.lint);
			copyPackageJson.call(this, this.options);


		},
		assetsDirs: function () {
		}
	},
	install: function () {
		this.installDependencies();
	}
});

function copyDocker(dockerOptions) {
	if (dockerOptions) {
		this.fs.copy(
			this.templatePath('docker'),
			this.destinationPath('')
		);
		this.fs.copy(
			this.templatePath('docker/.dockerignore'),
			this.destinationPath('.dockerignore')
		);
	}
}

function copyServiceFiles() {
	this.fs.copy(
		this.templatePath('index.js'),
		this.destinationPath('index.js')
	);
	this.fs.copy(
		this.templatePath('config'),
		this.destinationPath('config')
	);
	this.fs.copy(
		this.templatePath('shared'),
		this.destinationPath('lib')
	);
	this.fs.copy(
		this.templatePath('tests'),
		this.destinationPath('tests')
	);
}

function copyDbFiles(dbOptions) {
	if (dbOptions === 'rethinkdb') {
		this.fs.copy(
			this.templatePath('data/index.js'),
			this.destinationPath('lib/data/index.js')
		);
		this.fs.copy(
			this.templatePath('data/rethinkdb-helpers.js'),
			this.destinationPath('lib/data/dbHelpers.js')
		);
		this.fs.copy(
			this.templatePath('data/rethinkdb-products.js'),
			this.destinationPath('lib/data/products.js')
		);
	}
}

function copyLint(lintOptions) {
	console.log(lintOptions);
	if (lintOptions === 'eslint') {
		this.fs.copy(
			this.templatePath('eslint/.eslintignore'),
			this.destinationPath('.eslintignore')
		);
		this.fs.copy(
			this.templatePath('eslint/.eslintrc.json'),
			this.destinationPath('.eslintrc.json')
		);
	}
}

function copyPackageJson(options) {

	let packages = '';
	if (options.lint === 'eslint') {
		packages = '\"eslint\": \"^3.10.2\",' + '\n' + '    \"eslint-config-airbnb\": \"^13.0.0\",' + '\n' + '    \"eslint-plugin-react\": \"^6.7.1\",';
	}

	this.fs.copyTpl(
		this.templatePath('package.json'),
		this.destinationPath('package.json'),
		{lint: packages }
	);
}