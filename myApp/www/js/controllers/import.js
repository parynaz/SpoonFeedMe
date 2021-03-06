// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')

.controller('ImportCtrl', function($scope, Upload, $timeout, $ionicLoading, $state, $ionicPopup, $window, $ionicTabsDelegate, $ionicScrollDelegate, $sce, $location, $anchorScroll, SearchService, StorageService, Settings, VariableExchange, FileReader) {



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
 
  // destory the banner at startup
  admob.destroyBannerView();
 
  // request an interstitial
//  admob.requestInterstitialAd();
  }

  runads();

});

$scope.$on("$ionicView.beforeEnter", function() {

  $scope.fileUploaded = false;
  $scope.errorUploading = false;
  $scope.notPastedAnything = false;
  $scope.importComplete = false;
  $scope.importdata = {'pastedRecipe': ''};

  var index = VariableExchange.getSavedValue('import');

  if(index === -1 || index === 0){
    $ionicTabsDelegate.select(0);
  }

  else $ionicTabsDelegate.select(index);

  VariableExchange.deleteSavedValue('import');

});


//MANUAL TAB

//Labels
$scope.recipe = {'title': '', 'servings': '', 'time': ''};
$scope.descriptionAdditions = [];
$scope.descriptionChoicesHolder = [];
$scope.descriptionChoicesHolder.length += 1;
$scope.description = {'label': '', 'value': ''};

//Ingredients
$scope.ingredientAdditions = [];
$scope.ingredientChoicesHolder = [];
$scope.ingredientChoicesHolder.length += 1;
$scope.ingredient = {'name': '', 'originalString': '', 'image': ''};

