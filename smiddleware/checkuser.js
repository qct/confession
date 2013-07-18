module.exports=function(req,res,next){
	var paths=[];
	var needToRd=false;
	paths.forEach(function(e){
		if(e.test(req.path)){
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