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
				console.log(data);
				for(var k in data){
					var ul=$("<ul/>").addClass("unstyled inline left-padding0");
					ul.append("<li/>").append("<a href=javascript:void(0);>回复</a>");
					ul.append("<li/>").addClass("pull-right font-grey").append(data[k].update_at_str);
					frag.append("@"+data[k].author+":"+data[k].content)
					.append(ul)
					.append($("<hr/>").css("border","1px solid #DDDDDD"));
						
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
};

$(document).ready(function(){
	$(".post").on('mouseover',function(){
		var post_id=$(this).attr("postid");
	});
});

comment.active=function(id){
	console.log($("#commentArea_"+id));
	console.log($("#commentArea_"+id).val());
	$.ajax({
		url:"comment",
		data:{content:$("#commentArea_"+id).val(),post_id:id},
		async:true,
		type: 'POST',
		success:function(data){
		alert(data.des);
	}});
};