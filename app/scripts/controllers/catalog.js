'use strict';

// var app = angular.module('wookieesApp', []);
angular.module('wookieesApp').controller('Catalog', function ($scope, $http) {
    $http.get('assets/categories.json').success(function (data) {
        $scope.datos = data.categories;
        $scope.page1 = data.categories.slice(0, 8);
        $scope.page2 = data.categories.slice(8, 16);
        $scope.page3 = data.categories.slice(16, 24);

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $('.bxslider').bxSlider({
              infiniteLoop: false,
              captions: true,
              controls: false
            });
        });
  });
});

angular.module('wookieesApp').controller('DefineSearch', function ($scope, $routeParams, $http) {
    $scope.cat_name = $routeParams.name;
    $scope.id_cat = $routeParams.id_cat;
    $scope.filter = $routeParams.id_filter;
    $scope.$watch(function() {
      $('#filter-type-'+$routeParams.id_filter).show();
    });

    get_categories($scope, $http);
    get_filters($scope, $http, $routeParams);
    
});

angular.module('wookieesApp').controller('ShowProduct', function ($scope, $routeParams, $http) {
    $scope.cat_name = $routeParams.name;
    $scope.id_cat = $routeParams.id_cat;
    $scope.id_product = $routeParams.id_product;
    $scope.id_filter = $routeParams.id_filter;
    $scope.prior = 'category';

    get_categories($scope, $http);
    get_product($scope, $http);
});

angular.module('wookieesApp').controller('Services', function ($scope, $routeParams, $http) {
    $scope.cat_name = $routeParams.name;
    $scope.id_cat = $routeParams.id_cat;
    $scope.id_product = $routeParams.id_product;
    $scope.id_filter = $routeParams.id_filter;
    $scope.prior = 'product';

    get_categories($scope, $http);
    get_product($scope, $http);
    $scope.$on('ngServicesLoaded', function(ngServicesLoadedEvent) {
      if ($('.no-exist').is(':visible')){
        $('#info-services').hide();
      }
    });
    
});

angular.module('wookieesApp').filter('by_id', function() {
  return function(items, id_category) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if(id_category == item.id) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

function get_filters($scope, $http, $routeParams){
  $http.get('assets/filters.json').success(function (data) {
    get_product($scope, $http);
    switch ($routeParams.id_filter){
      case "1":
        $scope.show_model_year = function(name){ show_model_year($scope, name); };
        $scope.load_product = function(id){ load_product($scope, id); };
      break;
      case "2":
        $scope.show_model_year = function(name){ show_model_year($scope, name); };
        $scope.show_motor = function(modelo, name){ show_motor($scope, modelo, name); };
        $scope.load_product = function(id){ load_product($scope, id); };
      break;
      case "3":
      break;
      case "4":
      break;
      case "5":
        $scope.show_model_year = function(name){ show_model_year($scope, name); };
        $scope.show_motor = function(modelo, name){ show_motor($scope, modelo, name); };
      break;
      case "6":
      break;
    }
        
  });
}

function load_product($scope, id){
  if (typeof(id) != 'undefined'){
    $scope.$watch(function() {
      window.location.href = "#/catalog/product/"+$scope.cat_name+"/"+$scope.id_cat+"/"+$scope.filter+"/"+id;
    });
  }
}

function show_motor($scope, modelo, name){
  $scope.motors = [];
  if (modelo != '' && name != ''){
    angular.forEach($scope.brands, function(brand) {
      if (brand.modelo == modelo && brand.marca_carro == name){
        $scope.motors.push(brand);
      }
    });
  }
}

function show_model_year($scope, name) {
  $scope.model_years = [];
  if (name != ''){
    angular.forEach($scope.brands, function(brand) {
      if (brand.marca_carro == name){
        $scope.model_years.push(brand);
      }
    });
  }
}

function get_categories($scope, $http){
  $http.get('assets/categories.json').success(function (data) {
    $scope.categories = data.categories;
  });
}

function get_product($scope, $http){
  $http.get('assets/products/poland/'+$scope.cat_name+'.json').success(function (data) {
    $scope.products = data;
    $scope.brands = data;
    $scope.model_years = data;
  });
}

angular.module('wookieesApp').filter('unique', function () {
  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }
    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];
      var extractValueToCompare = function (item) {
      if (angular.isObject(item) && angular.isString(filterOn)) {
        return item[filterOn];
      } else {
        return item;
      }
  };

  angular.forEach(items, function (item) {
      var valueToCheck, isDuplicate = false;
      for (var i = 0; i < newItems.length; i++) {
        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        newItems.push(item);
      }
    });
    items = newItems;
    }
    return items;
    };
});

