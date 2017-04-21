app.factory('postFactory', function ($http) {

    const postFactory = {};


    //todo
    //add post
    //up/down vote post
    //add comment (to post)
    //up/down vote comment (belonging to post)
    //extension: admin can delete post
    //extension: admin can delete comment (from post)


    postFactory.addPost = function (newPost) {
        return $http.post('/post', newPost)
            .then(function (response) {
                return response.data
            }, function (err) {
                console.error(err)
            })
    };

    postFactory.getPosts = function () {
        return $http.get('/post')
            .then(function (response) {
                return response.data
            }, function (err) {
                console.error(err)
            });
    };

    postFactory.upvote = function (postToUpvote) {
        return $http.put('/post/' + postToUpvote + '/upvote', null)
            .then(function (response) {
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };

    postFactory.downvote = function (postToDownvote) {
        return $http.put('/post/' + postToDownvote + '/downvote', null)
            .then(function (response) {
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };
    postFactory.addComment = function (newComment, postId) {
        return $http.post('/post/' + postId + '/comment', newComment)
            .then(function (response) {
                return response.data;
            }, function (err) {
                console.error(err)
            })
    };

    postFactory.getComments = function () {
        return $http.get('/comment')
            .then(function (response) {
                console.log(response);
                return response.data
            }, function (err) {
                console.error(err)
            });
    };

    postFactory.upvoteComment = function (commentToUpvote) {
        console.log(commentToUpvote);
        return $http.put('/post/' + commentToUpvote + '/commentupvote', null)
            .then(function (response) {
                console.log(response);
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };

    postFactory.downvoteComment = function (commentToDownvote) {
        console.log(commentToDownvote);
        return $http.put('/post/' + commentToDownvote + '/commentDownvote', null)
            .then(function (response) {
                console.log(response);
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };

    return postFactory;

})
;
