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
                min: 251,
                max: Number.MAX_VALUE,
                level: 'red',
                label: 'hazardous',
                description: 'Health alert: everyone may experience more serious health effects.'
            }];
            var O3LevelEnum = [];
            var SO2LevelEnum = [];
            var NO2LevelEnum = [];

            var AQILevel = null;
            AQILevelEnum.forEach(function(level) {
                if(level.min <= data.aqi && level.max >= data.aqi) {
                    AQILevel = angular.copy(level);
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

        self.actions = {};
        self.actions.setActiveEnvironment = setActiveEnvironment;

        function setActiveEnvironment(environment) {
            self.data.selectedEnvironment = environment;
        }

        self.watchers = {};
        self.watchers.isActiveEnvironment = isActiveEnvironment;

        function isActiveEnvironment(environment) {
            return self.data.selectedEnvironment.id == environment.id;
        }

        //region init
        self.$onInit = function() {
            self.data = {};
            self.loading = {};

            self.loading.page = true;
            self.data.environments = [];
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

            var queries = [];

            queries.push($http.get('http://api.waqi.info/feed/here/?token=f61c3feb0506d4e261547951c28f7cae3fa1fcc7'));

            $q.allSettled(queries)
                .then(function (response) {
                    var getAirData = response[0];

                    self.data.environments[0] = getAirData && getAirData.status == 200 ? setAirEnvironment(getAirData.data.data) : null;
                    self.data.environments[1] = [];
                })
                .then(function() {
                    setActiveEnvironment(self.data.environments[0]);
                    self.loading.page = false;
                });
        };
        //endregion
    }
})();