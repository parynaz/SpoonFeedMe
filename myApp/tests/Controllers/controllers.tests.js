describe('Controllers', function(){
	var scope;
	var ionicLoadingMock;
	var recipeDetailsMock = {};

	// Mock recipe payload
    var payload = [{"name": "Mock Recipe", 
        "ingredients": ["First Ingredient", 
                        "Second Ingredient", 
                        "Third Ingredient"], 
        "url": "http://mockurl.com", 
        "servings": "6 servings", 
        "time": "30 Min", 
        "imgUrl": "http://mockimgurl.com", 
        "instructions": ["Step One", 
                        "Step Two"]}]


	beforeEach(module('SpoonReadMe.controllers', function($provide){
		$provide.value('RecipeDetails', recipeDetailsMock);
	}));

	//controller is mock object
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ionicLoadingMock = jasmine.createSpyObj('$ionicLoading', ['show', 'hide']);
		$contoller('SearchCtrl', 
			{$scope: scope,
				$ionicLoading: ionicLoadingMock,
					RecipeDetails: recipeDetailsMock});
	}));

	//Test 1
	describe('test getRecipes()', function(){
		var deferredSearchResults;

		beforeEach(inject(function(_$rootScope_, $q) {
			deferredSearchResults = $q.defer();
			recipeDetailsMock.getFromSearch = jasmine.createSpy().and.returnValue(deferredSearchResults.promise);

			$rootScope = _$rootScope_;
			result = scope.getRecipes('dummySearchTerms');
		}));

		it('if successful, should set scope.result to be the search results', function(){
			deferredSearchResults.promise.then(function(results) {
				expect(scope.result).toBe(payload);

				expect(ionicLoadingMock.hide).toHaveBeenCalled();
			});

			deferredSearchResults.resolve(payload);
			$rootScope.$digest();
		});

	});
});