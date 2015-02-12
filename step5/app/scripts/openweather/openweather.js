(function(ng) {
    'use strict';

    ng
        .module('example.openweather', [
            'ngResource'
        ])

        .factory('ForecastService', ['$resource', function($resource) {
            return $resource('http://api.openweathermap.org/data/2.5/forecast/daily?q=:city&cnt=5');
        }])

        .filter('temperature', function() {
            var toCelsius = function(kelvin) {
                return kelvin - 273.15;
            };
            var toFahrenheit = function(kelvin) {
                return (toCelsius(kelvin) * (9.0 / 5.0)) + 32.0;
            };

            return function(kelvin, units) {
                switch (units) {
                    case 'imperial':
                        return toFahrenheit(kelvin);
                    case 'metric':
                        return toCelsius(kelvin);
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
                    units: '=forecast'
                },
                link: function($scope) {
                    $scope.$on('lookup', function($event, city) {
                        $scope.forecast = ForecastService.get({
                            city: city
                        });
                    });
                },
                templateUrl: 'app/scripts/openweather/_forecast.tpl.html'
            }
        }])

})(angular);
