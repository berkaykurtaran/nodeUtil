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
                week:this.weekNumber.value,
                monday:this.monday,
                tuesday:this.tuesday,
                wednesday:this.wednesday,
                thursday:this.thursday,
                friday:this.friday,
                saturday:this.saturday,
                sunday:this.sunday

			});
            entry.$save(function() {
				$location.path('entries');

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
            entry.startDate=Dates.getStartDateOfWeek( $scope.weekNumber-1);
            entry.endDate=Dates.getEndDateOfWeek( $scope.weekNumber-1);
            entry.$update(function() {
				$location.path('entries');
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
            Entries.get({
                entryId: $stateParams.entryId
            }).$promise.then(function(en) {
                    $scope.entry = en;
                });

		};

	}
]);
