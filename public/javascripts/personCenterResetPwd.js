define(function(require, exports){
	require('./nav');
	$('.rpsub').on('click',function(){
		$.post("/resetPassword", {
			oldPassword: $('input[name="oldPassword"]').val(),
			newPassword: $('input[name="newPassword"]').val(),
			renewPassword: $('input[name="renewPassword"]').val()
		}, function(backData){
		  	alert('修改成功！');
	 	});
	});
});