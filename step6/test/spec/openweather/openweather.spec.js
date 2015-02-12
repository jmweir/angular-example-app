'use strict';

describe('Module: OpenWeather', function() {

    beforeEach(module('example.openweather'));

    describe('Service: ForecastService', function() {

        var ForecastService, httpBackend;

        beforeEach(inject(function(_ForecastService_, $httpBackend) {
            ForecastService = _ForecastService_;
            httpBackend = $httpBackend;
        }));

        it('should be injected', function() {
            expect(!!ForecastService).toBe(true);
        });

        it('should fetch forecast', function() {
            httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=TEST&cnt=5').respond({
                list: [
                    {
                        weather: [
                            {
                                main: 'Clear'
                            }
                        ],
                        temp: {
                            min: 0,
                            max: 1
                        }
                    }
                ]
            });

            var forecast = ForecastService.get({ city: 'TEST' });
            httpBackend.flush();

            expect(forecast.list.length).toBe(1);
            expect(forecast.list[0].weather.length).toBe(1);
            expect(forecast.list[0].weather[0].main).toBe('Clear');
            expect(forecast.list[0].temp.min).toBe(0);
            expect(forecast.list[0].temp.max).toBe(1);
        });
    });

    describe('Filter: Temperature', function() {

        var filter;

        beforeEach(inject(function($filter) {
            filter = $filter;
        }));

        it('should convert Kelvin to Celsius', function() {
            expect(filter('temperature')(373.15, 'metric')).toBe(100.0);
        });

        it('should convert Kelvin to Fahrenheit', function() {
            expect(filter('temperature')(373.15, 'imperial')).toBe(212.0);
        });

    });

    describe('Directive: Forecast', function() {

        var scope, $rootScope, element;

        beforeEach(module(function($provide) {
            $provide.value('ForecastService', {
                get: function() {
                    return {
                        list: [
                            {
                                dt: 1413599897,
                                weather: [
                                    {
                                        main: 'Clear',
                                        icon: '01d'
                                    }
                                ],
                                temp: {
                                    min: 280,
                                    max: 290
                                }
                            }
                        ]
                    };
                }
            });
        }));

        beforeEach(module('templates'));

        beforeEach(inject(function(_$rootScope_, $compile) {
            $rootScope = _$rootScope_;

            scope = $rootScope.$new();
            scope.units = 'imperial';

            element = $compile('<div forecast="units" />')(scope);

            scope.$apply();
        }));

        it('should render forecast data with correct units', function() {
            $rootScope.$broadcast('lookup', 'London');
            $rootScope.$digest();

            expect(element.find('div').eq(1).find('img').attr('src')).toBe('http://openweathermap.org/img/w/01d.png');
            expect(element.find('div').eq(2).find('span').text()).toBe('Clear');
            expect(element.find('div').eq(3).find('span').text()).toBe('Low: 44, High: 62');
            expect(element.find('div').eq(4).find('span').text()).toBe('2014-10-17');

            scope.units = 'metric';
            scope.$apply();

            expect(element.find('div').eq(3).find('span').text()).toBe('Low: 7, High: 17');
        });

    });

});
