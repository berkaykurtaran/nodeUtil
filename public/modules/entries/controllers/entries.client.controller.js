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
            entry.startDate=Dates.getStartDateOfWeek( $scope.weekNumber-1);
            entry.endDate=Dates.getEndDateOfWeek( $scope.weekNumber-1);
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
            debugger;
            Entries.get({
                entryId: $stateParams.entryId
            }).$promise.then(function(en) {
                    debugger;
                    $scope.entry = en;

                });

		};

	}
]);
