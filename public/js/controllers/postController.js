app.controller('PostController', ["$scope", "postFactory", "posts", "$http", function ($scope, postFactory, posts, $http) {


    $scope.posts = posts.data;


    $scope.addPost = function () {
        let newPost = {
            text: $scope.text,
            //author: $scope.author,
            upvotes: $scope.upvotes,
            comments: [],
        };

        postFactory.addPost(newPost).then(function (post) {
            $scope.posts.push(post);
        });
    };


    $scope.upvote = function (post) {
        postFactory.upvote(post).then(function () {
            postFactory.getPosts().then(function (posts) {
                $scope.posts = posts;
                console.log("i like it")
            });
        });
    };

    $scope.downvote = function (post) {
        postFactory.downvote(post).then(function () {
            postFactory.getPosts().then(function (posts) {
                $scope.posts = posts;
                console.log("i dislike it")
            });
        });
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
