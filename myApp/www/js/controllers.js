// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//This is angular's way of creating an application; we are telling to include the ionic module which includes all of the ionic code
//that will process the tags for the side menu 
angular.module('SpoonReadMe.controllers', ['ionic', 'SpoonReadMe.services'])


//Custom FUNCTIONS
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
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

})


.controller('RecipeDetailsCtrl', function($scope, $stateParams, RecipeDetails) {
$scope.recipeId = $stateParams.recipeId;
$scope.fromSavedOrSearch = $stateParams.fromSavedOrSearch;
var payload = RecipeDetails.getRecipes($scope.fromSavedOrSearch).results[$scope.recipeId];

$scope.recipe = payload;

//payload is the specific Recipe
//get extra information
RecipeDetails.getDetails(payload.id).then(function(detailPayload){
  $scope.details = detailPayload;0
  });


  $scope.getSteps = function() {
    RecipeDetails.getInstructions($scope.details.id).then(function(InstructionPayload){
          $scope.instructions = InstructionPayload;
});
}


})

.controller('SavedCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});


