'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	entries = require('../../app/controllers/entries.server.controller.js');

module.exports = function(app) {
	// Article Routes
	app.route('/entries')
		.get(entries.list)
		.post(users.requiresLogin, entries.create);

    app.route('/projects')
        .get(users.requiresLogin,entries.listProjects);

	app.route('/entries/:entryId')
		.get(entries.read)
		.put(users.requiresLogin, entries.hasAuthorization, entries.update)
		.delete(users.requiresLogin, entries.hasAuthorization, entries.delete);

	// Finish by binding the article middleware
	app.param('entryId', entries.entryByID);
};
