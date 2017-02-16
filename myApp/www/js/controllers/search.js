// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers')


.controller('SearchCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $window, RecipeDetails) {
  //The results to be rendered
  $scope.result = "";
  $scope.searchResultsReturned = false;
  $scope.numberOfResults = 0;

  $scope.filterOptionOn = false;
  $scope.filterOptionOff = true;

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
    subTitle: 'Nutrition, Diet, Cuisine, Allergies, Meal',
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
        $scope.filterOptionOn = true;
        $scope.filterOptionOff = false;

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


  $scope.errorHandler = function(type){

    var template;

    if(type == "error") template = "templates/error.html";
    else template = "templates/empty.html";

  //Pop up for error handling
    var errorPopup = $ionicPopup.show({
    templateUrl: template,
    title: 'Something went wrong',
    subTitle: 'An error occured attempting to complete your request',
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

  myPopup.then(function() {
    //do nothing
  });
  };

  //If any filters are pressed, there will be a complex search (3 API calls)
  //If no filters are pressed, then there will be a simple recipe search (1 API call)
  $scope.getRecipe = function(query) {


  //close the keyboard
  cordova.plugins.Keyboard.close();

    $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in'
      });

  //Filtered Search
    if($scope.filterOptionOn === true){
      RecipeDetails.getFromSearchFiltered(query, $scope.selectedDiet, $scope.selectedCuisine, $scope.selectedAllergy, $scope.selectedKind, $scope.calories.min, $scope.calories.max, $scope.carbs.min, $scope.carbs.max, $scope.fat.min, $scope.fat.max, $scope.protein.min, $scope.protein.max).then(function(data){
        $scope.result = data.results;
        
        if(data == "error"){
          $ionicLoading.hide();
          $scope.errorHandler("error");
        }

        if ($scope.result === null){
          $ionicLoading.hide();
          $scope.errorHandler("empty");
        }

        else{
        $scope.getRecipeDetails($scope.result, "filter");
        $scope.searchResultsReturned = true;
        $scope.numberOfResults = data.totalResults;
        $scope.query = query;
        $ionicLoading.hide();
        }

      })

    }else

  //Query only earch
  RecipeDetails.getFromSearch(query).then(function(data){
    $scope.result = data.results;

    //Error loading results
    if(data == "error"){
      $ionicLoading.hide();
      $scope.errorHandler();
    }

   if ($scope.result === null){
      $ionicLoading.hide();
      $scope.errorHandler("empty");
    }

    else{
    $scope.getRecipeDetails($scope.result, "nofilter");
    $scope.searchResultsReturned = true;
    $scope.numberOfResults = data.totalResults;
    $scope.query = query;
    $ionicLoading.hide();
    }

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


});
