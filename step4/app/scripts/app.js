(function(ng) {
    'use strict';

    ng
        .module('example', [
            'ngResource',

            'example.openweather'
        ])

        .controller('AppController', ['$scope', function($scope) {
            $scope.units = 'imperial';
        }]);

})(angular);
