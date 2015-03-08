'use strict';

//WeekEntries service used for communicating with the articles REST endpoints
angular.module('entries').factory('Entries', ['$resource',
    function($resource) {
        return $resource('entries/:entryId', {
            entryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
