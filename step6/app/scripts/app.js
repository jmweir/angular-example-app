(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', function($scope) {
            $scope.units = 'imperial';

            $scope.lookup = function() {
                $scope.$broadcast('lookup', $scope.city);
            };
        }]);

})(angular);
