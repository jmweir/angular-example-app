(function(ng) {
    'use strict';

    ng
        .module('example.openweather', [
            'ngResource'
        ])

        .factory('OpenWeather', ['$resource', function($resource) {
            return $resource('http://api.openweathermap.org/data/2.5/weather?q=Rockville,us&units=metric');
        }]);

})(angular);
