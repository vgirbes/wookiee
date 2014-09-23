'use strict';

/**
 * @ngdoc function
 * @name wookieesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wookieesApp
 */
angular.module('wookieesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
