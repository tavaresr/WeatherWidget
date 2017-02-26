'use strict';

describe('Controller: weatherCtrl', function () {

    // load the controller's module
    beforeEach(module('weatherBlipApp'));

    var weatherCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        weatherCtrl = $controller('weatherCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    /*Tests*/

    it('should have unit as default value: c ', function () {
        expect(scope.unit).toBe('c');
    });

    it('should have showData as false', function () {
        expect(scope.showData).toBeFalsy();
    });

    it('should change the units based on toggle buttons click', function () {

        expect(scope.unit).toEqual('c');
        scope.setUnit('f');
        expect(scope.unit).toEqual('f');
    });
});