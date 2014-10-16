(function(ng) {
    'use strict';

    ng
        .module('example.openweather', [
            'ngResource'
        ])

        .factory('ForecastService', ['$resource', function($resource) {
            return $resource('http://api.openweathermap.org/data/2.5/forecast/daily?q=:city&units=:units&cnt=5', { units: 'imperial' });
        }])

        .filter('temperature', function() {
            return function(input, units) {
                switch (units) {
                    case 'imperial':
                        return input + ' F';
                    case 'metric':
                        return input + ' C';
                    default:
                        return input;
                }
            }
        })

        .directive('forecast', ['ForecastService', function(ForecastService) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    city: '=forecast',
                    units: '='
                },
                link: function($scope) {
                    var updateForecast = function() {
                        $scope.forecast = ForecastService.get({
                            city: $scope.city,
                            units: $scope.units
                        });
                    };

                    $scope.$watch('city', updateForecast);
                    $scope.$watch('units', updateForecast);
                },
                templateUrl: 'app/scripts/openweather/_forecast.tpl.html'
            }
        }])

})(angular);
