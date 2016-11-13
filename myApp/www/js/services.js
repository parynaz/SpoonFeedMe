angular.module('SpoonReadMe.services', ['SpoonReadMe.keys'])

.factory('SearchService', function($http, sharedInformation) {
	return {
		search: function() {
			 $http.defaults.headers.common["X-Mashape-key"] = sharedInformation.getKey();
			return $http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1").then (
				function(payload) {
					var recipes = payload.data.recipes[0];
					return recipes;
				},
				function(error) {
					console.log("Error", error.status);
				});
		}

	}
});