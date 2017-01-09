// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services', 'ionic.utils', 'angularjs-dropdown-multiselect', 'infinite-scroll'])


//Custom FUNCTIONS
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $stateParams, $state) {
   // ionic.Platform.ready(function() {
   //    $scope.recognition = new SpeechRecognition();
   //  })
  
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


.controller('SearchCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $window, RecipeDetails) {
  //The results to be rendered
  $scope.result = "";
  $scope.searchResultsReturned = false;
  $scope.numberOfResults = 0;

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

  //close the keyboard
  //cordova.plugins.Keyboard.close();

    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

    if($scope.filterOption == true){
      RecipeDetails.getFromSearchFiltered(query, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind, $scope.calories.min, $scope.calories.max, $scope.carbs.min, $scope.carbs.max, $scope.fat.min, $scope.fat.max, $scope.protein.min, $scope.protein.max).then(function(data){
        $scope.result = data.results;
        $scope.getRecipeDetails($scope.result, "filter");
        $scope.searchResultsReturned = true;
        $scope.numberOfResults = data.totalResults;
        $scope.query = query;
        $ionicLoading.hide();
      })
    }else 

  RecipeDetails.getFromSearch(query).then(function(data){
    $scope.result = data.results;
    $scope.getRecipeDetails($scope.result, "nofilter");
    $scope.searchResultsReturned = true;
    $scope.numberOfResults = data.totalResults;
    $scope.query = query;
    $ionicLoading.hide();
  });
}

//For query only searches; the images need to have url added to them
//Also some recipes don't have images so default image added for these
$scope.getRecipeDetails = function(recipe, from) {

var substring = "https://spoonacular.com/recipeImages/";

  for(var i = 0; i < recipe.length; i++){
    if (from == "nofilter" && recipe[i].imageUrls.length == 0){
      recipe[i].image = "https://static.pexels.com/photos/3329/food-kitchen-cutting-board-cooking.jpg";
    }
    else if (from == "filter"){
      recipe[i].resultsdetails = "Calories: " + recipe[i].calories;
      var stringID = recipe[i].id;
      recipe[i].image = (substring + stringID + '-636x393.jpg'); 
    }
    else if (from == "nofilter"){
      recipe[i].resultsdetails = "Time Required: " + recipe[i].readyInMinutes;
      var stringID = recipe[i].id;
      recipe[i].image = (substring + stringID + '-636x393.jpg'); 
      }
      
    }

  }


})