//Instructions
$scope.stepAdditions = [];
$scope.stepChoicesHolder = [];
$scope.stepChoicesHolder.length += 1;
$scope.step = {'number': '', 'step': ''};
$scope.lastStepNum = 0;



  $scope.addNewChoice = function(type) {

    //label
    if(type == "label"){
      if($scope.description.label !== '' && $scope.description.value !== ''){
        $scope.descriptionAdditions.push({'label': $scope.description.label, 'value': $scope.description.value});
        $scope.description.label = '';
        $scope.description.value = '';
      }
      
    }
    //Ingredient
    else if(type == "ingredient"){
      if($scope.ingredient.name !== '' && $scope.ingredient.amount !== ''){
        $scope.ingredientAdditions.push({'name': $scope.ingredient.name, 'originalString': $scope.ingredient.originalString, 'image': 'https://s21.postimg.org/q7wgz4vl3/491421_636x393.jpg'});
        $scope.ingredient.name = '';
        $scope.ingredient.originalString = '';
      }
      
    }
    //Instruction
    else if(type == "step"){
      if($scope.step.step !== ''){
        $scope.lastStepNum++;
        $scope.stepAdditions.push({'number': $scope.lastStepNum, 'step': $scope.step.step});
        $scope.step.step = '';
      }
    }

  };
    
  $scope.removeChoice = function(type, item) {
    //label
    if(type == "label"){
      for(var i = 0; i < $scope.descriptionAdditions.length; i++){
        if($scope.descriptionAdditions[i] == item)
        $scope.descriptionAdditions.splice(i, 1);
      }
    }
    //Ingredient
    else if(type == "ingredient"){
      for(var y = 0; y < $scope.ingredientAdditions.length; y++){
        if($scope.ingredientAdditions[y] == item)
        $scope.ingredientAdditions.splice(y, 1);
    }
  }
    //Instruction
    else if(type == "step"){
      for(var x = 0; x < $scope.stepAdditions.length; x++){
        if($scope.stepAdditions[x] == item){
          //change the number sequence of all numbers downwards unless last item
          if($scope.stepAdditions.length > 1){
            for(var y = 1; y < $scope.stepAdditions.length - x; y++){
               $scope.stepAdditions[x + y].number -= 1;
            }
            $scope.lastStepNum --;
          }

          //if last item, reset last number
          else $scope.lastStepNum = 0;
          $scope.stepAdditions.splice(x, 1);
          
        }
      }
    }
  };


  $scope.moveStepUp = function(item){
    //Get index (have to like this because index doesn't get updated with removals)
    var index; 

    for(var x = 0; x < $scope.stepAdditions.length; x++){
        if($scope.stepAdditions[x] == item){
          index = x;
        }
      }

    //Hold on to the step it wants to replace
    var holder = $scope.stepAdditions[index - 1].step;

    //Move item up
    $scope.stepAdditions[index - 1].step = $scope.stepAdditions[index].step;

    //Move holder down
    $scope.stepAdditions[index].step = holder;
  };

  $scope.moveStepDown = function(item){
    //Get index (have to like this because index doesn't get updated with removals)
    var index; 

    for(var x = 0; x < $scope.stepAdditions.length; x++){
        if($scope.stepAdditions[x] == item){
          index = x;
        }
      }

    //Hold on to the step it wants to replace
    var holder = $scope.stepAdditions[index + 1].step;

    //Move item down
    $scope.stepAdditions[index + 1].step = $scope.stepAdditions[index].step;

    //Move holder down
    $scope.stepAdditions[index].step = holder;

  };

  //RESET
  $scope.reset = function(){
    $scope.recipe.title = '';
    $scope.recipe.servings = '';
    $scope.recipe.time = '';

    $scope.description.label = '';
    $scope.description.value = '';
    $scope.descriptionAdditions = [];
    
    $scope.ingredientAdditions = [];
    $scope.ingredient.name = '';
    $scope.ingredient.originalString = '';

    $scope.stepAdditions = [];
    $scope.step.step = '';
  };


  $scope.saveConfirmation = function(){
    var savedPopup = $ionicPopup.show({
    templateUrl: "templates/save-confirmation.html",
    title: 'Success!',
    subTitle: 'Your recipe has been saved',
    scope: $scope,
    buttons: [
    {text: '<b>Okay</b>',
    type: 'button-positive',
    onTap: function(e) {
      //do nothing
    }
  }
  ]
  });

  savedPopup.then(function() {
    var manualDelegateNumber = 2;
    VariableExchange.saveVariable('saved', manualDelegateNumber);
    $state.go('event.saved');
  });
  };


  //SAVE ALL INFORMATION AND REDIRECT
  $scope.save = function(){
    $scope.saveResult = {'importedManually': 'yes', 'image': '', 'readyInMinutes': '', 'servings': '', 'labels': [], 'ingredients': [], 'title': '', 'steps': []};

    $scope.saveResult.image = 'https://s21.postimg.org/q7wgz4vl3/491421_636x393.jpg'; //default
    $scope.saveResult.title = $scope.recipe.title;
    $scope.saveResult.readyInMinutes = $scope.recipe.time;
    $scope.saveResult.servings = $scope.recipe.servings;


    for(var i = 0; i < $scope.descriptionAdditions.length; i++){
      $scope.saveResult.labels[i] = $scope.descriptionAdditions[i];
    }

    for(var i = 0; i < $scope.ingredientAdditions.length; i++){
      $scope.saveResult.ingredients[i] = $scope.ingredientAdditions[i];    }

    for(var i = 0; i < $scope.stepAdditions.length; i++){
      $scope.saveResult.steps[i] = $scope.stepAdditions[i].step;
    }
    
    StorageService.saveRecipe($scope.saveResult, 'neither');

    $scope.saveConfirmation();
  }

