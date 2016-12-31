// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services', 'ionic.utils', 'angularjs-dropdown-multiselect', 'infinite-scroll'])


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
  //The results to be rendered
  $scope.result = "";
  $scope.searchResultsReturned = false;

  $scope.submit = function(){
      $scope.getRecipe(this.query);    
  }

  //triggered on filter button click
  //ng-model for the following filters; attached to html and will get added into filter_model array
  $scope.showPopup = function(query) {
  $scope.diets_model = [];
  $scope.diets = [
  {id: 'Pescetarian', label: 'Pescetarian','name': 'Pescetarian'},
  {id: 'Lacto Vegetarian', label: 'Lacto Vegetarian','name': 'Lacto Vegetarian'},
  {id: 'Ovo Vegetarian', label: 'Ovo Vegetarian', 'name': 'Ovo Vegetarian'},
  {id: 'Vegan', label: 'Vegan', 'name': 'Vegan'},
  {id: 'Paleo', label: 'Paleo', 'name': 'Paleo'},
  {id: 'Primal', label: 'Primal', 'name': 'Primal'},
  {id: 'Vegetarian', label: 'Vegetarian', 'name': 'Vegetarian'}
  ];

  $scope.cuisines_model =[];
  $scope.cuisines = [
  {id: 'African', label: 'Africa', 'name': 'African'},
  {id: 'Chinese', label: 'Chinese', 'name': 'Chinese'},
  {id: 'Japanese', label: 'Japanese', 'name': 'Japanese'},
  {id: 'Korean', label: 'Korean', 'name': 'Korean'},
  {id: 'Vietnamese', label: 'Vietnamese', 'name': 'Vietnamese'},
  {id: 'Thai', label: 'Thai', 'name': 'Thai'},
  {id: 'Indian', label: 'Indian', 'name': 'Indian'},
  {id: 'British', label: 'British', 'name': 'British'},
  {id: 'Irish', label: 'Irish', 'name': 'Irish'},
  {id: 'French', label: 'French', 'name': 'French'},
  {id: 'Italian', label: 'Italian', 'name': 'Italian'},
  {id: 'Mexican', label: 'Mexican', 'name': 'Mexican'},
  {id: 'Spanish', label: 'Spanish', 'name': 'Spanish'},
  {id: 'Middle Eastern', label: 'Middle Eastern', 'name': 'Middle Eastern'},
  {id: 'Jewish', label: 'Jewish', 'name': 'Jewish'},
  {id: 'American', label: 'American', 'name': 'American'},
  {id: 'Cajun', label: 'Cajun', 'name': 'Cajun'},
  {id: 'Southern', label: 'Southern', 'name': 'Southern'},
  {id: 'Greek', label: 'Greek', 'name': 'Greek'},
  {id: 'German', label: 'German', 'name': 'German'},
  {id: 'Nordic', label: 'Nordic', 'name': 'Nordic'},
  {id: 'Eastern European', label: 'Eastern European', 'name': 'Eastern European'},
  {id: 'Caribbean', label: 'Caribbean', 'name': 'Caribbean'},
  {id: 'Latin American', label: 'Latin American', 'name': 'Latin American'}
  ];

$scope.allergies_model=[];
 $scope.allergies = [
  {id: 'Dairy', label: 'Dairy', 'name': 'Dairy'},
  {id: 'Egg', label: 'Egg', 'name': 'Egg'},
  {id: 'Gluten', label: 'Gluten', 'name': 'Gluten'},
  {id: 'Peanut', label: 'Peanut', 'name': 'Peanut'},
  {id: 'Sesame', label: 'Sesame', 'name': 'Sesame'},
  {id: 'Seafood', label: 'Seafood', 'name': 'Seafood'},
  {id: 'Shellfish', label: 'Shellfish', 'name': 'Shellfish'},
  {id: 'Soy', label: 'Soy', 'name': 'Soy'},
  {id: 'Sulfite', label: 'Sulfite', 'name': 'Sulfite'},
  {id: 'Tree Nut', label: 'Tree Nut', 'name': 'Tree Nut'},
  {id: 'Wheat', label: 'Wheat', 'name': 'Wheat'}
  ];

$scope.kinds_model = [];
  $scope.kinds = [
  {id: 'Main Course', label: 'Main Course', 'name': 'Main Course'},
  {id: 'Side Dish', label: 'Side Dish', 'name': 'Side Dish'},
  {id: 'Dessert', label: 'Dessert', 'name': 'Dessert'},
  {id: 'Appetizer', label: 'Appetizer', 'name': 'Appetizer'},
  {id: 'Salad', label: 'Salad', 'name': 'Salad'},
  {id: 'Bread', label: 'Bread', 'name': 'Bread'},
  {id: 'Breakfast', label: 'Breakfast', 'name': 'Breakfast'},
  {id: 'Soup', label: 'Soup', 'name': 'Soup'},
  {id: 'Beverage', label: 'Beverage', 'name': 'Beverage'},
  {id: 'Sauce', label: 'Sauce', 'name': 'Sauce'},
  {id: 'Drink', label: 'Drink', 'name': 'Drink'}
  ];

  //ng-model for cal, carb, fat, protein filters
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

  $scope.dietssettings = {
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    buttonClasses: 'filterBtn',
    smartButtonMaxItems: 2
  };

  //custom popup
  //On save filter button click, will add any filters to selectedFilter array and make sure query will be complex search by turning on filteroption
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/filter.html',
    title: 'Filter Results',
    subTitle: 'Do it',
    scope: $scope,
    buttons: [
    {text: 'Cancel'},
    {text: '<b>Apply Filters</b>',
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

  myPopup.then(function() {
    $scope.getRecipe(query);
  });

  }

  //If any filters are pressed, there will be a complex search (3 API calls)
  //If no filters are pressed, then there will be a simple recipe search (1 API call)
  $scope.getRecipe = function(query) {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

    if($scope.filterOption == true){
      RecipeDetails.getFromSearchFiltered(query, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind, $scope.calories.min, $scope.calories.max, $scope.carbs.min, $scope.carbs.max, $scope.fat.min, $scope.fat.max, $scope.protein.min, $scope.protein.max).then(function(data){
        $scope.result = data.results;
        $scope.getRecipeImage($scope.result, "filter");
        $scope.searchResultsReturned = true;
        $ionicLoading.hide();
      })
    }else 

  RecipeDetails.getFromSearch(query).then(function(data){
    $scope.result = data.results;
    $scope.getRecipeImage($scope.result, "nofilter");

    $scope.searchResultsReturned = true;
    $ionicLoading.hide();
  });
}

//For query only searches; the images need to have url added to them
//Also some recipes don't have images so default image added for these
$scope.getRecipeImage = function(recipe, from) {
var substring = "https://spoonacular.com/recipeImages/";

  for(var i = 0; i < recipe.length; i++){
    if (from == "nofilter" && recipe[i].imageUrls.length == 0){
      recipe[i].image = "https://static.pexels.com/photos/3329/food-kitchen-cutting-board-cooking.jpg";
    }
    else {
      var stringID = recipe[i].id;
      recipe[i].image = (substring + stringID + '-636x393.jpg'); 

      //set details
      if(from == "nofilter"){
        recipe[i].resultsdetails = "Time Required: " + recipe[i].readyInMinutes;
      }
      else if(from == "filter"){
        recipe[i].resultsdetails = "Calories: " + recipe[i].calories;
      }
      
    }

  }
}

})


