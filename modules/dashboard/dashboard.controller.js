(function () {
    "use strict";

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [];

    function DashboardCtrl() {
        var self = this;

        function setAirEnvironment(data) {
            var AQILevelEnum = [{
                min: 0,
                max: 50,
                level: 'green',
                label: 'good',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 51,
                max: 100,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 101,
                max: 150,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 151,
                max: 200,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 201,
                max: 300,
                level: 'red',
                label: 'very unhealthy',
                description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            }, {
                min: 301,
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
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 51,
                max: 100,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 101,
                max: 150,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 151,
                max: 200,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 201,
                max: 300,
                level: 'red',
                label: 'very unhealthy',
                description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            }, {
                min: 301,
                max: 500,
                level: 'red',
                label: 'hazardous',
                description: 'Health alert: everyone may experience more serious health effects.'
            }];

            var NO2LevelEnum = [{
                min: 0,
                max: 19,
                level: 'green',
                label: 'good',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 20,
                max: 29,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 30,
                max: 39,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 40,
                max: 49,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 50,
                max: 59,
                level: 'red',
                label: 'very unhealthy',
                description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
            }, {
                min: 59,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'hazardous',
                description: 'Health alert: everyone may experience more serious health effects.'
            }];
            var SO2LevelEnum = [{
                min: 0,
                max: 349,
                level: 'green',
                label: 'good',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            }, {
                min: 350,
                max: 599,
                level: 'orange',
                label: 'moderate',
                description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
            }, {
                min: 600,
                max: 2599,
                level: 'orange',
                label: 'unhealthy for sensitive groups',
                description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
            }, {
                min: 2600,
                max: 8999,
                level: 'red',
                label: 'unhealthy',
                description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
            }, {
                min: 9000,
                max: 13999,
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
                if(level.min <= data.aqi && level.max >= data.aqi) {
                    AQILevel = angular.copy(level);
                    break;
                }
            });

            return {
                id: 'air',
                data: {
                    value: data.aqi,
                    level: AQILevel.level,
                    label: AQILevel.label,
                    description: AQILevel.description
                },
                indicators: []
            }
        }

        //region init
        self.$onInit = function() {
            self.data = {};
            // self.data.environments = [{
            //     id: 'air',
            // }, {
            //     id: 'water',
            // }, {
            //     id: 'garbage',
            // }, {
            //     id: 'temperature'
            // }, {
            //     id: 'noise'
            // }, {
            //     id: 'biome'
            // }];

            self.data.environments = [];
            self.data.environments[0] = setAirEnvironment({
                'aqi': 10,
                'o3': 0,
                'no2': 0,
                'so2': 0
            });
        };
        //endregion
    }
})();