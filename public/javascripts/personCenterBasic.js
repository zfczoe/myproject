define(function(require, exports){
	require('./nav');
	$('#baocun').on('click',function(){
		$.post("/setBasic", {
			realName: $('input[name="realName"]').val(),
			gender: $('input:checked').val(),
			email: $('input[name="email"]').val(),
			personInfo: $('#personInfo').val()
		}, function(backData){
		  	alert('保存成功！');
	 	});
	});
	$('#quxiao').on('click', function(){
		$('input[name="realName"]').val('');
		$('input[name="gender"]').val('');
		$('input[name="email"]').val('');
	})
});