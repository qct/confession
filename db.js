var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Post = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date,
    author     : String
});

var User = new Schema({
    name: { type: String, index: true },
    loginname: { type: String, unique: true },
    pass: { type: String },
    email: { type: String, unique: true },
    sign_way: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
 
mongoose.model( 'Post', Post);
mongoose.model( 'User', User);
 
mongoose.connect('mongodb://localhost/post');