.controller('RecipeDetailsCtrl', function($scope, $stateParams, $location, $anchorScroll, $ionicLoading, $state, RecipeDetails, StorageService) {
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

//Won't show walkthrough panel unless turned on
$scope.instructionsNULL = false;

//Will have to split up the instructions to get steps
var steps = [];
var payload;

$scope.recipeId = $stateParams.recipeId;
//will arrive here from either saved paged or search page
$scope.fromSavedOrSearch = $stateParams.fromSavedOrSearch;

//if from search; will be getting the results
if($scope.fromSavedOrSearch == 'search'){
  payload = RecipeDetails.getRecipes($scope.fromSavedOrSearch).results[$scope.recipeId];

}
//if from saved; will have to look in local storage
else if($scope.fromSavedOrSearch == 'saved'){
  payload = RecipeDetails.getRecipes($scope.fromSavedOrSearch)[$scope.recipeId];
}

  $scope.recipe = payload;
  RecipeDetails.getDetails(payload.id).then(function(detailPayload){
  $scope.details = detailPayload;
  $scope.image = payload.image;

  $scope.servings = $scope.details.servings;
  $scope.timeRequired = $scope.details.readyInMinutes;

  $scope.calories = $scope.details.nutrition.nutrients[0].amount;
  $scope.fat = $scope.details.nutrition.nutrients[1].amount;
  $scope.protein = $scope.details.nutrition.nutrients[7].amount;
  $scope.carbs = $scope.details.nutrition.nutrients[3].amount;
  $scope.supplies = $scope.details.extendedIngredients;

  //Won't show any details that aren't rendered
  if (!$scope.details.sourceName)
    $scope.details.sourceName = "Go to Source";

  $scope.sourceName = $scope.details.sourceName;


  for(var i = 0; i < $scope.supplies.length; i++){
    if ($scope.supplies[i].amount == 0.25){
      $scope.supplies[i].amount = "1/4";
    }
    if ($scope.supplies[i].amount == 0.5){
      $scope.supplies[i].amount = "1/2";
    }
    if ($scope.supplies[i].amount == 1.25){
      $scope.supplies[i].amount = "1 and 1/4";
    }
  }


  //ADD SERVICE FOR NO INSTRUCTION SEARCHES
//   if($scope.details.instructions != null){
//       $scope.instructions = $scope.details.instructions;
//     }
//     else{
//       $scope.importRecipe = function() {
//         $state.go('event.import');
//       }
//       $scope.instructionsNULL = true;
//       var string = $scope.details.sourceUrl;
//       $scope.instructions = string;
// }

$scope.instructions = $scope.details.instructions;
//fix the steps
steps = $scope.instructions.split(".");
steps.splice((steps.length) - 1, 1);
$scope.steps = steps;


  $ionicLoading.hide();
});
//payload is the specific Recipe
//get extra information
// RecipeDetails.getDetails(payload.id).then(function(detailPayload){
//   $scope.details = detailPayload;
//   });



//Will execute when user presses walkthrough button
$scope.activateVoiceInstructions = function() {
       //set the location.hash to the id of the element you wish to scroll to
  $location.hash('progress');

  //call anchorscroll
  $anchorScroll();

$scope.speaking = false;
$scope.listening = false;
      
      $scope.getSteps();
            
      var text = "Hello. Please say Read to begin";
      var pace = 0.9;
      window.TTS.speak({
        text: text,
        locale: 'en-GB',
        rate: pace
      }, function() {
        $scope.recognition.onresult = $scope.handleVoiceInput;
        console.log("started listening");
        $scope.recognition.start();
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
      else if ($scope.currentStepNum == $scope.maxStepNum)
        $scope.currentStep = "You are done!";
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
        $scope.speaking = false;
        $scope.listening = true;
        $scope.$apply();
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
          $scope.recognition.abort();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        } 
        else if ((heardValue == "back") || (heardValue == "previous")) {
          $scope.prevStep();
          $scope.recognition.abort();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        } 
        else if ((heardValue == "read") || (heardValue == "repeat")) {
          $scope.recognition.abort();
          $scope.speaking = true;
          $scope.listening = false;
          $scope.voice();
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

$scope.saveRecipe = function(recipe) {
  if($scope.fromSavedOrSearch == 'search'){
      StorageService.saveRecipe(recipe);
      $scope.button = "Saved";
    }
  else {
    $scope.button = "Saved";
}
}

$scope.savedRecipe = function() {
  if($scope.notSaved == true && $scope.saved == false){
    $scope.notSaved = false;
    $scope.saved = true;
  }     
  else 
    alert("Already saved!");
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


$scope.$on('$ionicView.beforeEnter', function() {
  $scope.activateOFF = true;
  $scope.activateON = false;

      if($scope.fromSavedOrSearch == 'search' && StorageService.alreadySaved($scope.recipe) == 0){
        $scope.notSaved = true;
        $scope.saved = false;
      }
      else{
         $scope.notSaved = false;
         $scope.saved = true;
      };
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
$scope.imported = false;
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
    $scope.imported=true;
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
        if ($scope.currentStepNum != $scope.maxStepNum){
            $scope.currentStepNum -= 1;
        }
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
  $scope.showDelete = false;

  $scope.$on("$ionicView.beforeEnter", function() {
    $scope.saved = StorageService.getSavedRecipes();
  });

  $scope.removeRecipes = function(){
    if ($scope.showDelete == false)
        $scope.showDelete = true;

    else 
        $scope.showDelete = false;
    
  }

  $scope.remove = function(recipe){
    StorageService.removeSavedRecipe(recipe);
  };
});