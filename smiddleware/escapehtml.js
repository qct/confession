module.exports=function(req,res,next){
	if(req.path && req.path=='/create'){
		req.body.content=req.body.content.replace('&','&amp;')
		.replace('<','&lt;')
		.replace('>','&gt;')
		.replace('"','&quot;')
		.replace(' ','&nbsp;')
		.replace('©','&copy;')
		.replace('®','&reg;');
	}
	next();
}