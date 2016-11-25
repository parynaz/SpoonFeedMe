// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services', 'ionic.utils'])


//Custom FUNCTIONS
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $stateParams) {
   ionic.Platform.ready(function() {
      $scope.recognition = new SpeechRecognition();
    })
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})

.controller('HomeCtrl', function($scope, SearchService) {
  $scope.recipe = "";
})


.controller('SearchCtrl', function($scope, $ionicLoading, $window, RecipeDetails) {
  $scope.result = "";

  $scope.diets = [
  {'name': 'Pescetarian', 'selected': false},
  {'name': 'Lacto Vegetarian', 'selected': false},
  {'name': 'Ovo Vegetarian', 'selected': false},
  {'name': 'Vegan', 'selected': false},
  {'name': 'Paleo', 'selected': false},
  {'name': 'Primal', 'selected': false},
  {'name': 'Vegetarian', 'selected': false}
  ];

  $scope.cuisines = [
  {'name': 'African', 'selected': false},
  {'name': 'Chinese', 'selected': false},
  {'name': 'Japanese', 'selected': false},
  {'name': 'Korean', 'selected': false},
  {'name': 'Vietnamese', 'selected': false},
  {'name': 'Thai', 'selected': false},
  {'name': 'Indian', 'selected': false},
  {'name': 'British', 'selected': false},
  {'name': 'Irish', 'selected': false},
  {'name': 'French', 'selected': false},
  {'name': 'Italian', 'selected': false},
  {'name': 'Mexican', 'selected': false},
  {'name': 'Spanish', 'selected': false},
  {'name': 'Middle Eastern', 'selected': false},
  {'name': 'Jewish', 'selected': false},
  {'name': 'American', 'selected': false},
  {'name': 'Cajun', 'selected': false},
  {'name': 'Southern', 'selected': false},
  {'name': 'Greek', 'selected': false},
  {'name': 'German', 'selected': false},
  {'name': 'Nordic', 'selected': false},
  {'name': 'Eastern European', 'selected': false},
  {'name': 'Caribbean', 'selected': false},
  {'name': 'Latin American', 'selected': false}
  ];

 $scope.allergies = [
  {'name': 'Dairy', 'selected': false},
  {'name': 'Egg', 'selected': false},
  {'name': 'Gluten', 'selected': false},
  {'name': 'Peanut', 'selected': false},
  {'name': 'Sesame', 'selected': false},
  {'name': 'Seafood', 'selected': false},
  {'name': 'Shellfish', 'selected': false},
  {'name': 'Soy', 'selected': false},
  {'name': 'Sulfite', 'selected': false},
  {'name': 'Tree Nut', 'selected': false},
  {'name': 'Wheat', 'selected': false}
  ];

  $scope.kinds = [
  {'name': 'Main Course', 'selected': false},
  {'name': 'Side Dish', 'selected': false},
  {'name': 'Dessert', 'selected': false},
  {'name': 'Appetizer', 'selected': false},
  {'name': 'Salad', 'selected': false},
  {'name': 'Bread', 'selected': false},
  {'name': 'Breakfast', 'selected': false},
  {'name': 'Soup', 'selected': false},
  {'name': 'Beverage', 'selected': false},
  {'name': 'Sauce', 'selected': false},
  {'name': 'Drink', 'selected': false}
  ];

  $scope.calMin = 0;
  $scope.calMax = 10000;
  $scope.carbMin = 0;
  $scope.carbMax = 10000;
  $scope.fatMin = 0;
  $scope.fatMax = 10000;
  $scope.proteinMin = 0;
  $scope.proteinMax = 10000;

  $scope.selectedDiet = [];
  $scope.selectedCuisine = [];
  $scope.selectedAllergy = [];
  $scope.selectedKind = [];

  $scope.filterOption = false;


  $scope.addFilterArray = function(filter, array){
    var index = array.indexOf(filter.name);
    if(index == -1 && filter.selected){
      array.push(filter.name);
    } else if (!filter.selected && index != -1){
      array.splice(index, 1);
    }
  }  
 
  $scope.addFilter = function(filter, num) {
    console.log("FILTER CHANGE");
    switch (num) {
      case 1.1:
        $scope.calMin = parseInt(filter);
        break;
      case 1.2:
        $scope.calMax = parseInt(filter);
        break;
      case 2.1:
        $scope.carbMin = parseInt(filter);
        break;
      case 2.2:
        $scope.carbMax = parseInt(filter);
        break;
      case 3.1:
        $scope.fatMin = parseInt(filter);
        break;
      case 3.2:
        $scope.fatMax = parseInt(filter);
        break;
      case 4.1:
        $scope.proteinMin = parseInt(filter);
        break;
      case 4.2:
        console.log("PROTEIN");
        $scope.proteinMax = parseInt(filter);
        break;
      case 5:
        console.log("DIET");
        $scope.addFilterArray(filter, $scope.selectedDiet);
        break;
      case 6:        
      console.log("CUISINE");
        $scope.addFilterArray(filter, $scope.selectedCuisine);
        break;
      case 7:
      console.log("ALLERGY");
        $scope.addFilterArray(filter, $scope.selectedAllergy);
        break;
      case 8:
      console.log("KIND");
        $scope.addFilterArray(filter, $scope.selectedKind);
        break;
      default:
    }
    $scope.filterOption = true;

      }

  $scope.getRecipe = function(query) {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

// query, $scope.calMin, $scope.calMax, $scope.carbMin, $scope.carbMax, $scope.fatMin, $scope.fatMax, $scope.proteinMin, proteinMax, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind
// $window.location.reload(true);

    if($scope.filterOption == true){
      RecipeDetails.getFromSearchFiltered(query, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind, $scope.calMin, $scope.calMax, $scope.carbMin, $scope.carbMax, $scope.fatMin, $scope.fatMax, $scope.proteinMin, $scope.proteinMax).then(function(data){
        $scope.result = data.results;
        $ionicLoading.hide();
      })
    }else 

  RecipeDetails.getFromSearch(query).then(function(data){
    //change all the images to have the https://spoonacular.com/recipeImages at the beginning before passing it forward
    $scope.result = data.results;
    $ionicLoading.hide();
  });
}

$scope.getRecipeImage = function(recipe) {
  var substring = "https://spoonacular.com/recipeImages/";
  var string = recipe.image;

  if(string.includes(substring))
    return string;
  else
    return (substring + string);
}

})


