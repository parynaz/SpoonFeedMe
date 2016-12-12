angular.module('SpoonReadMe.services', ['SpoonReadMe.keys'])

.factory('SearchService', function($http, sharedInformation) {
	return {
		//Search with no filters only the query provided
		search: function(query) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?", 
								{params: {'query': query, 'number' : 100 }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
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
								{params: {'cuisine' : cuisine, 'number': 20, 'diet' : diet, 'intolerances': allergy, 'maxCalories': calMax, 'maxCarbs': carbMax, 'maxFat': fatMax, 'maxProtein': proteinMax, 'minCalories': calMin, 'minCarbs': carbMin, 'minFat': fatMin, 'minProtein': proteinMin, 'query': query, 'type': kind }}).then(
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

	return {
		getSavedRecipes: function() {
			savedRecipes = $localstorage.getObject('savedRecipes');
			if (savedRecipes.length > 0) return savedRecipes;
		},

		removeSavedRecipe: function(recipe) {
			savedRecipes.splice(savedRecipes.indexOf(recipe), 1);
			$localstorage.setObject('savedRecipes', savedRecipes);
		},

		saveRecipe: function(recipe) {
			for(var i = 0; i < savedRecipes.length; i++){
				if(savedRecipes[i].title == recipe.title) {
					alert ("Recipe already saved!");
					return;
				}
			}
			savedRecipes.push(recipe);
			$localstorage.setObject('savedRecipes', savedRecipes);
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
			else if (savedOrSearch == 'saved'){
				saved = StorageService.getSavedRecipes();
				return saved;
			}
		},

		getDetails: function(id) {
			return SearchService.details(id).then(function (results) {
				searchDetails = results 
				return searchDetails;
			})
		}

	};

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
