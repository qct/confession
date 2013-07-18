module.exports=function(req,res,next){
	var paths=[/^\/comment$/gi,/^\/create$/gi];
	var needToRd=false;
	paths.forEach(function(e){
		if(e.test(req.path)){
			console.log(req.session.user);
			if(!req.session.user){
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