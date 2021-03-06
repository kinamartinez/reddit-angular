//todo

//add post
//up/down vote post
//get posts
//get post (and it's comments)
//add comment (to post)
//up/down vote comment (belonging to post)
//extension: delete post (admin only)
//extension: remove comment from post (admin only)

const express = require('express');
const router = express.Router();
const Post = require("../models/postModel").Post; // Esto es para acceder al schema que estamos exportando como un objeto
const Comment = require("../models/postModel").Comment;


const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
    }
};

//as we are using modular route handlers we use router.param an not app.param
router.param('postid', function (req, res, next, id) {
    Post.findById(id, function (err, post) {
        if (err) {
            return next(err);
        } else if (!post) {
            return next(new Error('Post does not exist'));
        } else {
            req.post = post;  //put the post on the request object for the next function in line to use
            return next();
        }
    });
});

router.get('/', function (req, res, next) {
    Post.find(function (error, post) {
        if (error) {
            console.error(error);
            return next(error);
        }
        else {
            res.send(post);
        }

    });

});


router.post('/', function (req, res, next) {
    Post.create(Object.assign({author: req.user.username}, req.body), function (err, post) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            console.log(post);
            res.send(post);
        }
    });
});

router.get('/:postid2', function (req, res, next) {
    Post.findOne({_id: req.params.postid2}).populate('comments')
        .exec(function (err, post) {
            if (err) {
                return next(err);
            }
            else {
                // console.log("the population stuff");
                // console.log(post);
                res.send(post);
            }
        })
});

router.post('/:postid/comment', ensureAuthenticated, function (req, res, next) {
    let newComment = new Comment(Object.assign({author: req.user.username}, req.body));

    newComment.save(function (err, commentWithId) {
        if (err) {
            return next(err);
        }
        else {
            req.post.comments.push(commentWithId);
            req.post.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send(commentWithId)
            })
        }
    });
});


router.put('/:postid/upvote', ensureAuthenticated, function (req, res) {
    req.post.upvote();
    req.post.save(function (err, post) {
        res.send(post);
    });
});

router.put('/:postid/downvote', ensureAuthenticated, function (req, res) {
    req.post.downvote();
    req.post.save(function (err, post) {
        res.send(post);
    });
});


router.param('commentId', function (req, res, next, id) {
    Comment.findById(id, function (err, comment) {
        if (err) {
            return next(err);
        } else if (!comment) {
            return next(new Error('Comment does not exist'));
        } else {
            req.comment = comment;  //put the post on the request object for the next function in line to use
            return next();
        }
    });
});

router.put('/:commentId/commentupvote', ensureAuthenticated, function (req, res) {
    req.comment.upvoteComment();
    req.comment.save(function (err, comment) {
        res.send(comment);
    });
});

router.put('/:commentId/commentDownvote', ensureAuthenticated, function (req, res) {
    req.comment.upvoteComment();
    req.comment.save(function (err, comment) {
        res.send(comment);
    });
});

router.delete('/:postid', ensureAuthenticated, function (req, res, next) {

    req.post.remove(function (err, result) {
        if (err) {
            return next(err);
        } else {
            return res.send(result);
        }
    });
});


module.exports = router;