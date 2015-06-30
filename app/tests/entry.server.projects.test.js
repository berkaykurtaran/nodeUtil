'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, article;

/**
 * Article routes tests
 */
describe('Youtrack projects integration tests ', function() {
    beforeEach(function(done) {
       /* // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        // Save a user to the test db and create new article
        user.save(function() {
            article = {
                title: 'Article Title',
                content: 'Article Content'
            };

            done();
        });*/

        done();
    });



    it('should be able to get a list of project from youtrack', function(done) {
        // Create new article model instance

            // Request projects
            request(app).get('/projects')
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Array;

                    // Call the assertion callback
                    done();
                });


    });

  

    afterEach(function(done) {
        /*User.remove().exec();
        Article.remove().exec();*/
        done();
    });
});
