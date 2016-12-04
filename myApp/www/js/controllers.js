// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services', 'ionic.utils', 'angularjs-dropdown-multiselect'])


//Custom FUNCTIONS
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $stateParams, $state) {
   ionic.Platform.ready(function() {
      $scope.recognition = new SpeechRecognition();
    })
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

})

.controller('HomeCtrl', function($scope, $state, SearchService) {
  $scope.$on("$ionicView.beforeEnter", function() {
  $scope.import = function() {
    $state.go('event.import');
  }
  $scope.search = function() {
    $state.go('event.search');
  };
 
});
})


.controller('SearchCtrl', function($scope, $ionicLoading, $ionicPopup, $window, RecipeDetails) {
$scope.result = "";

  //triggered on filter button click
  $scope.showPopup = function() {
  $scope.diets_model = [];
  $scope.diets = [
  {id: 'Pescetarian', label: 'Pescetarian','name': 'Pescetarian', 'selected': false},
  {id: 'Lacto Vegetarian', label: 'Lacto Vegetarian','name': 'Lacto Vegetarian', 'selected': false},
  {id: 'Ovo Vegetarian', label: 'Ovo Vegetarian', 'name': 'Ovo Vegetarian', 'selected': false},
  {id: 'Vegan', label: 'Vegan', 'name': 'Vegan', 'selected': false},
  {id: 'Paleo', label: 'Paleo', 'name': 'Paleo', 'selected': false},
  {id: 'Primal', label: 'Primal', 'name': 'Primal', 'selected': false},
  {id: 'Vegetarian', label: 'Vegetarian', 'name': 'Vegetarian', 'selected': false}
  ];

  $scope.dietssettings = {
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    buttonClasses: 'filterBtn',
    smartButtonMaxItems: 2
  };

  $scope.cuisines_model =[];
  $scope.cuisines = [
  {id: 'African', label: 'Africa', 'name': 'African', 'selected': false},
  {id: 'Chinese', label: 'Chinese', 'name': 'Chinese', 'selected': false},
  {id: 'Japanese', label: 'Japanese', 'name': 'Japanese', 'selected': false},
  {id: 'Korean', label: 'Korean', 'name': 'Korean', 'selected': false},
  {id: 'Vietnamese', label: 'Vietnamese', 'name': 'Vietnamese', 'selected': false},
  {id: 'Thai', label: 'Thai', 'name': 'Thai', 'selected': false},
  {id: 'Indian', label: 'Indian', 'name': 'Indian', 'selected': false},
  {id: 'British', label: 'British', 'name': 'British', 'selected': false},
  {id: 'Irish', label: 'Irish', 'name': 'Irish', 'selected': false},
  {id: 'French', label: 'French', 'name': 'French', 'selected': false},
  {id: 'Italian', label: 'Italian', 'name': 'Italian', 'selected': false},
  {id: 'Mexican', label: 'Mexican', 'name': 'Mexican', 'selected': false},
  {id: 'Spanish', label: 'Spanish', 'name': 'Spanish', 'selected': false},
  {id: 'Middle Eastern', label: 'Middle Eastern', 'name': 'Middle Eastern', 'selected': false},
  {id: 'Jewish', label: 'Jewish', 'name': 'Jewish', 'selected': false},
  {id: 'American', label: 'American', 'name': 'American', 'selected': false},
  {id: 'Cajun', label: 'Cajun', 'name': 'Cajun', 'selected': false},
  {id: 'Southern', label: 'Southern', 'name': 'Southern', 'selected': false},
  {id: 'Greek', label: 'Greek', 'name': 'Greek', 'selected': false},
  {id: 'German', label: 'German', 'name': 'German', 'selected': false},
  {id: 'Nordic', label: 'Nordic', 'name': 'Nordic', 'selected': false},
  {id: 'Eastern European', label: 'Eastern European', 'name': 'Eastern European', 'selected': false},
  {id: 'Caribbean', label: 'Caribbean', 'name': 'Caribbean', 'selected': false},
  {id: 'Latin American', label: 'Latin American', 'name': 'Latin American', 'selected': false}
  ];

$scope.allergies_model=[];
 $scope.allergies = [
  {id: 'Dairy', label: 'Dairy', 'name': 'Dairy', 'selected': false},
  {id: 'Egg', label: 'Egg', 'name': 'Egg', 'selected': false},
  {id: 'Gluten', label: 'Gluten', 'name': 'Gluten', 'selected': false},
  {id: 'Peanut', label: 'Peanut', 'name': 'Peanut', 'selected': false},
  {id: 'Sesame', label: 'Sesame', 'name': 'Sesame', 'selected': false},
  {id: 'Seafood', label: 'Seafood', 'name': 'Seafood', 'selected': false},
  {id: 'Shellfish', label: 'Shellfish', 'name': 'Shellfish', 'selected': false},
  {id: 'Soy', label: 'Soy', 'name': 'Soy', 'selected': false},
  {id: 'Sulfite', label: 'Sulfite', 'name': 'Sulfite', 'selected': false},
  {id: 'Tree Nut', label: 'Tree Nut', 'name': 'Tree Nut', 'selected': false},
  {id: 'Wheat', label: 'Wheat', 'name': 'Wheat', 'selected': false}
  ];

$scope.kinds_model = [];
  $scope.kinds = [
  {id: 'Main Course', label: 'Main Course', 'name': 'Main Course', 'selected': false},
  {id: 'Side Dish', label: 'Side Dish', 'name': 'Side Dish', 'selected': false},
  {id: 'Dessert', label: 'Dessert', 'name': 'Dessert', 'selected': false},
  {id: 'Appetizer', label: 'Appetizer', 'name': 'Appetizer', 'selected': false},
  {id: 'Salad', label: 'Salad', 'name': 'Salad', 'selected': false},
  {id: 'Bread', label: 'Bread', 'name': 'Bread', 'selected': false},
  {id: 'Breakfast', label: 'Breakfast', 'name': 'Breakfast', 'selected': false},
  {id: 'Soup', label: 'Soup', 'name': 'Soup', 'selected': false},
  {id: 'Beverage', label: 'Beverage', 'name': 'Beverage', 'selected': false},
  {id: 'Sauce', label: 'Sauce', 'name': 'Sauce', 'selected': false},
  {id: 'Drink', label: 'Drink', 'name': 'Drink', 'selected': false}
  ];

  $scope.calories = {
    min: 0,
    max: 10000
  };

  $scope.carbs ={
    min: 0,
    max: 10000
  };

  $scope.fat = {
    min: 0,
    max: 10000
  };

  $scope.protein = {
    min: 0,
    max: 10000
  };

  $scope.selectedDiet = [];
  $scope.selectedCuisine = [];
  $scope.selectedAllergy = [];
  $scope.selectedKind = [];
  $scope.filterOption = false;

  //custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/filter.html',
    title: 'Filter Results',
    subTitle: 'Do it',
    scope: $scope,
    buttons: [
    {text: 'Cancel'},
    {text: '<b>Save Filters</b>',
    type: 'button-positive',
    onTap: function(e) {
      //Probably want to do some refresh thing??
        
      if ($scope.diets_model.length > 0 || 
            $scope.cuisines_model.length > 0 || 
              $scope.allergies_model.length > 0 || 
                $scope.kinds_model.length > 0 ||
                  $scope.calories.min > 0 || $scope.calories.max < 10000 ||
                    $scope.carbs.min > 0 || $scope.carbs.max < 10000 ||
                      $scope.fat.min > 0 || $scope.fat.max < 10000 ||
                        $scope.protein.min > 0 || $scope.protein.max < 10000)
        $scope.filterOption = true;

      for(var i = 0; i < $scope.diets_model.length; i++){
        $scope.selectedDiet.push($scope.diets_model[i].id);
      }
    
      for(var i = 0; i < $scope.cuisines_model.length; i++){
        $scope.selectedCuisine.push($scope.cuisines_model[i].id);
      }

      for(var i = 0; i < $scope.allergies_model.length; i++){
        $scope.selectedAllergy.push($scope.allergies_model[i].id);
      }

      for(var i = 0; i < $scope.kinds_model.length; i++){
        $scope.selectedKind.push($scope.kinds_model[i].id);
      }
    }
  }
  ]
  });

  myPopup.then(function(res) {
    console.log('Pressed!');
  });

  }

  $scope.getRecipe = function(query) {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

    if($scope.filterOption == true){
      RecipeDetails.getFromSearchFiltered(query, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind, $scope.calories.min, $scope.calories.max, $scope.carbs.min, $scope.carbs.max, $scope.fat.min, $scope.fat.max, $scope.protein.min, $scope.protein.max).then(function(data){
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

.controller('ImportCtrl', function($scope, $ionicLoading, $sce, SearchService) {
$scope.walkthroughHTML = false;
var steps = [];
 $scope.import = function(query) {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

  SearchService.import(query).then(function(data){
    $scope.result = data;
    $scope.img = data.imageUrls[0];
    $scope.instructions = $sce.trustAsHtml(data.instructions);
    var steps = data.text.split(".");
    $scope.steps = steps;
    $ionicLoading.hide();
  });
}

$scope.walkthrough = function(){
    $scope.currentStepNum = 1;
    $scope.currentStep = ($scope.steps[$scope.currentStepNum - 1]);
    $scope.maxStepNum = $scope.steps.length;
    $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
    $scope.max = ($scope.maxStepNum / $scope.maxStepNum) * 100; 
    $scope.walkthroughHTML = true;  
    $scope.recognition.onresult = $scope.handleVoiceInput;
    console.log("started listening");
    $scope.recognition.start();
}
$scope.nextStep = function() {
      if ($scope.currentStepNum < $scope.maxStepNum) {
        $scope.currentStepNum += 1;
        $scope.currentStep = $scope.steps[$scope.currentStepNum - 1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
      }
}

$scope.prevStep = function() {
      if ($scope.currentStepNum > 1) {
        $scope.currentStepNum -= 1;
        $scope.currentStep = $scope.steps[$scope.currentStepNum - 1];
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