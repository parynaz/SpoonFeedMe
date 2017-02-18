// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')

.controller('HomeCtrl', function($scope, $state, $ionicPopover, SearchService, VariableExchange) {
  $scope.$on("$ionicView.beforeEnter", function() {

  // .fromTemplate() method
  var template = '<ion-popover-view class="import-popover"><ion-content>  <p class = "import-options" ng-click="import(0)">Import from URL</p> <p class = "import-options" ng-click="import(1)">Import from phone</p> <p class = "import-options" ng-click="import(2)">Import manually</p> </ion-content></ion-popover-view>';


  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('import-options.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  
  
  $scope.search = function() {
    $state.go('event.search');
  };

  $scope.import = function(index){
    VariableExchange.saveVariable('import', index);
  	$scope.closePopover();
  	$state.go('event.import');
  };
 
});

});


