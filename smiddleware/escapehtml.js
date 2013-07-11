module.exports=function(req,res,next){
	if(req.path && req.path=='/create'){
		req.body.content=req.body.content.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;')
		.replace(/"/g,'&quot;')
		.replace(/ /g,'&nbsp;');
	}
	next();
}