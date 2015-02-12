(function(ng) {
    'use strict';

    ng
        .module('example', [])

        .controller('AppController', ['$scope', function($scope) {
            $scope.temp = 32;
        }]);

})(angular);
