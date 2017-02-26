'use strict';
/**
 * @name weatherWidget.controller:weatherCtrl
 * @author Ricardo Tavares
 * @description Controller of the weatherWidget
 */
angular.module('weatherWidget')
    .controller('weatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
        $scope.unit = 'c';
        $scope.showData = false;
        $scope.showError = false;

        function fetchWeather(city, unit) {

            weatherService.getWeather(city, unit).then(
                function (response) {
                    // Check if not return empty
                    if (response.data.query.count === 1) {
                        //console.log(response.data.query.results.channel);
                        $scope.place = response.data.query.results.channel;
                        $scope.temp = response.data.query.results.channel.item.condition.temp + 'º';
                        $scope.location = response.data.query.results.channel.location.city + ', ' + response.data.query.results.channel.location.country;
                        $scope.text = response.data.query.results.channel.item.condition.text;
                        $scope.showData = true;
                    } else {
                        $scope.error = 'City not found.';
                        $scope.showError = true;
                    }
                },
                function (response) {
                    //console.log('Error retrieving data from server! ' + response.status + ' ' + response.statusText);
                    $scope.error = 'Error: ' + response.status + ' ' + response.statusText;
                    $scope.showError = true;
                }).finally(function () {
                // called no matter success or failure
                $scope.loading = false;
            });
        }

        $scope.setUnit = function (unit) {
            $scope.unit = unit;
            $scope.findWeather($scope.city);
        };

        $scope.findWeather = function (city) {
            $scope.place = '';
            $scope.error = '';
            $scope.showError = false;
            $scope.showData = false;
            $scope.loading = true;
            $scope.loadingMsg = 'Loading, please wait...';
            fetchWeather(city, $scope.unit);
        };

}]);