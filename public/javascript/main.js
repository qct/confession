var comment={};
comment.status=false;
comment.send=function(id){
	var ccId="#cc_"+id;
	if(comment.status){
		comment.status=false;
		$(ccId).hide();
	}else{
		comment.status=true;
		$(ccId).show();
	}
}

$(document).ready(function(){
	$(".post").on('mouseover',function(){
		var post_id=$(this).attr("postid");
	});
});

comment.active=function(id){
	$.ajax({
		url:"comment",
		data:{content:$("#commentArea").val(),post_id:id},
		async:true,
		type: 'POST',
		success:function(data){
		alert(data.des);
	}});
}