define(function(require, exports){
	var validate = require('./validate');
	var $ = require('jquery');
	$(function(){
		// login and reg start
		$('.click').click(function(){
			$('.tancengLogin').css({
				'display': 'block',
				'z-index': 100
			});
			$('tancengLogin').css({
				'background-color': '#ccc',
				'oparity': 0.3
			})
		});

		// login an reg end
		$('.firstImg').mouseover(function(){
			$('.bigImg').css({
				'background-image': "url('/images/img/1.png')",
			});
		});
		$('.secondImg').mouseover(function(){
			$('.bigImg').css({
				'background-image': "url('/images/img/2.png')",
			});
		});
		$('.thirdImg').mouseover(function(){
			$('.bigImg').css({
				'background-image': "url('/images/img/3.png')",
			});
		});
		$('.fourImg').mouseover(function(){
			$('.bigImg').css({
				'background-image': "url('/images/img/4.png')",
			});
		});
		$('.fiveImg').mouseover(function(){
			$('.bigImg').css({
				'background-image': "url('/images/img/5.png')",
			});
		});



		// bottom start
		$('.clickX').click(function(){
			$('#screenBottom').css('bottom', '-80px');
		});
		$('.clickTopX').click(function(){
			$('.bottomTopContent').css('bottom', '-630px');
			$('#screenBottom').show();
		});
		$('.clickTop').click(function(){
			$('#screenBottom').hide();
			$('.bottomTopContent').css('bottom', 0);
		});
		setInterval(function(){
			$('#screenBottom').css('bottom', 0);
		},10000);
		//bottom end


		// tanceng reg start
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
		$('.regName').on('blur',function(){
			if($('.regName').val().length<4){
				$('.noReg').hide();
			}
			$.post("/checkUser", { username: $('.regName').val()},	function(backData){
			  	  $('.noReg').html(backData.result);
				}
		 	);
		});
		// tanceng reg end
		// tanceng login start
		$('.loginName').on('focus',function(){
			$('.noReg').html('');
		});
		$('.loginName').on('focus',function(){
			$('.noReg').html('');
		});
		$('.loginName').on('blur',function(){
			$.post("/checkUser", { username: $('.loginName').val()}, function(backData){
			  	  $('.noReg').html(backData.flag);
				}
		 	);
		});
		// tanceng login end
		//suggest start
		$('.suggestBtn').click(function(){
			alert('提交成功');
		});
	});
});