//IMPORT FROM PHONE OPTION
$scope.saveFileImported = function(){

  if(!$scope.f.name.includes('.txt')){
              $scope.errorMsg = "Please choose a plain text file (.txt)";
              $scope.errorUploading = true;
              $scope.fileUploaded = false;
              return;
  }

      var fileContent = $scope.fileSrc.replace(/\r?\n|\r/g, ',').toLowerCase();

        var parameter = '';

        parameter = 'ingredients';

        var ingredientLocation = fileContent.search(parameter) + parameter.length + 1;

        parameter = 'instructions';

        var instructionLocation = fileContent.search(parameter);

        var stepLocation;

        if(instructionLocation != null){
          //found instructions
          stepLocation = instructionLocation + parameter.length + 1;
        }
        else{
          alert("no instructions found");
          return;
        }

        var ingredients= fileContent.substring(ingredientLocation, instructionLocation - 1).split(',');

        var steps = fileContent.substring(stepLocation, fileContent.length - 1).replace(/\d+\./g, '').split(',');

  
        //Labels
        $scope.recipe.title = $scope.f.name;
        $scope.recipe.servings = "N/A";
        $scope.recipe.readyInMinutes = "N/A";

        var num = 0;
        //Ingredients
        for(var i = 0; i < ingredients.length; i++){
          if(ingredients[i] !== ""){
            var ingredient = {'name': '', 'originalString': '', 'image': ''};
            ingredient.image = 'https://s21.postimg.org/q7wgz4vl3/491421_636x393.jpg'; //default
            ingredient.name = "Ingredient" + (num + 1);
            ingredient.originalString = ingredients[i];

            $scope.ingredientAdditions.push(ingredient);
            num++; 
          }
        }

        num = 0;
        //Instructions
         for(var i = 0; i < steps.length; i++){
          if(steps[i] !== ""){
            var step = {'number': '', 'step': ''};
            step.step = steps[i];

            $scope.stepAdditions.push(step);
            num++;
          }
        }
}


$scope.askPermission = function(){
    var permissions = cordova.plugins.permissions;
  permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);

function checkPermissionCallback(status) {
  if(!status.hasPermission) {
    var errorCallback = function() {
      console.warn('File access permission is not turned on');
    }

    permissions.requestPermission(
      permissions.READ_EXTERNAL_STORAGE,
      function(status) {
        if(!status.hasPermission) errorCallback();
      },
      errorCallback);
  }
} 
}

$scope.readFile = function(data){
$scope.file = data;

$scope.progress = 0;

FileReader.readAsText($scope.file, $scope)
                      .then(function(result) {
                          $scope.fileSrc = result;
                          $scope.saveFileImported();
                      });
};
 
 $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
  });


$scope.uploadFiles = function(file, errFiles){

   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });
  


  $scope.f = file;
  $scope.errFile = errFiles && errFiles[0];
  if($scope.errFile != null){
    $scope.errorUploading = true;
    $scope.fileUploaded = false;
    $ionicLoading.hide();
  } 
  if(file){
    file.upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {file: file}
    });

    file.upload.then(function(response){
      $timeout(function(){
        file.result = response.data;
        $scope.readFile(file); 
        if(!$scope.f.name.includes('.txt')){
              $scope.errorMsg = "Please choose a plain text file (.txt)";
              $scope.errorUploading = true;
              $scope.fileUploaded = false;
              $ionicLoading.hide();
        }
        else{
          $scope.fileUploaded = true;
          $scope.errorUploading = false;
          $scope.importComplete = true;
          $ionicLoading.hide();
        }
        
      });
    }, function(response) {
        if(response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
        else{
          if(!$scope.f.name.includes('.txt')){
              $scope.errorMsg = "Please choose a plain text file (.txt)";
              $scope.errorUploading = true;
              $scope.fileUploaded = false;
              $ionicLoading.hide();
            }
            else{
              $scope.fileUploaded = true;
              $scope.errorUploading = false;
              $scope.importComplete = true;
              $ionicLoading.hide();
            }
        
        }
    }, function(evt){
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });


  }
          $ionicLoading.hide();


};


