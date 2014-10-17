(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', 'ForecastService', function($scope, ForecastService) {
            $scope.units = 'imperial';

            $scope.$watch('city', function() {
                $scope.forecast = ForecastService.get({
                    city: $scope.city
                });
            });
        }]);

})(angular);