.controller('RecipeDetailsCtrl', function($scope, $stateParams, $location, $anchorScroll, $ionicLoading, $state, $timeout, RecipeDetails, StorageService, Settings) {

//SETTINGS

$scope.pace = Settings.getSavedPace().value;


$scope.fixSteps = function(steps){

//fix the steps
steps.splice((steps.length) - 1, 1);

$scope.steps = [];


for(var i=0; i < steps.length; i++){
  $scope.steps[i] = steps[i].replace(/[^0-9a-zA-Z_]p[^0-9a-zA-Z_]/g, '').replace(/[^0-9a-zA-Z_]HTML[^0-9a-zA-Z_]/g, '').replace(/\s\s+/g, ' ').replace(/[^0-9a-zA-Z_\/\s]/g, '');
      console.log("after");
}



var string;

  for(var i = 0; i < $scope.supplies.length; i++){
    string = $scope.supplies[i].originalString; //turn into string
    name = $scope.supplies[i].name;
    amount = $scope.supplies[i].amount.toString();

    if (string.includes(name)){
      // $scope.supplies[i].originalString = string.replace(name, '').replace(/[^\w\s\\]/gi, '');
      $scope.supplies[i].originalString = string.replace(name, '');

      if ($scope.supplies[i].originalString == "") {
        $scope.supplies[i].originalString = amount + " " + $scope.supplies[i].unit;
      } 
    }

    var original = $scope.supplies[i].originalString;
    $scope.supplies[i].unitShort = original.replace($scope.supplies[i].unit, $scope.supplies[i].unitLong);

  }

}

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
  payload = RecipeDetails.getRecipes('search').results[$scope.recipeId];

}
//if from saved; will have to look in local storage
else if($scope.fromSavedOrSearch == 'saved'){
  payload = RecipeDetails.getRecipes('saved')[$scope.recipeId];
}

//if from saved; will have to look in local storage
else {
  payload = RecipeDetails.getRecipes('neither')[$scope.recipeId];
}

  $scope.recipe = payload;

//for imported will just be the same as payload
if($scope.fromSavedOrSearch == 'neither'){
          $scope.image = payload.imageUrls[0];
           steps = payload.text.split(".");
            
          $scope.servings = payload.servings;
          $scope.timeRequired = payload.readyInMinutes;
          $scope.supplies = payload.extendedIngredients;

          //Won't show any details that aren't rendered
          if (!payload.sourceName)
            payload.sourceName = "Go to Source";
            
            $scope.sourceName = payload.sourceName;

          //fix the steps
          $scope.fixSteps(steps);

          $ionicLoading.hide();
  }  

else if($scope.fromSavedOrSearch == 'saved' || $scope.fromSavedOrSearch == 'search'){
    RecipeDetails.getDetails(payload.id, $scope.fromSavedOrSearch).then(function(detailPayload){
    

          $scope.details = detailPayload; 
          $scope.image = payload.image;

          $scope.servings = $scope.details.servings;
          $scope.timeRequired = $scope.details.readyInMinutes;

          $scope.calories = Math.round($scope.details.nutrition.nutrients[0].amount);
          $scope.fat = Math.round($scope.details.nutrition.nutrients[1].amount);
          $scope.protein = Math.round($scope.details.nutrition.nutrients[7].amount);
          $scope.carbs = Math.round($scope.details.nutrition.nutrients[3].amount);
          $scope.supplies = $scope.details.extendedIngredients;

          //Won't show any details that aren't rendered
          if (!$scope.details.sourceName)
             $scope.details.sourceName = "Go to Source";
          
          $scope.sourceName = $scope.details.sourceName;

          // if($scope.fromSavedOrSearch == 'searchWithFilters'){ //minor difference
          //   var instructions = [];
          //   var step;
          //   for(var i = 0; i < $scope.details.analyzedInstructions; i++){
          //     for(var x = 0; x < $scope.details.analyzedInstructions[i].steps)
          //     step = $scope.details.analyzedInstructions[i].steps[x].step;
          //     instructions.push(step);
          //   }

            $scope.instructions = $scope.details.instructions;
          

          steps = $scope.instructions.split(".");

          //fix the steps
          $scope.fixSteps(steps);

          $ionicLoading.hide();

});
}

$scope.voiceCustom= function(text){
      var text = text;
      var pace = $scope.pace;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: 'en-GB',
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
        locale: 'en-GB',
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
}

$scope.prevStep = function() {
      if ($scope.currentStepNum > 1) {
        $scope.currentStepNum -= 1;
        $scope.currentStep = $scope.steps[$scope.currentStepNum - 1];
        $scope.percentageThrough = ($scope.currentStepNum / $scope.maxStepNum) * 100;
      }
}

$scope.voice= function(){
      var text = $scope.currentStep;
      var pace = 0.9;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: 'en-GB',
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
        locale: 'en-GB',
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
        if (heardValue == "next") {
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
        else if ((heardValue == "back") || (heardValue == "previous")) {
          $scope.prevStep();
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        } 
        else if ((heardValue == "read") || (heardValue == "repeat")) {
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        }
        else if ((heardValue == "finish") || (heardValue == "quit")) {
          $scope.activateVoice(); 
          $scope.$apply();
          $scope.recognition.abort(); 
          console.log("stopped llistening");
        }

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

        //How much of a certain ingredient
        else if ((heardValue == "how much") || (heardValue == "how many")) {
          

        for(var i = 0; i < $scope.supplies.length; i++){
            currentstep = $scope.currentStep;
            ingredient = $scope.supplies[i].name;
            ingredientWords = ingredient.split(" ");
            //amount = $scope.supplies[i].originalString;
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

$scope.saveRecipe = function(recipe) {
  if(StorageService.alreadySaved(recipe, $scope.fromSavedOrSearch) == 0){
    StorageService.saveRecipe(recipe, $scope.fromSavedOrSearch);
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


$scope.$on('$ionicView.beforeEnter', function() {
  $scope.activateOFF = true;
  $scope.activateON = false;

      if($scope.fromSavedOrSearch == 'search' && StorageService.alreadySaved($scope.recipe, $scope.fromSavedOrSearch) == 0){
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

.controller('ImportCtrl', function($scope, $ionicLoading, $sce, $location, $anchorScroll, SearchService, StorageService, Settings) {
//SETTINGS
$scope.pace = Settings.getSavedPace().value;
$scope.walkthroughHTML = false;
$scope.imported = false;
$scope.fromSavedOrSearch = 'neither';

var steps = [];
 $scope.import = function(query) {
      //close the keyboard
  cordova.plugins.Keyboard.close();
  
    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

  SearchService.import(query).then(function(data){
    $scope.result = data;


    //saved or not
    $scope.activateOFF = true;
    $scope.activateON = false;

    if(StorageService.alreadySaved($scope.result, $scope.fromSavedOrSearch) == 0){
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
  $scope.steps[i] = steps[i].replace(/[^0-9a-zA-Z_]p[^0-9a-zA-Z_]/g, '').replace('-', ' ').replace(/[^0-9a-zA-Z_]HTML[^0-9a-zA-Z_]/g, '').replace(/\s\s+/g, ' ').replace(/[^0-9a-zA-Z_\/\s]/g, '');
}

var string;
  for(var i = 0; i < $scope.supplies.length; i++){
    string = $scope.supplies[i].originalString; //turn into string
    name = $scope.supplies[i].name;
    amount = $scope.supplies[i].amount.toString();

    if (string.includes(name)){
      $scope.supplies[i].originalString = string.replace(name, '');
      if ($scope.supplies[i].originalString == "") $scope.supplies[i].originalString = amount + " " + $scope.supplies[i].unit;

    }

    var original = $scope.supplies[i].originalString;
    $scope.supplies[i].unitShort = original.replace($scope.supplies[i].unit, $scope.supplies[i].unitLong);

  }



    $ionicLoading.hide();
  });
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
        locale: 'en-GB',
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
      var pace = $scope.pace;
      $scope.recognition.unmute();
      window.TTS.speak({
        text: text,
        locale: 'en-GB',
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
        locale: 'en-GB',
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
        locale: 'en-GB',
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
        if (heardValue == "next") {
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
        else if ((heardValue == "back") || (heardValue == "previous")) {
          $scope.prevStep();
          $scope.recognition.stop();
          $scope.iconChange();
          $scope.voice();
          $scope.$apply();
        } 
        else if ((heardValue == "read") || (heardValue == "repeat")) {
          $scope.recognition.stop();
          $scope.speaking = true;
          $scope.listening = false;
          $scope.voice();
          $scope.$apply();
        }
        else if ((heardValue == "finish") || (heardValue == "quit")) {
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
  else
      alert('Already Saved!');
}

$scope.savedRecipe = function() {
  if($scope.notSaved == true && $scope.saved == false){
    $scope.notSaved = false;
    $scope.saved = true;
  }     
  else 
    alert("Already saved nig!");
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
  $scope.showDelete == false; 

  $scope.savedON = true;
  $scope.savedOFF = false;

  $scope.importedON = false;
  $scope.importedOFF = true;

  $scope.$on("$ionicView.beforeEnter", function() {
    $scope.saved = StorageService.getSavedRecipes('saved');
    $scope.imported = StorageService.getSavedRecipes('neither');
  });


  $scope.savedRecipes = function(){
    $scope.buttonChange();
    $scope.apply();
  }

  $scope.importedRecipes = function(){
    $scope.buttonChange();
    $scope.apply();
  }

$scope.buttonChange = function() {
  if($scope.savedON == true && $scope.importedON == false){
    //on imported recipes
      $scope.savedON = false;
      $scope.savedOFF = true;

      $scope.importedON = true;
      $scope.importedOFF = false;
  }     
  else{
    //on saved recipes
      $scope.savedON = true;
      $scope.savedOFF = false;

      $scope.importedON = false;
      $scope.importedOFF = true;
  }

  $scope.$apply();
}


  $scope.removeRecipes = function(){
    if ($scope.showDelete == false)
        $scope.showDelete = true;

    else 
        $scope.showDelete = false;
  }

  $scope.remove = function(recipe){
    StorageService.removeSavedRecipe(recipe, $scope.fromSavedOrSearch);
  };
})

.controller('SettingsCtrl', function($scope, Settings) {


$scope.options = [{ name: "100%", value: 1.0 }, 
                  { name: "90%", value: 0.9 }, 
                  { name: "80%", value: 0.8 }, 
                  { name: "70%", value: 0.7 },
                  { name: "60%", value: 0.6 }];

var pace = Settings.getSavedPace(); //if previously saved a pace will load that; otherwise will load default

  for(var i = 0; i < $scope.options.length; i++){
    if (pace.value == $scope.options[i].value){
      $scope.selectedPace = $scope.options[i];
      break;
    }
      
  }

$scope.paceChanged = function(selected){
    console.log("PACECHANGED");

    var newPace = selected;

    Settings.saveNewPace(newPace);
}


})

.controller('HelpCtrl', function($scope) {

});