$scope.importPasted = function(){
  var initialHeaders = 135;

  if ($scope.importdata.pastedRecipe.length <= initialHeaders) $scope.notPastedAnything = true;
  else{
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });
  

      //Labels
      $scope.recipe = {'title': '', 'servings': '', 'time': ''};
      $scope.descriptionAdditions = [];
      $scope.description = {'label': '', 'value': ''};

      //Ingredients
      $scope.ingredientAdditions = [];
      $scope.ingredient = {'name': '', 'originalString': '', 'image': ''};

      //Instructions
      $scope.stepAdditions = [];
      $scope.step = {'number': '', 'step': ''};
      $scope.lastStepNum = 0;

      var pastedArray = $scope.importdata.pastedRecipe.replace(/\r?\n|\r/g, '');

      var parameter = '';

      parameter = 'Title:';

        var titleLocation = pastedArray.search(parameter);
        titleLocation += parameter.length;

        parameter = 'Servings:';

        var servingLocation = pastedArray.search(parameter);
        $scope.recipe.title = pastedArray.substring(titleLocation, servingLocation);

        servingLocation += parameter.length;
        parameter = 'Time Required:';

        var timeLocation = pastedArray.search(parameter);

        $scope.recipe.servings = pastedArray.substring(servingLocation, timeLocation);
        
        console.log($scope.recipe);
        $ionicLoading.hide();
      }

}

$scope.$on("$ionicView.beforeLeave", function() {

  $scope.recognition.abort();      
  console.log("stopped listening");

  window.plugins.insomnia.allowSleepAgain();
});




//SETTINGS
$scope.pace = Settings.getSavedSetting('pace').value;
$scope.spokenVoice = Settings.getSavedSetting('voice').value;
$scope.walkthroughHTML = false;
$scope.imported = false;
$scope.fromSavedOrSearch = 'neither';


//HELP
$scope.guideOptions = [{ name: "Still open guide every time", value: false }, 
                  { name: "Don't open guide every time", value: true }];


$scope.guideMeNot = Settings.getSavedSetting('guide').value;
$scope.guideUnchecked = !$scope.guideMeNot
$scope.guideChecked = $scope.guideMeNot;

$scope.help = function(){

  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/help-popup.html',
    title: 'Voice Guide',
    subTitle: 'List of words you can say',
    scope: $scope,
    buttons: [
    {text: '<b>Got it</b>',
    type: 'button-positive',
    onTap: function(e) {
    }
  }
  ]
  });

  myPopup.then(function() {
    
  });

  }

$scope.changeGuide = function(selected){

    var objectToSave;

    for(var i = 0; i < $scope.guideOptions.length; i++){
      if(selected == $scope.guideOptions[i].value)
        objectToSave = $scope.guideOptions[i];
    }

    $scope.guideUnchecked = !selected;
    $scope.guideChecked = selected;

    Settings.saveNewSetting('guide', objectToSave);
  }


//Error handling


  $scope.errorHandler = function(){

  //Pop up for error handling
    var errorPopup = $ionicPopup.show({
    templateUrl: "templates/importerror.html",
    title: 'SOMETHING WENT WRONG',
    scope: $scope,
    buttons: [
    {text: '<b>Okay</b>',
    type: 'button-positive',
    onTap: function(e) {
      //do nothing
    }
  }
  ]
  });

  };


