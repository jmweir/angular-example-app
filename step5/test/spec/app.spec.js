'use strict';

describe('Module: Example App', function() {

    beforeEach(module('example'));

    describe('Controller: AppController', function() {

        var scope;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            $controller('AppController', {$scope: scope});

            scope.$digest();
        }));

        it('should initialize units to imperial', function() {
            expect(scope.units).toBe('imperial');
        });
    });
});

