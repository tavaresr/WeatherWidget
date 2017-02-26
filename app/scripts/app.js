'use strict';
/**
 * @name weatherWidget
 * @author Ricardo Tavares
 * @description Main module of the application.
 */
angular.module('weatherWidget', [])

/* Directive to allow user press enter and load the search*/
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {
                        'event': event
                    });
                });

                event.preventDefault();
            }
        });
    };
})

/* Service to get data from YAHOO API using http GET request*/
.factory('weatherService', ['$http', function ($http) {

    var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\") and u=\"%d\"';
    var url = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';

    function buildRequest(text, unit) {

        var queryWithCity = query.replace('%s', text);
        var queryWithCityAndUnit = queryWithCity.replace('%d', unit);

        return url + queryWithCityAndUnit;
    }

    function getWeather(city, unit) {

        var fullURL = buildRequest(city, unit);

        return $http.get(fullURL);
    }

    return {
        getWeather: getWeather
    };

    }]);