var steps = [];
 $scope.import = function(query) {
      //close the keyboard
  cordova.plugins.Keyboard.close();

 window.plugins.insomnia.keepAwake();

  
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

  $scope.sourceUrl = query;

  SearchService.import(query).then(function(data){
    $scope.result = data;

    if(data == "error"){
          $ionicLoading.hide();
          $scope.errorHandler();
    }

    else{
      //saved or not
    $scope.activateOFF = true;
    $scope.activateON = false;

    if(StorageService.alreadySaved($scope.result, $scope.fromSavedOrSearch) === 0){
        $scope.notSaved = true;
        $scope.saved = false;
      }
    else{
         $scope.notSaved = false;
         $scope.saved = true;
      }


    $scope.img = data.imageUrls[0];
    $scope.instructions = $sce.trustAsHtml(data.instructions);
    var steps = data.text.split(".");

    $scope.imported=true;


    $scope.servings = $scope.result.servings;
    $scope.timeRequired = $scope.result.readyInMinutes;

    $scope.supplies = $scope.result.extendedIngredients;

    //Won't show any details that aren't rendered
    if (!$scope.result.sourceName)
      $scope.result.sourceName = "Go to Source";

    $scope.sourceName = $scope.result.sourceName;


//fix the steps
steps.splice((steps.length) - 1, 1);

$scope.steps = [];

for(var i=0; i < steps.length; i++){
  $scope.steps[i] = steps[i].replace(/[^0-9a-zA-Z_]p[^0-9a-zA-Z_]/g, '').replace(/[^0-9a-zA-Z_]HTML[^0-9a-zA-Z_]/g, '').replace(/\s\s+/g, ' ').replace(/[^-0-9a-zA-Z:_\/\s]/g, '');
}

var string;
  for(var i = 0; i < $scope.supplies.length; i++){
    string = $scope.supplies[i].originalString; //turn into string
    name = $scope.supplies[i].name;
    amount = $scope.supplies[i].amount.toString();

    if (string.includes(name)){
      $scope.supplies[i].originalString = string.replace(name, '');
    }

    if ($scope.supplies[i].originalString === "") {
       $scope.supplies[i].originalString = amount + " " + $scope.supplies[i].unit;
    }
       

    var original = $scope.supplies[i].originalString;
    $scope.supplies[i].unitShort = original.replace($scope.supplies[i].unit, $scope.supplies[i].unitLong);

  }

    $ionicLoading.hide();

    if($scope.guideMeNot === false){
            $scope.help();
    }

    }
    
  });
}

$scope.openSource = function(){
  cordova.InAppBrowser.open($scope.sourceUrl, '_self','heigth=600,width=600');
}
//Will execute when user presses walkthrough button
$scope.activateVoiceInstructions = function() {


  if($scope.activateOFF == false && $scope.activateON == true){
    ionic.Platform.ready(function() {
      $scope.recognition = new SpeechRecognition();
    })
  }
      //if user is turning off activation of voice do not continue
  else if($scope.activateOFF == true && $scope.activateON == false){
      $scope.recognition.abort();      
      console.log("stopped listening");
    return;    
  }   
  
  //set the location.hash to the id of the element you wish to scroll to


  $location.hash('progress');

  //call anchorscroll
  $anchorScroll();

$scope.speaking = false;
$scope.listening = false;
      
      $scope.getSteps();
            
      var text = "Hello. Please say Read to begin";
      var pace = $scope.pace;
      window.TTS.speak({
        text: text,
        locale: $scope.spokenVoice,
        rate: pace
      }, function() {
        $scope.recognition.onresult = $scope.handleVoiceInput;
        console.log("started listening");
        $scope.recognition.start();
        $scope.recognition.mutedelay();
        $scope.listening = true;
        $scope.$apply();
      }, function(reason) {
        alert(reason);
      });
  
}


$scope.getSteps = function() {
  $scope.currentStepNum = 1;
  $scope.currentStep = ($scope.steps[$scope.currentStepNum - 1]);
  $scope.maxStepNum = $scope.steps.length;
  $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
  $scope.max = ($scope.maxStepNum / $scope.maxStepNum) * 100;
}

