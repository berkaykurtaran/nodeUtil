'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Entry = mongoose.model('Entry'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var entry = new Entry(req.body);
    entry.user = req.user;

    entry.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(entry);
        }
    });
};

exports.listProjects = function(req, res) {
    var result = [];

            result.push({label: "Proje 1", value: "1"});


    res.contentType('application/json');
    res.send(JSON.stringify(result));


};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.json(req.entry);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var entry = req.entry;

    entry = _.extend(entry, req.body);

    entry.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(entry);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
    var entry = req.entry;

    entry.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(entry);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
    Entry.find().sort('-created').populate('user', 'displayName').exec(function(err, entries) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(entries);
        }
    });
};

/**
 * Article middleware
 */
exports.entryByID = function(req, res, next, id) {
    Entry.findById(id).populate('user', 'displayName').exec(function(err, entry) {
        if (err) return next(err);
        if (!entry) return next(new Error('Failed to load entry ' + id));
        req.entry = entry;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.entry.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
