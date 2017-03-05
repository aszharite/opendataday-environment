(function () {
    "use strict";

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$http', '$q'
    ];

    function DashboardCtrl($http, $q) {
        var self = this;

        function setAirEnvironment(data) {
            var AQILevelEnum = [{
                min: 0,
                max: 50,
                level: 'green',
                label: 'good',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 50,
                max: 100,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 100,
                max: 150,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 150,
                max: 200,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 200,
                max: 300,
                level: 'red',
                label: 'very unhealthy',
                description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            }, {
                min: 300,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'hazardous',
                description: 'Health alert: everyone may experience more serious health effects.'
            }];
            var O3LevelEnum = [{
                min: 0,
                max: 50,
                level: 'green',
                label: 'good',
                description: 'It’s a great day to be active outside.'
            }, {
                min: 50,
                max: 100,
                level: 'orange',
                label: 'moderate',
                description: 'Some people who may be unusually sensitive to ozone.'
            }, {
                min: 100,
                max: 150,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Sensitive groups include people with lung disease such as asthma, older adults, children and teenagers, and people who are active outdoors.'
            }, {
                min: 150,
                max: 200,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone is at risk.'
            }, {
                min: 200,
                max: 300,
                level: 'red',
                label: 'very unhealthy',
                description: 'Everyone is at risk.'
            }, {
                min: 300,
                max: 500,
                level: 'red',
                label: 'hazardous',
                description: 'Everyone is at risk.'
            }];
            var NO2LevelEnum = [{
                min: 0,
                max: 20,
                level: 'green',
                label: 'good',
                description: 'No health impacts are expected when air quality is in this range.'
            }, {
                min: 20,
                max: 30,
                level: 'orange',
                label: 'moderate',
                description: 'Individuals who are unusually sensitive to nitrogen dioxide should consider limiting prolonged outdoor exertion.'
            }, {
                min: 30,
                max: 40,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'The following groups should limit prolonged outdoor exertion: People with lung disease, such as asthma, Children and older adults'
            }, {
                min: 40,
                max: 50,
                level: 'red',
                label: 'unhealthy',
                description: 'The following groups should avoid prolonged outdoor exertion: People with lung disease, such as asthma, Children and older adults, People who are active outdoors. Everyone else should limit prolonged outdoor exertion.'
            }, {
                min: 50,
                max: 60,
                level: 'red',
                label: 'very unhealthy',
                description: 'The following groups should avoid all outdoor exertion: People with lung disease, such as asthma, Children and older adults. Everyone else should limit outdoor exertion.'
            }, {
                min: 60,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'hazardous',
                description: 'The following groups should avoid all outdoor exertion: People with lung disease, such as asthma, Children and older adults. Everyone else should limit outdoor exertion.'
            }];
            var SO2LevelEnum = [{
                min: 0,
                max: 350,
                level: 'green',
                label: 'good',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 350,
                max: 600,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 600,
                max: 2600,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 2600,
                max: 9000,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 9000,
                max: 14000,
                level: 'red',
                label: 'very unhealthy',
                description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            }, {
                min: 14000,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'hazardous',
                description: 'Health alert: everyone may experience more serious health effects.'
            }];

            var AQILevel = null;
            AQILevelEnum.forEach(function(level) {
                if(level.min < data.aqi && level.max >= data.aqi) {
                    AQILevel = angular.copy(level);
                }
            });
            var O3Level = null;
            O3LevelEnum.forEach(function(level) {
                if(level.min < data.iaqi.o3.v && level.max >= data.iaqi.o3.v) {
                    O3Level = angular.copy(level);
                }
            });
            var NO2Level = null;
            NO2LevelEnum.forEach(function(level) {
                if(level.min < data.iaqi.no2.v && level.max >= data.iaqi.no2.v) {
                    NO2Level = angular.copy(level);
                }
            });
            var SO2Level = null;
            SO2LevelEnum.forEach(function(level) {
                if(level.min < data.iaqi.so2.v && level.max >= data.iaqi.so2.v) {
                    SO2Level = angular.copy(level);
                }
            });

            var indicators = [];
            indicators.push({
                id: 'O3',
                value: data.iaqi.o3.v,
                level: O3Level.level,
                label: O3Level.label,
                description: O3Level.description,
                measurement: 'AQI'
            });
            indicators.push({
                id: 'NO2',
                value: data.iaqi.no2.v,
                level: NO2Level.level,
                label: NO2Level.label,
                description: NO2Level.description,
                measurement: 'AQI'
            });
            indicators.push({
                id: 'SO2',
                value: data.iaqi.so2.v,
                level: SO2Level.level,
                label: SO2Level.label,
                description: SO2Level.description,
                measurement: 'AQI'
            });

            var improvements = [];
            if(O3Level.level == 'orange' || O3Level.level == 'red') improvements.push({
                id: 'car_sharing',
                description: 'Choose a cleaner commute - share a ride to work or use public transportation.'
            });
            if(O3Level.level == 'orange' || O3Level.level == 'red') improvements.push({
                id: 'car_idling',
                description: 'Avoid excessive idling of your automobile.'
            });
            if(O3Level.level == 'orange' || O3Level.level == 'red') improvements.push({
                id: 'car_refuel',
                description: 'Refuel your car in the evening when its cooler.'
            });
            if(O3Level.level == 'orange' || O3Level.level == 'red' || NO2Level.level == 'orange' || NO2Level.level == 'red') improvements.push({
                id: 'fuel_consumption',
                description: 'Reduce fuel consumption on day to day chores.'
            });
            if(O3Level.level == 'orange' || O3Level.level == 'red') improvements.push({
                id: 'conserve_electricity',
                description: 'Conserve electricity and set air conditioners no lower than 78 degrees.'
            });
            if(NO2Level.level == 'orange' || NO2Level.level == 'red') improvements.push({
                id: 'biomass_burns',
                description: 'A substantial amount of nitrous oxide is caused by biomass burning, which accounts for 10% of human-caused emissions.'
            });

            return {
                id: 'air',
                data: {
                    value: data.aqi,
                    level: AQILevel.level,
                    label: AQILevel.label,
                    description: AQILevel.description,
                    measurement: 'AQI'
                },
                indicators: indicators,
                improvements: improvements
            }
        }
        function setWaterEnvironment(data) {
            return {
                id: 'water',
                data: {},
                indicators: []
            }
        }
        function setGarbageEnvironment(data) {
            return {
                id: 'garbage',
                data: {},
                indicators: []
            }
        }
        function setTemperatureEnvironment(data) {
            return {
                id: 'temperature',
                data: {},
                indicators: []
            }
        }
        function setNoiseEnvironment(data) {
            return {
                id: 'noise',
                data: {},
                indicators: []
            }
        }
        function setBiomeEnvironment(data) {
            return {
                id: 'biome',
                data: {},
                indicators: []
            }
        }

        //region actions
        self.actions = {};
        self.actions.setActiveEnvironment = setActiveEnvironment;

        function setActiveEnvironment(environment) {
            self.data.selectedEnvironment = environment;
        }
        //endregion

        //region watchers
        self.watchers = {};
        self.watchers.isActiveEnvironment = isActiveEnvironment;

        function isActiveEnvironment(environment) {
            return self.data.selectedEnvironment.id == environment.id;
        }
        //endregion

        //region init
        self.$onInit = function() {
            self.data = {};
            self.loading = {};

            self.loading.page = true;
            self.data.environments = [];

            var queries = [];

            queries.push($http.get('http://api.waqi.info/feed/here/?token=f61c3feb0506d4e261547951c28f7cae3fa1fcc7'));

            $q.allSettled(queries)
                .then(function (response) {
                    var getAirData = response[0];

                    self.data.environments[0] = getAirData && getAirData.status == 200 ? setAirEnvironment(getAirData.data.data) : null;
                    self.data.environments[1] = setWaterEnvironment({});
                    self.data.environments[2] = setGarbageEnvironment({});
                    self.data.environments[3] = setTemperatureEnvironment({});
                    self.data.environments[4] = setNoiseEnvironment({});
                    self.data.environments[5] = setBiomeEnvironment({});
                })
                .then(function() {
                    setActiveEnvironment(self.data.environments[0]);
                    self.loading.page = false;
                });
        };
        //endregion
    }
})();