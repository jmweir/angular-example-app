(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', 'OpenWeather', function($scope, OpenWeather) {
            $scope.lookup = function() {
                $scope.weather = OpenWeather.get({ city: $scope.city });
            };
        }]);

})(angular);
