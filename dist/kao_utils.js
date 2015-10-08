$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.utils", []).factory("KaoDefer", function($q) {
    function KaoDefer() {
      var defer = $q.defer();
      defer.promise.success = function(callback) {
        defer.promise.then(function() {
          callback.apply(this, arguments);
        });
        return defer.promise;
      };
      defer.promise.error = function(callback) {
        defer.promise.then(null, function() {
          callback.apply(this, arguments);
        });
        return defer.promise;
      };
      return defer;
    }
    return KaoDefer;
  }).factory("KaoPromise", function(KaoDefer) {
    function KaoPromise(promise, resolveWith) {
      var deferred = KaoDefer();
      promise.success(function(data) {
        var resolveData = typeof resolveWith === "function" ? resolveWith(data) : void 0;
        if (!(typeof resolveData !== "undefined" && resolveData !== null)) {
          resolveData = data;
        }
        deferred.resolve(resolveData);
      }).error(function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    return KaoPromise;
  }).directive("dynamicDirective", function($compile) {
    return {
      restrict: "E",
      replace: true,
      link: function(scope, element, attrs) {
        if (attrs.directive) {
          var dom = "<" + attrs.directive + ">" + "</" + attrs.directive + ">";
          var el = $compile(dom)(scope);
          element.append(el);
        }
      }
    };
  }).directive("transcludePlaceholder", function() {
    return {
      restrict: "A",
      replace: true,
      controller: function($transclude) {
        this.$transclude = $transclude;
      },
      link: function(scope, element, attrs, controller) {
        var attach = function(clone) {
          for (var i = 0; i < clone.length; i++) {
            var el = angular.element(clone[i]);
            if (el.attr("fills-transclude") === attrs.transcludePlaceholder) {
              element.empty();
              element.append(el);
            }
          }
        };
        controller.$transclude(function(clone) {
          attach(clone);
        });
      }
    };
  }).directive("kaoHeader", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {headerTitle: "@"},
      template: "<div class=\"col-md-12 text-center\"> <div class=\"col-md-2\" transclude-placeholder=\"left\"></div> <h1 class=\"col-md-8\">{{headerTitle}}</h1> <div class=\"col-md-2\" transclude-placeholder=\"right\"></div> </div>"
    };
  });
  return {};
});

//# sourceMappingURL=kao_utils.map