$scope.nextStep = function() {
  if ($scope.currentStepNum < $scope.maxStepNum) {
        $scope.currentStepNum += 1;
        $scope.currentStep = $scope.steps[$scope.currentStepNum - 1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
      }
      else if ($scope.currentStepNum == $scope.maxStepNum){
        $scope.done = true;
      }
  $ionicScrollDelegate.scrollBottom();
}

$scope.prevStep = function() {
  if ($scope.currentStepNum > 1) {
        $scope.currentStepNum -= 1;
        $scope.currentStep = $scope.steps[$scope.currentStepNum - 1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
      }
    $ionicScrollDelegate.scrollBottom();
}

$scope.voice = function() {
      var text = $scope.currentStep;
      var pace = $scope.pace;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: $scope.spokenVoice,
        rate: pace
      }, function() {
        $scope.recognition.start();
        $scope.recognition.mute(); //mute the sound after voice
        $scope.speaking = false;
        $scope.listening = true;
        $scope.$apply();
      }, function(reason) {
        alert(reason);
      });


}

$scope.voiceCustom= function(text){
      var text = text;
      var pace = $scope.pace;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: $scope.spokenVoice,
        rate: pace
      }, function() {
        $scope.recognition.start();
        $scope.recognition.mute(); //mute the sound after voice
        $scope.speaking = false;
        $scope.listening = true;
        $scope.$apply();
      }, function(reason) {
        console.log("something wrong");
        alert(reason);
      });
}



$scope.voiceIngredients= function(ingredients){
      var ingredientsString = ingredients.toString();

      var text = ingredientsString;
      var pace = $scope.pace;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: $scope.spokenVoice,
        rate: pace
      }, function() {
        $scope.recognition.start();
        $scope.recognition.mute(); //mute the sound after voice
        $scope.speaking = false;
        $scope.listening = true;
        $scope.$apply();
      }, function(reason) {
        console.log("something wrong");
        alert(reason);
      });
}

$scope.isThisIncluded = function(heardValue){
  var ingredients = [];
  var ingredient;
  var ingredientWords = [];
  var amount;
  var string;
  var foundSomething = false;


      for(var i = 0; i < $scope.supplies.length; i++){

          ingredient = $scope.supplies[i].name.toUpperCase();
          heardValue = heardValue.toUpperCase();
          ingredientWords = ingredient.split(" ");
          amount = $scope.supplies[i].unitShort;

          //if they say "how much" exact ingredient
          if (heardValue.includes("HOW MUCH " + ingredient) || 
              heardValue.includes("HOW MUCH " + ingredient + "s") ||
              heardValue.includes("HOW MANY " + ingredient) || 
              heardValue.includes("HOW MANY " + ingredient + "s")) {
                      string = amount + " " + ingredient;
                      ingredients.push(string);
                      $scope.ingredientsList = ingredients;
                      foundSomething = true;
                      }

          else{
                  for(var y = 0; y < ingredientWords.length; y++){
                      if ((heardValue.includes("HOW MUCH " + ingredientWords[y])) ||
                         (heardValue.includes("HOW MUCH " + ingredientWords[y] + "s")) ||
                         (heardValue.includes("HOW MANY " + ingredientWords[y])) ||
                         (heardValue.includes("HOW MANY " + ingredientWords[y] + "s"))) {
                              
                      string = amount + " " + "of " + ingredient;
                      ingredients.push(string);
                      $scope.ingredientsList = ingredients;
                      foundSomething = true;
                      }
                    }
              }
        } 

      //make sure to return empty ingredient if not found
      $scope.ingredientsList = ingredients;
      return foundSomething;
}


