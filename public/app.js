var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/home.html',
		controller: 'MainController'
	});
	$stateProvider.state('posts', {
		url: '/posts/{id}',
		templateUrl: '/posts.html',
		controller: 'PostsController'
	});
	$urlRouterProvider.otherwise('home');
}]);

app.factory('postFactory', [function(){
	var o = { posts: [] }
	return o;
}]);

app.controller('MainController', ['$scope', 'postFactory', function($scope, postFactory){

	$scope.posts = postFactory.posts;

	$scope.addPost = function(){
		if(!$scope.title || $scope.title === ''){ return alert('Please enter a title'); }
		$scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments: [
				{author: 'Dummy', body: 'This is an example of a comment', upvotes: 0}
			]});
		$scope.title = '';
		$scope.link = '';
	}

	$scope.incrementUpvotes = function(post){ post.upvotes++; }

}]);

app.controller('PostsController', ['$scope', '$stateParams', 'postFactory', function($scope, $stateParams, postFactory){

	$scope.post = postFactory.posts[$stateParams.id];

	$scope.addComment = function(){
		if($scope.body === ''){ return; }
		$scope.post.comments.push({body: $scope.body, author: 'user', upvotes: 0});
		$scope.body = '';
	}

	$scope.incrementUpvotes = function(post){ post.upvotes++; }

}])