angular.module('SpoonReadMe', ['ionic', 'SpoonReadMe.controllers', 'SpoonReadMe.services'])

//IONIC FUNCTIONS DO NOT TOUCH
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})


//Custom FUNCTIONS
.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('event', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
     .state('event.donate', {
      url: "/donate",
      views: {
        'menuContent' :{
          templateUrl: "templates/donate.html",
          controller: "DonateCtrl"
        }
      }
    })
    .state('event.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('event.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: "SearchCtrl"
        }
      }
    })
    .state('event.import', {
      url: "/import",
      views: {
        'menuContent' :{
          templateUrl: "templates/import.html",
          controller: "ImportCtrl"
        }
      }
    })
    .state('event.saved', {
      url: "/saved",
      views: {
        'menuContent' :{
          templateUrl: "templates/saved.html",
          controller: "SavedCtrl"
        }
      }
    })

    .state('event.saved-details', {
      url: "/saved/:recipeId/:fromSavedOrSearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/recipe-detail.html",
          controller: "RecipeDetailsCtrl"
        }
      }
    })

    .state('event.search-detail', {
      url: "/search/:recipeId/:fromSavedOrSearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/recipe-detail.html",
          controller: "RecipeDetailsCtrl"
        }
      }
    })

    .state('event.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: "SettingsCtrl"
        }
      }
    })

    .state('event.help', {
      url: "/help",
      views: {
        'menuContent' :{
          templateUrl: "templates/help.html",
          controller: "HelpCtrl"
        }
      }
    });
  
  $urlRouterProvider.otherwise("/event/home");
});

