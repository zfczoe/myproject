define(function(require, exports){
	var validate = require('./validate');
	$(function(){
		$('#inputUsername').on('focus',function(){
			$('.noReg').html('');
		});
		$('#inputPassword').on('focus',function(){
			$('.noReg').html('');
		});
		$('#inputUsername').on('blur',function(){
			$.post("/checkUser", { username: $('#inputUsername').val()}, function(backData){
			  	  $('.noReg').html(backData.flag);
				}
		 	);
		});
	});
});