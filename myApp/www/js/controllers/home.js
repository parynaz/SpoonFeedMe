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

$scope.$on("$ionicView.afterEnter", function() {
  function runads(){
  document.addEventListener("deviceready", onDeviceReady, false);
  }
 
  function initAds() {
  if (admob) {
    var adPublisherIds = {
    ios : {
      banner : "ca-app-pub-7640666500532842/5030613410"
    },
    android : {
      banner : "ca-app-pub-7640666500532842/5030613410",
      //interstitial : "ca-app-pub-7640666500532842/3135077818"
    }
    };
 
    var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;
 
    admob.setOptions({
    publisherId:      admobid.banner,
    //interstitialAdId: admobid.interstitial,
    tappxIdiOs:       "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
    tappxIdAndroid:   "/XXXXXXXXX/Pub-XXXX-Android-AAAA",
    tappxShare:       0.5
    });
 
    registerAdEvents();
 
  } else {
    alert('AdMobAds plugin not ready');
  }
  }
 
  function onAdLoaded(e) {
  if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
   // admob.showInterstitialAd();
   // showNextInterstitial = setTimeout(function() {
   // admob.requestInterstitialAd();
   // }, 2 * 60 * 1000); // 2 minutes
  }
  }
 
  // optional, in case respond to events
  function registerAdEvents() {
  document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
  document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
  document.addEventListener(admob.events.onAdOpened, function (e) {});
  document.addEventListener(admob.events.onAdClosed, function (e) {});
  document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
  document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});
  }
 
  function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);
  initAds();
 
  // display a banner at startup
  admob.createBannerView();
 
  // request an interstitial
//  admob.requestInterstitialAd();
  }

  runads();

});

});


