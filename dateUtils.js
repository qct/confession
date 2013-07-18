var moment = require('moment');

function util(){
	moment.lang('zh-cn');
}
util.prototype.add_formatted_datestr = function (posts) {
  for (var i = 0; i < posts.length; i++) {
    posts[i].update_at_str = moment(posts[i].update_at.getTime()).fromNow();//.format("YYYY-MM-DD HH:mm:ss");
  }
};
util.prototype.add_datestr = function (post) {
    post.update_at_str = moment(post.update_at.getTime()).fromNow();//.format("YYYY-MM-DD HH:mm:ss");
};
util.prototype.update_content = function(post){
	var regPeople=/@.*?(?=&nbsp)/gi;
	var regTag=/#[^#]*?#/gi;
	post.content=String(post.content).replace(regPeople,function(people){
		return "<a href="+global.urls.people+encodeURIComponent(people.substring(1))+">"+people+"</a>";
	});
	post.content=String(post.content).replace(regTag,function(tag){
		return "<a href="+global.urls.tags+encodeURIComponent(tag.substring(1,tag.length-1))+">"+tag+"</a>";
	});
	
};
util.prototype.update_contents = function(posts){

	posts.forEach(function(post){
		util.prototype.add_datestr(post);
		util.prototype.update_content(post);
	});
};
module.exports=new util();
