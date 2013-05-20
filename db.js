var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Post = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date,
    author     : String
});
 
mongoose.model( 'Post', Post);
 
mongoose.connect('mongodb://localhost/post');