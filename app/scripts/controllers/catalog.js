'use strict';

// var app = angular.module('wookieesApp', []);
angular.module('wookieesApp')
  .controller('Catalog', function ($scope, $http) {
    $http.get('assets/categories.json').success(function (data) {
        $scope.datos = data.categories;
        //$scope.total = Math.ceil($scope.datos.length / $scope.pageSize);
        $scope.page1 = data.categories.slice(0, 8);
        $scope.page2 = data.categories.slice(8, 16);
        $scope.page3 = data.categories.slice(16, 18);

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $('.bxslider').bxSlider({
              infiniteLoop: false,
              captions: true,
              controls: false
            });
        });
  });
});



/*
angular.module('wookieesApp').directive('ngSparkline', function() {
  return {
    restrict: 'A',
    template: '<div class="sparkline">aaaa</div>'
  }
});*/

