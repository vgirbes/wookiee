'use strict';

/**
 * @ngdoc function
 * @name wookieesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wookieesApp
 */
angular.module('wookieesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    show_web($scope);
  });
