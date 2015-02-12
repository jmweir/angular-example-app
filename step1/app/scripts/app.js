(function(ng) {
    'use strict';

    ng
        .module('example', [])

        .controller('AppController', ['$scope', '$http', function($scope, $http) {
            $http.get('http://api.openweathermap.org/data/2.5/weather?q=Rockville,us&units=metric').success(function(data) {
                $scope.weather = data;
            });
        }]);

})(angular);
