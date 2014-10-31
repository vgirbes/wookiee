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
      .when('/catalog/category/:name/:id_cat/:id_filter/:id_product', {
        templateUrl: 'views/search.html',
        controller: 'DefineSearch'
      })
      .when('/catalog/product/:name/:id_cat/:id_filter/:id_product', {
        templateUrl: 'views/products.html',
        controller: 'ShowProduct'
      })
      .when('/catalog/services/:name/:id_cat/:id_filter/:id_product', {
        templateUrl: 'views/services.html',
        controller: 'Services'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
