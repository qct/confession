var mongoose = require( 'mongoose' );
var Post     = mongoose.model( 'Post' );

module.exports=(function(){
	var ids={};
	
	return function(callback){
		if(!ids.articleid){
			Post.find().sort('-id').limit(1).exec(function(err,posts,count){
				if(err){
					console.log(err);
				}
				if(posts && posts.length>0){
					ids.articleid=posts[0].id+1;
				}else{
					ids.articleid=100001;
				}
				console.log("Finish init articleid:"+ids.articleid);
				callback(ids);
	 		});
		}else{
			for(var k in ids){
					ids[k]+=1;
			}
			callback(ids);
		}
	}
})();