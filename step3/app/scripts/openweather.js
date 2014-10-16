(function(ng) {
    'use strict';

    ng
        .module('example.openweather', [
            'ngResource'
        ])

        .factory('OpenWeather', ['$resource', function($resource) {
            return $resource('http://api.openweathermap.org/data/2.5/weather?q=:city&units=imperial');
        }])

        .directive('openWeather', ['OpenWeather', function(OpenWeather) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    city: '=openWeather'
                },
                link: function($scope) {
                    $scope.$watch('city', function() {
                        $scope.weather = OpenWeather.get({ city: $scope.city });
                    });
                },
                template: '<h3 ng-show="weather.main.temp">{{weather.main.temp}} F</h3>'
            }
        }])

})(angular);
