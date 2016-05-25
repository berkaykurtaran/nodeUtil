'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Entry = mongoose.model('Entry'),
    _ = require('lodash'),
    Client = require('node-rest-client').Client,
    NodeCache = require( "node-cache" ),
    parseString = require('xml2js').parseString;
    var cache = new NodeCache({ stdTTL: 60*60*12, checkperiod: 60*60 });



/**
 * Create an entry
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
    var cachedProjects = cache.get( "projects" );
    if(cachedProjects==undefined)
    {
        getProjects(function(projects){
            cache.set( "projects", projects, 10000 );
            res.contentType('application/json');
            res.send(JSON.stringify(projects));
        });
    }else
    {
        res.contentType('application/json');
        res.send(JSON.stringify(cachedProjects));
    }



};

function getProjects(done){
    var client = new Client();
    var projects=[];
    client.post("http://xdomain/youtrack/rest/user/login?login=x&password=x", function(data,response) {

        var jsessionId;
        var scPrincipal;

        // parsed response body as js object
        //console.log(data);
        // raw response
        //console.log(response);

        /*  var cookies = _.map(req.cookies, function(val, key) {
         return key + "=" + encodeURIComponent(val);
         }).join("; ");*/

        var args={
            headers:{"Cookie": "JSESSIONID="+response.rawHeaders[7].split("=")[1].split(";")[0]+"; jetbrains.charisma.main.security.PRINCIPAL="+response.rawHeaders[9].split("=")[1].split(";")[0]}
        }




        client.get("http://xdomain/youtrack/rest/project/all?verbose=false",args, function(data, response){
            // parsed response body as js object
            //console.log(data);
            // raw response
            console.log(response);



          /*  var XML = et.XML;
            var ElementTree = et.ElementTree;
            var element = et.Element;
            var subElement = et.SubElement;

            var etree=et.parse(data);
            var projectNodes=etree.findall('./projects/project');*/

           /* parseString(data.projects.project, function (err, result) {
                console.log(result);
                projects=result;

            });*/


            for (var i=0;i<data.projects.project.length;i++)
            {
                var node=data.projects.project[i];
                projects.push({label: node.$.name, value: node.$.shortName});
            }
            done(projects);


        });

    });

}

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
    Entry.find({user:req.user.id}).sort('-created').populate('user', 'displayName').exec(function(err, entries) {
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
