app.controller('CommentController', function ($rootScope, $scope, $stateParams, postFactory, relevantPost, authFactory) {

    $scope.post = relevantPost;

    $scope.addComment = function () {

        let newComment = {
           // author: $rootScope.currentUser,
            body: $scope.body,
            upvotes: $scope.upvotes,
            post: $scope.post._id
        };

        postFactory.addComment(newComment, $scope.post._id)
            .then(function (newComment) {
                $scope.post.comments.push(newComment);
            }, function (err) {
                console.error(err);

            });
    };


    $scope.upvoteComment = function (comment) {
        postFactory.upvoteComment(comment._id)
            .then(function (updatedComment) {
                comment.upvotes += 1;
                console.log("I like the comment")
            });
    };

    $scope.downvoteComment = function (comment) {
        postFactory.downvoteComment(comment._id)
            .then(function (updatedComment) {
                console.log(updatedComment);
                comment.upvotes -= 1;
                console.log("I dislike the comment")
            });
    };

    $scope.deleteComment = function () {
        //extension todo - only for admins
    }

});
