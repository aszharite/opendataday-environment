(function() {
    "use strict";

    angular
        .module('app')
        .config(DashboardRoute);

    DashboardRoute.$inject = [
        '$urlRouterProvider', '$stateProvider'
    ];

    function DashboardRoute($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state('Dashboard', {
                url: "/dashboard",
                templateUrl: "modules/dashboard/dashboard.view.html"
            });
    }
})();