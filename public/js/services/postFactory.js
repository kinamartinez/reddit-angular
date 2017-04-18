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

    postFactory.addComment = function (newComment, postId) {
        // console.log(newComment);
        // console.log(post);
        return $http.post('/post/' + postId + '/comment', newComment)
            .then(function (response) {
                return response.data;
            }, function (err) {
                console.error(err)
            })
    };

    postFactory.upvote = function (postId, vote) {
                return $http.post('/post/' + postId + '/upvote', vote)
            .then(function (response) {
                console.log(vote);
                return response.data;

            }, function (err) {
                console.error(err)
            });
    };


return postFactory;

})
;
