const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author:{type: String},
    body: {type: String},
    upvotes: {type: Number, default:0},
    post: {type: Schema.Types.ObjectId, ref: 'post'}
});

commentSchema.methods.upvoteComment = function () {
    this.upvotes +=1;
};

commentSchema.methods.downvoteComment = function () {
    this.upvotes -=1;
};

let Comment = mongoose.model("comment", commentSchema);

const postSchema = new Schema({
    text: {type: String},
    author: String,
    upvotes: {type: Number, default:0},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
postSchema.methods.upvote = function () {
    this.upvotes +=1;
};
postSchema.methods.downvote = function () {
    this.upvotes -=1;
};

let Post = mongoose.model('post', postSchema);
//Be carefull how u required this models in the server
module.exports = {
    Post: Post,
    Comment: Comment
};