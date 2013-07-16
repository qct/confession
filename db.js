var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Post = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date,
    author     : String,
    id         : Number,
    tags       : Array,
    keywords   : Array
});

var Comment = new Schema({
    user_id   : String,
    content   : String,
    update_at : Date,
    author    : String,
    post_id   : Number
});

var User = new Schema({
    name: { type: String, default: '', index: true },
    loginname: { type: String, required: true, unique: true },
    pass: { type: String },
    email: { type: String, required: true, unique: true },
    sign_way: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

mongoose.model( 'Post', Post);
mongoose.model( 'User', User);
mongoose.model( 'Comment', Comment);
 
mongoose.connect('mongodb://rosegun.com:20000/post');