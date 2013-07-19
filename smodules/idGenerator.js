var mongoose = require( 'mongoose' );
var Post     = mongoose.model( 'Post' );
var User     = mongoose.model( 'User' );
exports.genArticleId=(function(){
	var id=0;
	return function(callback){
		if(!id){
			Post.find().sort('-id').limit(1).exec(function(err,posts,count){
				if(err){
					console.log(err);
				}
				if(posts && posts.length>0){
					id=posts[0].id+1;
				}else{
					id=100001;
				}
				console.log("Finish init articleid:"+id);
				callback(id);
	 		});
		}else{
			id+=1;
			callback(id);
		}
	}
})();


exports.genUserId=(function(){
	var id=0;
	return function(callback){
		if(!id){
			User.find().sort('-id').limit(1).exec(function(err,posts,count){
				if(err){
					console.log(err);
				}
				if(posts && posts.length>0){
					id=posts[0].id+1;
				}else{
					id=10000001;
				}
				console.log("Finish init articleid:"+id);
				callback(id);
	 		});
		}else{
			id+=1;
			callback(id);
		}
	}
})();