'use strict';

angular.module('entries').controller('EntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Entries','Projects','Dates',
	function($scope, $stateParams, $location, Authentication, Entries,Projects,Dates) {
		$scope.authentication = Authentication;
        if(Authentication.user=='')
        {
            $location.path('signin');
        }

        function prepare(){
            var projects=Projects.query();
            $scope.projects = projects;
            var dates=Dates.getWeeks();
            $scope.dates=dates;
        }

        $scope.init=function(){

            prepare();
        }

		$scope.create = function() {
debugger;
			var entry = new Entries({
                project:this.project.value,
                startDate:Dates.getStartDateOfWeek( this.weekNumber),
                endDate:Dates.getEndDateOfWeek( this.weekNumber),
                monday:this.monday,
                tuesday:this.tuesday,
                wednesday:this.wednesday,
                thursday:this.thursday,
                friday:this.friday,
                saturday:this.saturday,
                sunday:this.sunday

			});
            entry.$save(function(response) {
				$location.path('entries/' + response._id);

				$scope.projectId = '';
                $scope.weekNumber = 1;
                $scope.monday = 2;
                $scope.tuesday = 3;
                $scope.wednesday = 4;
                $scope.thursday = 5;
                $scope.friday = 6;
                $scope.saturday = 7;
                $scope.sunday = 8;

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(entry) {
			if (entry) {
                entry.$remove();

				for (var i in $scope.entries) {
					if ($scope.entries[i] === entry) {
						$scope.entries.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('entries');
				});
			}
		};

		$scope.update = function() {
            var entry = $scope.entry;
            entry.$update(function() {
				$location.path('entries/' + entry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            var entry = $scope.entry;
        };

		$scope.find = function() {
			$scope.entries = Entries.query();
		};

		$scope.findOne = function() {
            prepare();
			$scope.entry = Entries.get({
				entryId: $stateParams.entryId
			});
		};
	}
]);
