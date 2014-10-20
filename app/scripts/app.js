'use strict';

/**
 * @ngdoc overview
 * @name wookieesApp
 * @description
 * # wookieesApp
 *
 * Main module of the application.
 */
angular
  .module('wookieesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/catalog', {
        templateUrl: 'views/catalog.html',
        controller: 'Catalog'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