$scope.handleVoiceInput = function(event) {

  var step;
  var num;
  var ingredients = [];
  var currentstep;
  var ingredient;
  var ingredientWords = [];
  var amount;
  var string;

      if (event.results.length > 0) {  
        console.log("HEARD SOMETHING");
        var heardValue = event.results[0][0].transcript;
        if (heardValue == "next" || heardValue.includes("next")) {
          $scope.nextStep();

          if ($scope.done == true){
              step = $scope.currentStep;
              num = $scope.currentStepNum;
              $scope.currentStepNum = "*";
              $scope.currentStep = "You are done!";
          }

          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();

          if ($scope.done == true){
              $scope.currentStep = step;
              $scope.currentStepNum = num;
              $scope.done = false;
          }

        } 
        else if ((heardValue == "back") ||
                 (heardValue == "previous") || 
                  (heardValue.includes("back")) ||
                    (heardValue.includes("previous"))) {
          $scope.prevStep();
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        } 
        else if ((heardValue == "read") || (heardValue == "repeat") || (heardValue.includes("read")) || (heardValue.includes("repeat"))) {
          $scope.recognition.stop();
          $scope.speaking = true;
          $scope.listening = false;
          $scope.voice();
          $scope.$apply();
        }
        else if ((heardValue == "finish") || (heardValue == "quit") || (heardValue == "stop")) {
          $scope.activateVoice(); 
          $scope.$apply();
          $scope.recognition.abort(); 
          console.log("stopped llistening");
        }
        //How much of a certain ingredient

        else if ($scope.isThisIncluded(heardValue)) {

          var ingredients = $scope.ingredientsList;

          if (ingredients.length > 0){
            //remove duplicates
            for(var x = 0 ; x < ingredients.length; x++){
                for(var y = x+1; y < ingredients.length ; y++){
                  if(ingredients[x] == ingredients[y])
                    ingredients.splice(x, 1);
                }
              }

            
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voiceIngredients(ingredients);
          $scope.$apply();
          }
          else{
          var string = "Sorry, please look up ingredient manually";
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voiceCustom(string);
          $scope.$apply();
          }

        }

        else if ((heardValue == "how much") || (heardValue == "how many")) {

          for(var i = 0; i < $scope.supplies.length; i++){
            currentstep = $scope.currentStep.toUpperCase();
            ingredient = $scope.supplies[i].name.toUpperCase();
            ingredientWords = ingredient.split(" ");
            amount = $scope.supplies[i].unitShort;

            //check for duplicates

            if (currentstep.includes(ingredient)) {
                string = amount + " " + ingredient;
                ingredients.push(string);
            }

            else{
              for(var y = 0; y < ingredientWords.length; y++){
              if ((currentstep.includes(" " + ingredientWords[y])) || (currentstep.includes(" " + ingredientWords[y] + "s"))) {
                  
                  string = amount + " " + "of " + ingredient;
                  //check for duplicates
              
              ingredients.push(string);
            }

          }
            }    
            
          }

          if (ingredients.length > 0){
            //remove duplicates
            for(var x = 0 ; x < ingredients.length; x++){
                for(var y = x+1; y < ingredients.length ; y++){
                  if(ingredients[x] == ingredients[y])
                    ingredients.splice(x, 1);
                }
              }
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voiceIngredients(ingredients);
          $scope.$apply();
          }
          else{
          var string = "Sorry, please look up ingredient manually";
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voiceCustom(string);
          $scope.$apply();
          }
            
}
        else {
          var string = "Sorry, please say that again";
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voiceCustom(string);
          $scope.$apply();
        }
          
}
}

$scope.iconChange = function() {
  if($scope.speaking == false && $scope.listening == true){
    $scope.speaking = true;
    $scope.listening = false;
  }     
  else {
    $scope.speaking = false;
    $scope.listening = true;
  }

  $scope.$apply();
}

$scope.saveRecipe = function() {
  if(StorageService.alreadySaved($scope.result, $scope.fromSavedOrSearch) == 0){
    StorageService.saveRecipe($scope.result, $scope.fromSavedOrSearch);
  }
}

$scope.savedRecipe = function() {
  if($scope.notSaved == true && $scope.saved == false){
    $scope.notSaved = false;
    $scope.saved = true;
  }     
}


$scope.activateVoice = function() {
  if($scope.activateOFF == true && $scope.activateON == false){
    $scope.activateOFF = false;
    $scope.activateON = true;
  }     
  else {
    $scope.activateOFF = true;
    $scope.activateON = false;
  }
}





});