.controller('RecipeDetailsCtrl', function($scope, $stateParams, RecipeDetails, StorageService) {
$scope.recipeId = $stateParams.recipeId;
console.log("id = ", $scope.recipeId);
$scope.fromSavedOrSearch = $stateParams.fromSavedOrSearch;

if($scope.fromSavedOrSearch == 'search'){
  var payload = RecipeDetails.getRecipes($scope.fromSavedOrSearch).results[$scope.recipeId];
}
else if($scope.fromSavedOrSearch == 'saved'){
  var payload = RecipeDetails.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
}

$scope.recipe = payload;

//payload is the specific Recipe
//get extra information
RecipeDetails.getDetails(payload.id).then(function(detailPayload){
  $scope.details = detailPayload;
  });


  $scope.getSteps = function() {
    RecipeDetails.getInstructions($scope.details.id).then(function(InstructionPayload){
          $scope.instructions = InstructionPayload;

//fix the steps
for(var i = 0; i < $scope.instructions.length; i++){
  var step = $scope.instructions[i].step.replace('.1.', '.')
                                        .replace('.2.', '.')
                                        .replace('.3.', '.')
                                        .replace('.4.', '.')
                                        .replace('.5.', '.')
                                        .replace('.6.', '.')
                                        .replace('.7.', '.')
                                        .replace('.8.', '.')
                                        .replace('.9.', '.')
                                        .replace('.10.', '.');
  $scope.instructions[i].step = step;
}


          //Voice Control stuff

$scope.currentStepNum = 1;
$scope.currentStep = ($scope.instructions[$scope.currentStepNum - 1].step);
$scope.maxStepNum = $scope.instructions.length;
$scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
$scope.max = ($scope.maxStepNum / $scope.maxStepNum) * 100;

  $scope.recognition.onresult = $scope.handleVoiceInput;
      console.log("started listening");

  $scope.recognition.start();

});
}




$scope.nextStep = function() {
  if ($scope.currentStepNum < $scope.maxStepNum) {
    $scope.currentStepNum += 1;
    $scope.currentStep = $scope.instructions[$scope.currentStepNum - 1].step;
    $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
  }
}

$scope.prevStep = function() {
  if ($scope.currentStepNum > 1) {
    $scope.currentStepNum -= 1;
    $scope.currentStep = $scope.instructions[$scope.currentStepNum - 1].step;
    $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
  }
}

$scope.voice = function() {
  var text = $scope.currentStep;
  var pace = 0.9;
  window.TTS.speak({
    text: text,
    locale: 'en-GB',
    rate: pace
  }, function() {
    $scope.recognition.start();
  }, function(reason) {
    alert(reason);
  });
}


$scope.handleVoiceInput = function(event) {
  if (event.results.length > 0) {  
    console.log("HEARD SOMETHING");
    var heardValue = event.results[0][0].transcript;
    if (heardValue == "next") {
      $scope.nextStep();
      $scope.$apply();
    } else if ((heardValue == "back") || (heardValue == "previous")) {
      $scope.prevStep();
      $scope.$apply();
    } else if ((heardValue == "read") || (heardValue == "repeat")) {
      $scope.recognition.abort();
      $scope.voice();
    }
  }
}


$scope.saveRecipe = function(recipe) {
  if($scope.fromSavedOrSearch == 'search'){
      StorageService.saveRecipe(recipe);
      $scope.button = "Saved";
    }
  else {
    $scope.button = "Saved";
    alert("Already saved!");
}
}

$scope.$on('$ionicView.beforeEnter', function() {
      if($scope.fromSavedOrSearch == 'search'){
        $scope.button = "Click to Save";
      }
      else $scope.button = "Saved";
});

$scope.$on("$ionicView.enter", function() {
  window.plugins.insomnia.keepAwake();

});

$scope.$on("$ionicView.beforeLeave", function() {

  $scope.recognition.abort();      
  console.log("stopped listening");

  window.plugins.insomnia.allowSleepAgain();
});


})

.controller('SavedCtrl', function($scope, StorageService) {
  $scope.$on("$ionicView.beforeEnter", function() {
    $scope.saved = StorageService.getSavedRecipes();
  });

  $scope.remove = function(recipe){
    StorageService.removeSavedRecipe(recipe);
  };
});