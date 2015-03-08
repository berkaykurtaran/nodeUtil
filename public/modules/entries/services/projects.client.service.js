/**
 * Created by berkay on 07.03.2015.
 */
//WeekEntries service used for communicating with the articles REST endpoints
angular.module('entries').factory('Projects', ['$resource',
    function($resource) {
        return $resource('projects', {
        });
    }
]);
