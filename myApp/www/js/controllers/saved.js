// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')


.controller('SavedCtrl', function($scope, StorageService) {
  $scope.showDelete == false; 

  $scope.$on("$ionicView.beforeEnter", function() {
    $scope.saved = StorageService.getSavedRecipes('saved');
    $scope.imported = StorageService.getSavedRecipes('neither');
  });



  $scope.removeRecipes = function(){
    if ($scope.showDelete == false)
        $scope.showDelete = true;

    else 
        $scope.showDelete = false;
  }

  $scope.remove = function(recipe, from){
    StorageService.removeSavedRecipe(recipe, from);
  };
});