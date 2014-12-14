define(function(require){
	var validate = require('./validate');
	
	$(function(){
		
		validate.init({
			formSelector: '#myform',
			rules:{
				username: {required: true, username: true},
				email: {required: true, email: true},
				password: {required: true, minlength : 6},
				repassword: {required: true, minlength : 6}
			}
		});
		// ajax验证
		$('#inputUsername').on('blur',function(){
			if($('#inputUsername').val().length<4){
				$('.noReg').hide();
			}
			$.post("/checkUser", { username: $('#inputUsername').val()},	function(backData){
			  	  $('.noReg').html(backData.result);
				}
		 	);
		});
		
	});
	
});