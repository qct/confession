module.exports=function(req,res,next){
	var paths=["/comment","/create","/update","/destroy","/edit"];
	var needToRd=false;
	paths.forEach(function(e){
		if(req.path.indexOf(e)==0){
			if(!req.cookies.user_id){
				
				needToRd=true;
			}
		}
	});
	if(needToRd){
		var ref=req.headers.referer;
		res.send("<script>alert('您需要先登录。');window.location.href='"+ref+"'</script>");
	}else{
		next();
	}
	
}