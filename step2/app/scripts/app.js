(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', 'OpenWeather', function($scope, OpenWeather) {
            $scope.$watch('city', function(city) {
                $scope.weather = OpenWeather.get({ city: city });
            });
        }]);

})(angular);
