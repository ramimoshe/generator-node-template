exports.addViewsRoutesPlugin = (hapiServer) => {
	const register = Promise.promisify(hapiServer.register).bind(hapiServer);
	return register([vision, inert])
		.then(() => {
			hapiServer.views({
				engines   : {
					html: require('handlebars')
				},
				relativeTo: process.cwd(),
				path      : 'templates'
			});

			hapiServer.route({
				method : 'GET',
				path   : '/',
				handler: function (request, reply) {
					reply.view('index', { service_name: 'Service' });
				}
			});

			hapiServer.route({
				method : 'GET',
				path   : '/{param*}',
				handler: {
					directory: {
						path: path.join(process.cwd(), 'public')
					}
				}
			});
		});
};