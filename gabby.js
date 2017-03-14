angular.module('gabby', []).factory('gabby',function() {
  return {
    for: function(scope) {
      var scopedService = {};

      scopedService.settings = function(defaults) {
        angular.extend(scope, defaults, scope.settings);
        return scopedService;
      };

      scopedService.api = function(apiDefinition) {
        scope.api = scope.api || {};
        angular.extend(scope.api, apiDefinition);
        return scopedService;
      };

      return scopedService;
    },
    scope: function(fields) {
      var isOneWayAvailable = angular.version.major === 1 && angular.version.minor >= 5;
      return angular.extend({
        settings: isOneWayAvailable ? '<' : '=',
        api: '='
      }, fields);
    }
  };
});
