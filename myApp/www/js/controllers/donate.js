angular.module('SpoonReadMe.controllers')

.controller('DonateCtrl', function($scope) {


$scope.buttonPay = function(){

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

var value1 = "_s-xclick";
var value2 = "ANHC628KKRFR8";


var pageContent = '<html><head></head><body><form id="loginForm" action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<input type="hidden" name="cmd" value="' + value1 + '">' +
'<input type="hidden" name="hosted_button_id" value="' + value2 + '">' +
'</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

var browserRef = window.cordova.InAppBrowser.open(
    pageContentUrl ,
    "_blank",
    "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
);
};

});



