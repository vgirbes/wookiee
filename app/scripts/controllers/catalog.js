'use strict';

// var app = angular.module('wookieesApp', []);
angular.module('wookieesApp').controller('Catalog', function ($scope, $http) {
    $http.get('assets/categories.json', { cache: true }).success(function (data) {
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
      
    });
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      $('.loading').hide();
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
    get_product($scope, $http, 'no-filter');
});

angular.module('wookieesApp').controller('Services', function ($scope, $routeParams, $http) {
    $scope.cat_name = $routeParams.name;
    $scope.id_cat = $routeParams.id_cat;
    $scope.id_product = $routeParams.id_product;
    $scope.id_filter = $routeParams.id_filter;
    $scope.prior = 'product';

    get_categories($scope, $http);
    get_product($scope, $http, 'no-filter');
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
  $http.get('assets/filters.json', { cache: true }).success(function (data) {
    get_product($scope, $http, 'filter');
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
  $scope.w_name = name;

  if (name != ''){
    angular.forEach($scope.brands, function(brand) {
      if (brand.marca_carro == name){
        $scope.model_years.push(brand);
        $scope.select_name = brand.modelo;
      }
    });
  }
}

function get_categories($scope, $http){
  $http.get('assets/categories.json', { cache: true }).success(function (data) {
    $scope.categories = data.categories;
  });

}

function get_product($scope, $http, type){
  var retrievedBrands = localStorage.getItem($scope.cat_name+'_brands');
  var retrievedProducts = localStorage.getItem($scope.cat_name+'_products');
  //var retrievedModel_year = localStorage.getItem($scope.cat_name+'_model_year');

  if (retrievedBrands && retrievedProducts){
    if (type == 'no-filter'){
      $scope.products = JSON.parse(retrievedProducts);
      //$scope.model_years = JSON.parse(retrievedModel_year);
    }
    $scope.brands = JSON.parse(retrievedBrands);
    
  }else{
    $http.get('assets/products/poland/'+$scope.cat_name+'.json', { cache: true }).success(function (data) {
      $scope.brands = data;
      if (type == 'no-filter'){
        $scope.products = data;
      }
      //$scope.model_years = data;
      window.localStorage.setItem($scope.cat_name+'_products', JSON.stringify(data));;
      window.localStorage.setItem($scope.cat_name+'_brands', JSON.stringify(data));;
      //window.localStorage.setItem($scope.cat_name+'_model_year', JSON.stringify(data));;
    });
  }
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
