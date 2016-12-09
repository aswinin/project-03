/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('dashboards', {
                parent: 'secure',
                url: '/dashboards',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl'
            })
            .state('dashboards-es', {
                parent: 'secure',
                url: '/dashboards-es',
                templateUrl: 'views/dashboards-es.html',
                controller: 'DashboardsESCtrl'
            })
            .state('dashboards-gb', {
                parent: 'secure',
                url: '/dashboards-gb',
                templateUrl: 'views/dashboards-gb.html',
                controller: 'DashboardsGBCtrl'
            })
            .state('about', {
                parent: 'secure',
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('forms', {
                url: '/forms',
                templateUrl: 'views/forms.html',
                controller: 'FormsCtrl'
            })
            .state('forms-details', {
                url: '/forms-details',
                templateUrl: 'views/forms-details.html',
                controller: 'FormsDetailsCtrl'
            });



        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/dashboards');
            $state.go('dashboards');
        });

    }]);
});
