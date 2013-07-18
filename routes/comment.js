var mongoose = require( 'mongoose' );
var Comment  = mongoose.model('Comment');
dateUtils=require('../dateUtils');
exports.active=function(req,res,next){
  console.log("Enter into comment.");
  var reqObj=req.body;
  new Comment({
    user_id    : req.cookies.sid,
    content    : reqObj.content,
    post_id    : reqObj.post_id,
    update_at  : Date.now(),
    author     : "吐吧-哥"
  }).save(function(err,comment,count){
    res.send({result:true,code:200,des:"Success."})
  });
};
exports.show=function(req,res,next){
	post_id=req.body.post_id || req.query.post_id;
	Comment.find({post_id:post_id})
	.sort("-update_at")
	.exec(function(err,comments,count){
		var obj=[];
		
		comments.forEach(function(comment){
			dateUtils.update_content(comment);
			dateUtils.add_datestr(comment);
			var c={};
			c.content=comment.content || "什么都没有说";
			c.update_at=comment.update_at;
			c.author="<a href='"+global.urls.people+encodeURIComponent(comment.author)+"'>@"+comment.author+"</a>" || "<a href='"+global.urls.people+encodeURIComponent("无名氏")+"'>@"+"无名氏"+"</a>";
			c.update_at_str=comment.update_at_str || "很久之前";
			obj.push(c);
		});
		res.send(obj);
	});
}