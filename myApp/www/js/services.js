angular.module('SpoonReadMe.services', ['SpoonReadMe.keys'])

.factory('SearchService', function($http, sharedInformation) {
	return {
		search: function(query) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?", 
								{params: {'query': query }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});
		},

		filter: function(query, diet, cuisine, allergy, kind, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			var diet = diet.join();
			var cuisine = cuisine.join();
			var allergy = allergy.join();
			var kind = kind.join();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false", 
								{params: {'cuisine' : cuisine, 'diet' : diet, 'intolerances': allergy, 'maxCalories': calMax, 'maxCarbs': carbMax, 'maxFat': fatMax, 'maxProtein': proteinMax, 'minCalories': calMin, 'minCarbs': carbMin, 'minFat': fatMin, 'minProtein': proteinMin, 'query': query, 'type': kind }}).then(
				function(payload) {
					var recipes = payload.data;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});
		}, 

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

		instructions: function(id) {
			$http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();

			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/analyzedInstructions", 
								{params: {'stepBreakdown': true }}).then(
				function(payload) {
					var recipes = payload.data[0].steps;
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});			
		}
	}
})

// {params: {'cuisine' : cuisine, 'diet' : diet, 'intolerances': allergy, 'maxCalories': calMax, 'maxCarbs': carbMax, 'maxFat': fatMax, 'maxProtein': proteinMax, 'minCalories': calMin, 'minCarbs': carbMin, 'minFat': fatMin, 'minProtein': proteinMin, 'query': query, 'type': kind }}).then(
// query, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax, diet, cuisine, allergy, kind


.factory('RecipeDetails', function(SearchService, $http) {
	var searchPayLoad;
	var searchDetails;
	var searchInstructions;

	return {
		getFromSearch: function(query) {
			return SearchService.search(query).then(function (results) {
				searchPayLoad = results;
				return searchPayLoad;
			});
		},

		getFromSearchFiltered: function(query, diet, cuisine, allergy, kind, calMin, calMax, carbMin, carbMax, fatMin, fatMax, proteinMin, proteinMax) {
			return SearchService.filter(query, diet, cuisine, allergy, kind, proteinMax).then(function(results) {
				searchPayLoad = results;
				return searchPayLoad;
			});
		},

		getRecipes: function(savedOrSearch) {
			if (savedOrSearch == 'search') {
				return searchPayLoad;
			}
			else return 4;
		},

		getDetails: function(id) {
			return SearchService.details(id).then(function (results) {
				searchDetails = results 
				return searchDetails;
			})
		},
		getInstructions: function(id) {
			return SearchService.instructions(id).then(function (results) {
				searchInstructions = results;
				return searchInstructions;
			})
		}


	};

})