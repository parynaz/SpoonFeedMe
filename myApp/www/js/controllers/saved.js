// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')


.controller('SavedCtrl', function($scope, StorageService) {
  $scope.showDelete == false; 

  $scope.savedON = true;
  $scope.savedOFF = false;

  $scope.importedON = false;
  $scope.importedOFF = true;

  $scope.$on("$ionicView.beforeEnter", function() {
    $scope.saved = StorageService.getSavedRecipes('saved');
    $scope.imported = StorageService.getSavedRecipes('neither');
  });


  $scope.savedRecipes = function(){
    $scope.buttonChange();
    $scope.apply();
  }

  $scope.importedRecipes = function(){
    $scope.buttonChange();
    $scope.apply();
  }

$scope.buttonChange = function() {
  if($scope.savedON == true && $scope.importedON == false){
    //on imported recipes
      $scope.savedON = false;
      $scope.savedOFF = true;

      $scope.importedON = true;
      $scope.importedOFF = false;
  }     
  else{
    //on saved recipes
      $scope.savedON = true;
      $scope.savedOFF = false;

      $scope.importedON = false;
      $scope.importedOFF = true;
  }

  $scope.$apply();
}


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