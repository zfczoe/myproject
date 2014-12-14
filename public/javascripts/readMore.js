define(function(require, exports){
	require('./nav');
	$(function(){   //$(function(){
		function print_date(){
			var now = new Date();
			document.getElementById('time').innerHTML = now.getFullYear() + '年' + (now.getMonth()+1) + 
			'月' + now.getDate() + '日' + ' 星期' + ['日', '一', '二', '三', '四', '五', '六',][now.getDay()]
			+ ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		}
		function counter(){
			var date = new Date();
			var year = date.getFullYear();
			var date2 = new Date(year, 12, 31, 23, 59, 59);
			var time = (date2 - date) / 1000;
			var day = Math.floor(time / (24*60*60));
			var hour = Math.floor(time % (24*60*60)/(60*60));
			var minute = Math.floor(time % (24*60*60)%(60*60)/60);
			var second = Math.floor(time % (24*60*60)%(60*60)%60);
			var str = year + '年还剩' + day + '天' + hour + '时' + minute + '分' + second + '秒';
			document.getElementById('timeOver').innerHTML = str;
		}
		window.setInterval(print_date, 1000);
		window.setInterval(counter, 1000);
		$('.myWeixin').mouseover(function(){
			$(this).animate({
				width: '200px',
				height: '200px'
			}, '2000');
		}).mouseout(function(){
			$(this).animate({
				width: '130px',
				height: '30px'
			}, '2000');
		});
		
		$('.commentSub').on('click',function(){
			$.post("/addComment", {
				commentName: $('input[name="commentName"]').val(),
				comment: $('.textarea').val(),
				oBlog: $('input[name="oBlog"]').val()
			}, function(backData){
			  	alert('发表成功！刷新页面可见！');
		 	});
		});


	});   //$(function(){
});