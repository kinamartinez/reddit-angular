app.controller('PostController', ["$scope", "postFactory", "posts", "$http", function ($scope, postFactory, posts, $http) {


    $scope.posts = posts.data;


    $scope.addPost = function () {
        var newPost = {
            text: $scope.text,
            author: $scope.author,
            upvotes: $scope.upvotes,
            comments: [],
        };

        postFactory.addPost(newPost).then(function (post) {
            $scope.posts.push(post);
        });
    };

    $scope.upvote = function () {
        postFactory.upvote().then(function () {
             console.log("hey i like it");
        })

    };

    $scope.downvote = function () {

    };

    $scope.deletePost = function (postToRemove) {
        return $http.delete('/post/' + postToRemove._id)
            .then(function (response) {
                $http.get('/post').then(function (posts) {
                    $scope.posts = posts.data;///now we are reshowing the data after the db removed it
                });
            })

    }
}]);
