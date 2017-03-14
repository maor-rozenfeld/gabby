# Gabby
*Because some directives just won't shut up*

## The problem

In Angular, communication between a controller and his directives is a difficult task. The need for the controller to access functions and data on the directive and vice-versa is left almost unanswered. Some of the common options are:

* Use a shared scope, and assign functions and fields to it
* Use events, either with `$rootScope` or a shared scope
* Pass a controller instance between them

Each of these approaches has its own pros and cons, and might be better or worse than Gabby, depending on the situation.

## The solution

The Gabby approach will simply share two objects between the directive and its parent: `$scope.settings` and `$scope.api`.

You will use the `settings` field to pass initial values and callbacks to the directive.

You will use the `api` field to define "public" functions inside the directives for the parent controller to use.

The Gabby service is **entirely optional**, and doesn't provide much, other than a little less keystrokes.

## Example

### HTML
```
  <div ng-app="myApp" ng-controller="appCtrl">
    <my-dir settings="myDirSettings" api="myDirApi"></my-dir>
  </div>
```

### Parent Controller

```
  angular.module('myApp').controller('appCtrl', function($scope) {
    $scope.myDirSettings = {
      onStart: function() {
        //start the logic
      },
      defaultName: 'My App Name'
    };

    $scope.someClick = function() {
      $scope.myDirApi.fetchData();
    };        
  });
```

### Directive
#### Just Angular
```
  angular.module('myApp').directive('myDir', function() {
    return {
      controller: 'myDirCtrl',
      scope: { settings: '<', api: '=' }
    };
  });
```
#### Or with the Gabby Service
```
  angular.module('myApp').directive('myDir', function(gabby) {
    return {
      controller: 'myDirCtrl',
      scope: gabby.scope()
    };
  });
```

### Directive's Controller
#### Just Angular
```
  angular.module('myApp').controller('myDirCtrl', function($scope) {
      angular.extend($scope, {
          onStart: function() {},
          onSubmit: function() {},
          defaultName: 'John'  
        }, $scope.settings);
      $scope.api = $scope.api || {};
      $scope.api.clearValues = function() {
          //do magic things
      };
      $scope.api.fetchData = function() {
          //do magic things
      };
      $scope.api.getValues = function() {
          //do magic things
      };        
});
```

#### Or with the Gabby Service
```
  angular.module('myApp').controller('myDirCtrl', function($scope, gabby) {
    gabby.for($scope)
      .settings({
          //These are the default settings for the directive,
          //allowing the reader to easily understand what can
          //be passed to the directive
          onStart: function() {},
          onSubmit: function() {},
          defaultName: 'John'  
        })
      .api({
          //These are the public functions of the directives
          clearValues: function() {
            //do magic things
          },
          fetchData: function() {
            //do magic things
          },
          getValues: function() {
            //do magic things
          }
      });
  });
```
