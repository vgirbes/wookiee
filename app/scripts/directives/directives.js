angular.module('wookieesApp').directive('onFinishRender', function ($timeout) {
	return {
	    restrict: 'A',
	    link: function (scope, element, attr) {
	        if (scope.$last === true) {
	            $timeout(function () {
	                scope.$emit('ngRepeatFinished');
	            });
	        }
	    }
    }
});

angular.module('wookieesApp').directive('onLoadServices', function ($timeout) {
  return {
      restrict: 'A',
      link: function (scope, element, attr) {
          if (scope.$last === true) {
              $timeout(function () {
                  scope.$emit('ngServicesLoaded');
              });
          }
      }
    }
});

angular.module('wookieesApp').directive('onLoadProducts', function ($timeout) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            console.log('cargado 1');
			if (scope.$last === true) {
				console.log('cargado 2');
	            $timeout(function () {
	                scope.$emit('ngLoadProducts');
	            });
	        }
		}
	};
});

angular.module('wookieesApp').directive('product', function() {
   return {
       restrict: 'E',
       link: function(scope, element, attrs) {
           scope.getContentUrl = function() {
                return 'views/poland/'+attrs.ver+'.html';
           }
       },
       template: '<div ng-include="getContentUrl()"></div>'
   }
});

angular.module('wookieesApp').directive('breadcrumbfooter', function() {
   return {
       restrict: 'E',
       link: function(scope, element, attrs) {
           scope.getContentUrlBread = function() {
                return 'views/poland/includes/footer_bread.html';
           }
       },
       template: '<div ng-include="getContentUrlBread()"></div>'
   }
});

angular.module('wookieesApp').directive('breadcrumbheader', function() {
   return {
       restrict: 'E',
       link: function(scope, element, attrs) {
           scope.getContentUrlBreadHeader = function() {
                return 'views/poland/includes/header_bread.html';
           }
       },
       template: '<div ng-include="getContentUrlBreadHeader()"></div>'
   }
});