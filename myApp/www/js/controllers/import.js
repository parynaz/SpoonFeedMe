// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')

.controller('ImportCtrl', function($scope, $ionicLoading, $state, $ionicPopup, $ionicTabsDelegate, $ionicScrollDelegate, $sce, $location, $anchorScroll, SearchService, StorageService, Settings, VariableExchange) {



$scope.$on("$ionicView.beforeEnter", function() {

  var index = VariableExchange.getSavedValue('import');

  if(index === -1 || index === 0){
    $ionicTabsDelegate.select(0);
  }

  else $ionicTabsDelegate.select(index);

  VariableExchange.deleteSavedValue('import');

});


$scope.descriptionChoices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.descriptionChoices.length+1;
    $scope.descriptionChoices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.descriptionChoices.length-1;
    $scope.descriptionChoices.splice(lastItem);
  };



$scope.$on("$ionicView.enter", function() {
  window.plugins.insomnia.keepAwake();

});

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

          ingredient = $scope.supplies[i].name;
          ingredientWords = ingredient.split(" ");
          amount = $scope.supplies[i].unitShort;

          //if they say "how much" exact ingredient
          if (heardValue.includes("how much " + ingredient) || 
              heardValue.includes("how much " + ingredient + "s") ||
              heardValue.includes("how many " + ingredient) || 
              heardValue.includes("how many " + ingredient + "s")) {
                      string = amount + " " + ingredient;
                      ingredients.push(string);
                      $scope.ingredientsList = ingredients;
                      foundSomething = true;
                      }

          else{
                  for(var y = 0; y < ingredientWords.length; y++){
                      if ((heardValue.includes("how much " + ingredientWords[y])) ||
                         (heardValue.includes("how much " + ingredientWords[y] + "s")) ||
                         (heardValue.includes("how many " + ingredientWords[y])) ||
                         (heardValue.includes("how many " + ingredientWords[y] + "s"))) {
                              
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

                console.log(ingredients);
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
            currentstep = $scope.currentStep;
            ingredient = $scope.supplies[i].name;
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