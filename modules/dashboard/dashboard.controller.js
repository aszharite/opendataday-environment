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

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function setAirEnvironment(data) {
            var aqi = data.aqi;
            // var o3 = data.iaqi.o3.v;
            // var no2 = data.iaqi.no2.v;
            // var so2 = data.iaqi.so2.v;
            var o3 = getRandomInt(0, 500);
            var no2 = getRandomInt(0, 60);
            var so2 = getRandomInt(0, 14000);

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
                if(level.min < aqi && level.max >= aqi) {
                    AQILevel = angular.copy(level);
                }
            });
            var O3Level = null;
            O3LevelEnum.forEach(function(level) {
                if(level.min < o3 && level.max >= o3) {
                    O3Level = angular.copy(level);
                }
            });
            var NO2Level = null;
            NO2LevelEnum.forEach(function(level) {
                if(level.min < no2 && level.max >= no2) {
                    NO2Level = angular.copy(level);
                }
            });
            var SO2Level = null;
            SO2LevelEnum.forEach(function(level) {
                if(level.min < so2 && level.max >= so2) {
                    SO2Level = angular.copy(level);
                }
            });

            var indicators = [];
            indicators.push({
                id: 'O3',
                value: o3,
                level: O3Level.level,
                label: O3Level.label,
                description: O3Level.description,
                measurement: 'AQI'
            });
            indicators.push({
                id: 'NO2',
                value: no2,
                level: NO2Level.level,
                label: NO2Level.label,
                description: NO2Level.description,
                measurement: 'AQI'
            });
            indicators.push({
                id: 'SO2',
                value: so2,
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
                    value: aqi,
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
            var PHLevelEnum = [{
                min: Number.MIN_VALUE,
                max: 3.5,
                level: 'red',
                label: 'Ultra acidic',
                description: 'Ultra acidic'
            }, {
                min: 3.5,
                max: 4.5,
                level: 'red',
                label: 'Extremely acidic',
                description: 'Extremely acidic'
            }, {
                min: 4.5,
                max: 5,
                level: 'red',
                label: 'Very strongly acidic',
                description: 'Very strongly acidic'
            }, {
                min: 5,
                max: 5.5,
                level: 'red',
                label: 'Strongly acidic',
                description: 'Strongly acidic'
            }, {
                min: 5.5,
                max: 6,
                level: 'orange',
                label: 'Moderately acidic',
                description: 'Moderately acidic'
            }, {
                min: 6,
                max: 6.5,
                level: 'orange',
                label: 'Slightly acidic',
                description: 'Slightly acidic'
            }, {
                min: 6.5,
                max: 7.3,
                level: 'green',
                label: 'Neutral',
                description: 'Neutral'
            }, {
                min: 7.3,
                max: 7.8,
                level: 'orange',
                label: 'Slightly alkaline',
                description: 'Slightly alkaline'
            }, {
                min: 7.8,
                max: 8.4,
                level: 'orange',
                label: 'Moderately alkaline',
                description: 'Moderately alkaline'
            }, {
                min: 8.4,
                max: 9,
                level: 'red',
                label: 'Strongly alkaline',
                description: 'Strongly alkaline'
            }, {
                min: 9,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'Very strongly alkaline',
                description: 'Very strongly alkaline'
            }];

            var PHLevel = null;
            PHLevelEnum.forEach(function(level) {
                if(level.min < data.ph && level.max >= data.ph) {
                    PHLevel = angular.copy(level);
                }
            });

            return {
                id: 'water',
                data: {
                    value: data.ph,
                    level: PHLevel.level,
                    label: PHLevel.label,
                    description: PHLevel.description,
                    measurement: 'Ph'
                },
                indicators: []
            }
        }
        function setGarbageEnvironment(data) {
            var garbage = data.percentage;
            var GarbageLevelEnum = [{
                min: Number.MIN_VALUE,
                max: 50,
                level: 'red',
                description: 'Satisfaction with waste disposal is low.'
            }, {
                min: 50,
                max: 75,
                level: 'orange',
                description: 'Satisfaction with waste disposal is medium.'
            }, {
                min: 75,
                max: 100,
                level: 'green',
                description: 'Population is satisified with waste disposal.'
            }];

            var GarbageLevel = null;
            GarbageLevelEnum.forEach(function(level) {
                if(level.min < garbage && level.max >= garbage) {
                    GarbageLevel = angular.copy(level);
                }
            });

            return {
                id: 'garbage',
                data: {
                    value: garbage,
                    level: GarbageLevel.level,
                    label: GarbageLevel.label,
                    description: GarbageLevel.description,
                    measurement: '%'
                },
                indicators: []
            }
        }
        function setTemperatureEnvironment(data) {
            var temperature = data.iaqi.t.v;

            var TemperatureLevelEnum = [{
                min: Number.MIN_VALUE,
                max: -16,
                level: 'red'
            }, {
                min: -16,
                max: -11,
                level: 'orange'
            }, {
                min: -11,
                max: 10,
                level: 'orange'
            }, {
                min: 10,
                max: 27,
                level: 'green'
            }, {
                min: 27,
                max: 32,
                level: 'orange'
            }, {
                min: 32,
                max: 41,
                level: 'orange'
            }, {
                min: 41,
                max: 50,
                level: 'red'
            }, {
                min: 50,
                max: Number.MAX_VALUE,
                level: 'red'
            }];

            var TemperatureLevel = null;
            TemperatureLevelEnum.forEach(function(level) {
                if(level.min < temperature && level.max >= temperature) {
                    TemperatureLevel = angular.copy(level);
                }
            });

            return {
                id: 'temperature',
                data: {
                    value: temperature,
                    level: TemperatureLevel.level,
                    label: TemperatureLevel.label,
                    description: TemperatureLevel.description,
                    measurement: 'C'
                },
                indicators: []
            }
        }
        function setNoiseEnvironment(data) {
            var noise = data.db;
            var NoiseLevelEnum = [{
                min: Number.MIN_VALUE,
                max: 10,
                level: 'green',
                description: 'Nature sounds'
            }, {
                min: 10,
                max: 20,
                level: 'green',
                description: 'Library'
            }, {
                min: 20,
                max: 40,
                level: 'green',
                description: 'Normal conversation'
            }, {
                min: 40,
                max: 70,
                level: 'orange',
                description: 'Vacuum cleaner'
            }, {
                min: 70,
                max: 90,
                level: 'orange',
                description: 'Street sound, crowds.'
            }, {
                min: 90,
                max: 110,
                level: 'red',
                description: 'Rock concert'
            }, {
                min: 110,
                max: 130,
                level: 'red',
                description: 'Jet airplane'
            }, {
                min: 130,
                max: Number.MAX_VALUE,
                level: 'red',
                description: 'Painful'
            }];

            var NoiseLevel = null;
            NoiseLevelEnum.forEach(function(level) {
                if(level.min < noise && level.max >= noise) {
                    NoiseLevel = angular.copy(level);
                }
            });

            return {
                id: 'noise',
                data: {
                    value: noise,
                    level: NoiseLevel.level,
                    label: NoiseLevel.label,
                    description: NoiseLevel.description,
                    measurement: 'dB'
                },
                indicators: []
            }
        }
        function setBiomeEnvironment(data) {
            var biome = data.percentage;
            var BiomeLevelEnum = [{
                min: Number.MIN_VALUE,
                max: 50,
                level: 'red',
                description: 'Population considers biome needs more diversity in the area.'
            }, {
                min: 50,
                max: 75,
                level: 'orange',
                description: 'Population considers biome could be better but dont feel strong about it.'
            }, {
                min: 75,
                max: 100,
                level: 'green',
                description: 'Population considers biome levels are adequate.'
            }];

            var BiomeLevel = null;
            BiomeLevelEnum.forEach(function(level) {
                if(level.min < biome && level.max >= biome) {
                    BiomeLevel = angular.copy(level);
                }
            });

            return {
                id: 'biome',
                data: {
                    value: biome,
                    level: BiomeLevel.level,
                    label: BiomeLevel.label,
                    description: BiomeLevel.description,
                    measurement: '%'
                },
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

            queries.push($http.get('https://api.waqi.info/feed/here/?token=f61c3feb0506d4e261547951c28f7cae3fa1fcc7'));

            $q.allSettled(queries)
                .then(function (response) {
                    var getAirData = response[0];

                    self.data.environments[0] = getAirData && getAirData.status == 200 ? setAirEnvironment(getAirData.data.data) : null;
                    self.data.environments[1] = setWaterEnvironment({ph: getRandomArbitrary(0, 10).toFixed(1) });
                    self.data.environments[2] = setGarbageEnvironment({percentage: getRandomArbitrary(0, 100).toFixed(2)});
                    self.data.environments[3] = getAirData && getAirData.status == 200 ? setTemperatureEnvironment(getAirData.data.data) : null;
                    self.data.environments[4] = setNoiseEnvironment({db: getRandomInt(0, 100)});
                    self.data.environments[5] = setBiomeEnvironment({percentage: getRandomArbitrary(0, 100).toFixed(2)});
                })
                .then(function() {
                    setActiveEnvironment(self.data.environments[0]);
                    self.loading.page = false;
                });
        };
        //endregion
    }
})();