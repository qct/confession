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
		$.ajax({
			url:"comment/show",
			data:{post_id:id},
			async:true,
			type:"POST",
			success:function(data){
				var frag = $(document.createDocumentFragment());
				
				for(var k in data){
					frag.append("@"+data[k].author+":"+data[k].content).append($("<hr/>").css("border","1px solid #DDDDDD"));
						
				}
				$("#comment_"+id).empty().append(frag);
				/*
 <div class="span6 left-margin10">
              <hr style="border:1px solid #DDDDDD;"/>
            </div>
				*/
			}

		});
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
		data:{content:$("#commentArea_"+id).val(),post_id:id},
		async:true,
		type: 'POST',
		success:function(data){
		alert(data.des);
	}});
}