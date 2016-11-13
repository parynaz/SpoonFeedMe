// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services'])


//Custom FUNCTIONS
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('HomeCtrl', function($scope, SearchService) {
  $scope.recipe = "";
  SearchService.search().then(function(data){
    $scope.recipe = data;
  });
})


.controller('SearchCtrl', function($scope, $ionicLoading, SearchService) {
  $scope.result = "";

  $scope.getRecipe = function() {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });
  SearchService.search().then(function(data){
    $scope.result = data;
    $ionicLoading.hide();
  });
}
})


.controller('SavedCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});


