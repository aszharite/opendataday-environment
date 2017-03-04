(function () {

    angular
        .module('app')
        .config(QAllSettledConfig);

    QAllSettledConfig.$inject = [
        '$provide'
    ];

    function QAllSettledConfig($provide) {
        $provide.decorator('$q', DelegateDecorator);
    }

    DelegateDecorator.$inject = [
        '$delegate'
    ];

    function DelegateDecorator($delegate) {
        var $q = $delegate;

        $q.allSettled = $q.allSettled || function (promises) {
                var toSettle = [];

                if (angular.isArray(promises)) {
                    angular.forEach(promises, function (promise, key) {
                        var dfd = $q.defer();
                        promise.then(dfd.resolve, dfd.resolve);
                        toSettle.push(dfd.promise);
                    });
                }
                return $q.all(toSettle);
            };

        return $q;
    }
})();