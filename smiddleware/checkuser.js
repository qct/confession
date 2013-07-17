module.exports=function(req,res,next){
	var paths=["/comment","/create","/update","/destroy","/edit"];
	var needToRd=false;
	paths.forEach(function(e){
		if(req.path.indexOf(e)==0){
			if(!req.cookies.sid){
				needToRd=true;
			}
		}
	});
	
	if(needToRd){
		var ref=req.headers.referer;
		res.send({result:false,code:100001,des:"Failed!Need login first."});
	}else{
		next();
	}
	
}