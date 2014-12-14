define(function(require, exports){
	require('./nav');
	$('#fb_submit').on('click',function(){
		$.post("/addblog", {
			title: $('input[name="title"]').val(),
			content: $('#editor1').val(),
			blogSort: $('select option:selected').val()
		}, function(backData){
		  	alert('发表成功！');
	 	});
	});
});