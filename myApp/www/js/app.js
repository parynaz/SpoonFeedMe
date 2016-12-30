// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
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
//Has to go in parentheses: multiselectProvider
// multiselectProvider.setTemplateUrl('lib/ionic-multiselect/dist/templates/item-template.html');
// multiselectProvider.setModalTemplateUrl('lib/ionic-multiselect/dist/templates/modal-template.html');


  $stateProvider
    .state('event', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
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
        },

        'importContent' :{
          templateUrl: "templates/saved-imports.html",
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

  
  $urlRouterProvider.otherwise("/event/home");
})

