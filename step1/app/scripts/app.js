(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', 'OpenWeather', function($scope, OpenWeather) {
            $scope.weather = OpenWeather.get();
        }]);

})(angular);
