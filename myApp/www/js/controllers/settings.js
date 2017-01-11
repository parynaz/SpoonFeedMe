// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')

.controller('SettingsCtrl', function($scope, Settings) {

$scope.$on('$ionicView.beforeEnter', function() {
$scope.testingOff = true;
$scope.testingOn = false;
})


$scope.paceOptions = [{ name: "100%", value: 1.0 }, 
                  { name: "90%", value: 0.9 }, 
                  { name: "80%", value: 0.8 }, 
                  { name: "70%", value: 0.7 },
                  { name: "60%", value: 0.6 }];

$scope.voiceOptions = [{ name: "English - United Kingdom", value: 'en-GB' }, 
                  { name: "English - United States", value: 'en-US' }];

$scope.guideOptions = [{ name: "Still open guide every time", value: false }, 
                  { name: "Don't open guide every time", value: true }];

var pace = Settings.getSavedSetting('pace'); //if previously saved a pace will load that; otherwise will load default
var voice = Settings.getSavedSetting('voice'); //if previously saved a voice will load that; otherwise will load default
var guide = Settings.getSavedSetting('guide'); //if previously saved a guide choice will load that; otherwise will load default

//defaulting pace
  for(var i = 0; i < $scope.paceOptions.length; i++){
    if (pace.value == $scope.paceOptions[i].value){
      $scope.selectedPace = $scope.paceOptions[i];
      break;
    }   
  }
//defaulting voice
  for(var i = 0; i < $scope.voiceOptions.length; i++){
    if (voice.value == $scope.voiceOptions[i].value){
      $scope.selectedVoice = $scope.voiceOptions[i];
      break;
    }
  }

  //defaulting guide
  for(var i = 0; i < $scope.guideOptions.length; i++){
    if (guide.value == $scope.guideOptions[i].value){
      $scope.selectedGuideChoice = $scope.guideOptions[i];
      break;
    }
  }

$scope.paceChanged = function(selected){
    var newPace = selected;
    Settings.saveNewSetting('pace', newPace);
}

$scope.voiceChanged = function(selected){
    var newVoice = selected;
    Settings.saveNewSetting('voice', newVoice);
}

$scope.guideChanged = function(selected){
    var newGuide = selected;
    Settings.saveNewSetting('guide', newGuide);
}

$scope.playVoice = function(){
var pace = Settings.getSavedSetting('pace').value;
var voice = Settings.getSavedSetting('voice').value;
$scope.testingOff = false;
$scope.testingOn = true;

      var text = "Hello. This is how I will sound when I am reading something to you.";
      
      window.TTS.speak({
        text: text,
        locale: voice,
        rate: pace
      }, function() {
          $scope.testingOff = true;
          $scope.testingOn = false;
          $scope.$apply();

      }, function(reason) {
        alert(reason);
      });
  
}

});



