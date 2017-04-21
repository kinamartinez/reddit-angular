//userSchema and model
var mongoose = require('mongoose');
var plm = require ('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false }
});
UserSchema.plugin(plm);
var User = mongoose.model("User", UserSchema);

module.exports = User;