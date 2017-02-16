angular.module('SpoonReadMe.services', ['SpoonReadMe.keys'])

.factory('SearchService', function($http, sharedInformation) {
	return {
		//Search with no filters only the query provided
		search: function(query) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?", 
								{params: {'query': query, 'instructionsRequired': true, 'number' : 100 }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
					return "error";
				});
		},
		//Filtered search with filters ticked off
		filter: function(query, diet, cuisine, allergy, kind, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			var diet = diet.join();
			var cuisine = cuisine.join();
			var allergy = allergy.join();
			var kind = kind.join();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false", 
								{params: {'cuisine' : cuisine, 'number': 20, 'diet' : diet, 'instructionsRequired': true, 'intolerances': allergy, 'maxCalories': calMax, 'maxCarbs': carbMax, 'maxFat': fatMax, 'maxProtein': proteinMax, 'minCalories': calMin, 'minCarbs': carbMin, 'minFat': fatMin, 'minProtein': proteinMin, 'query': query, 'type': kind }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});
		}, 
		//Returns Recipe details
		details: function(id) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information", 
								{params: {'includeNutrition': true }}).then(
				function(information) {
					var details = information.data;
					return details;
				},
				function(error) {
					console.log("Error", error.status);
				});
		},
		//Returns recipe data imported from a website or blog
		import: function(url){
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?", 
								{params: {'forceExtraction': true, 'url' : url }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});
		}
	}
})

.factory('StorageService', function($http, $localstorage) {
	var savedRecipes = $localstorage.getObject('savedRecipes');
	var importedRecipes = $localstorage.getObject('importedRecipes');


	return {
		getSavedRecipes: function(from) {
			if (from == 'neither'){
				importedRecipes = $localstorage.getObject('importedRecipes');
				if (importedRecipes.length > 0) return importedRecipes;
			}
			else {
				savedRecipes = $localstorage.getObject('savedRecipes');
				if (savedRecipes.length > 0) return savedRecipes;
			}
			
		},

		removeSavedRecipe: function(recipe, from) {
			if (from == 'neither'){
				importedRecipes.splice(importedRecipes.indexOf(recipe), 1);
				$localstorage.setObject('importedRecipes', importedRecipes);
			}
			else {
				savedRecipes.splice(savedRecipes.indexOf(recipe), 1);
				$localstorage.setObject('savedRecipes', savedRecipes);
			}
			
		},

		saveRecipe: function(recipe, from) {
			if (from == 'neither'){
				importedRecipes.push(recipe);
				$localstorage.setObject('importedRecipes', importedRecipes);
			}
			else{
				savedRecipes.push(recipe);
				$localstorage.setObject('savedRecipes', savedRecipes);
			}
			
		},

		alreadySaved: function(recipe, from) {
			if (from == 'neither'){
				importedRecipes = $localstorage.getObject('importedRecipes');
			
			for(var i = 0; i < importedRecipes.length; i++){
				if(importedRecipes[i].id == recipe.id) {
					return 1;
				}
			}
			return 0;
		}
			
			else {
				savedRecipes = $localstorage.getObject('savedRecipes');
			
			for(var i = 0; i < savedRecipes.length; i++){
				if(savedRecipes[i].id == recipe.id) {
					return 1;
				}
			}
			return 0;
			}
			
		}
	}
})

.factory('RecipeDetails', function(SearchService, StorageService, $http) {
	var searchPayLoad;
	var searchDetails;
	var saved;

	return {
		getFromSearch: function(query) {
			return SearchService.search(query).then(function (results) {
				searchPayLoad = results;
				return searchPayLoad;
			});
		},

		getFromSearchFiltered: function(query, diet, cuisine, allergy, kind, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax) {
			return SearchService.filter(query, diet, cuisine, allergy, kind, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax).then(function(results) {
				searchPayLoad = results;
				return searchPayLoad;
			});
		},

		getRecipes: function(savedOrSearch) {
			if (savedOrSearch == 'search') {
				return searchPayLoad;
			}
			else if (savedOrSearch == 'saved' || savedOrSearch == 'neither'){
				saved = StorageService.getSavedRecipes(savedOrSearch);
				return saved;
			}
		},

		getDetails: function(id) {
			return SearchService.details(id).then(function (results) {
				searchDetails = results; 
				return searchDetails;
			})
		}

	};

})


.factory('Settings', function($localstorage) {
	var savedPace;
	var savedVoice;
	var savedGuide;

	var paceOptions = [{ name: "100%", value: 1.0 }, 
                  { name: "90%", value: 0.9 }, 
                  { name: "80%", value: 0.8 }, 
                  { name: "70%", value: 0.7 },
                  { name: "60%", value: 0.6 }];

    var voiceOptions = [{ name: "English - United Kingdom", value: 'en-GB' }, 
                  { name: "English - United States", value: 'en-US' }];

	var guideOptions = [{ name: "Still open guide every time", value: false }, 
                  { name: "Don't open guide every time", value: true }];



	var defaultPace = $localstorage.getObject('defaultPace');

	var defaultVoice = $localstorage.getObject('defaultVoice');

	var defaultGuide = $localstorage.getObject('defaultGuide');


	$localstorage.setObject('defaultPace', paceOptions[1]);
	$localstorage.setObject('defaultVoice', voiceOptions[0]);
	$localstorage.setObject('defaultGuide', guideOptions[0]);

		return {
		getSavedSetting: function(setting) {

			if (setting == 'pace'){
				savedPace = $localstorage.getObject('savedPace');
				defaultPace = $localstorage.getObject('defaultPace');
				if (savedPace.length > 0){
					if(savedPace[0].value != defaultPace.value)
					return savedPace[0];
				} 
				return defaultPace;
			}

			else if(setting == 'voice'){
				savedVoice = $localstorage.getObject('savedVoice');

				defaultVoice = $localstorage.getObject('defaultVoice');
				if (savedVoice.length > 0){
					if(savedVoice[0].value != defaultVoice.value)
					return savedVoice[0];
				} 
				return defaultVoice;
			}

			else if(setting == 'guide'){
				savedGuide = $localstorage.getObject('savedGuide');

				// savedGuide.splice(savedGuide.indexOf(0), 1);
				// $localstorage.setObject('savedGuide', savedGuide);

				defaultGuide = $localstorage.getObject('defaultGuide');
				if (savedGuide.length > 0){
					if(savedGuide[0].value != defaultGuide.value)
					return savedGuide[0];
				} 
				return defaultGuide;
			}
				
		},

		getDefaultPace: function(){
				defaultPace = $localstorage.getObject('defaultPace');
				if (defaultPace) return defaultPace;
				else console.log("can't");
		},

		saveNewSetting: function(setting, newValue){

			if(setting == 'pace'){
				var paceArray = [];
				paceArray.push(newValue);

				$localstorage.setObject('savedPace', paceArray);
			}

			else if(setting == 'voice'){
				var voiceArray = [];
				voiceArray.push(newValue);

				$localstorage.setObject('savedVoice', voiceArray);
			}

			else if(setting == 'guide'){
				var guideArray = [];
				guideArray.push(newValue);

				$localstorage.setObject('savedGuide', guideArray);
			}
				
		}
	}

})

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },

    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },

    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },

    removeItem: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);
