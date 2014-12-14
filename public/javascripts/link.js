define(function(require, exports){
	require('./nav');
	$(function(){
		$(".list li").mouseover(function(){	
			//设置当前li的背景颜色和边框
			$(this).css("background-color","#fff").css("border-bottom","1px solid #fff").css("font-weight",'bold');
			//设置其他li的背景颜色和边框
			$(".list li").not(this).css("background-color","#F5F5F5").css("border-bottom","1px solid #ccc").css("font-weight",'');
			//获得当前li的索引值
			var index = $('.list li').index(this);
			//隐藏所有的div		
			$("#block div").hide();
			//显示对应的div
			$("#block div").eq(index).show();
		});
		// $('.div').on('click', function(){
		// 	$(this).css('border', '3px solid blue');
		// 	$('.div1').toggle('swing');
		// });
		// $('#clickme').click(function() {
		// 	  $('#book').animate({
		// 	    width: ['toggle', 'swing'],
		// 	    height: ['toggle', 'swing'],
		// 	    opacity: 'toggle'
		// 	  }, 5000, 'linear', function() {
		// 	      $(this).after('<div>Animation complete.</div>');
		// 	  });
		// 	});
		// $("#go").click(function(){
		//   $("#blockk").animate({
		//     width: "70%",
		//     opacity: 0.4,
		//     marginLeft: "0.6in",
		//     fontSize: "3em",
		//     borderWidth: "10px"
		//   }, 1500 );
		// });
		// $( "#go1" ).click(function(){
		//   $( "#block1" ).animate( { width: "90%" }, { queue: false, duration: 3000 })
		//      .animate({ fontSize: "24px" }, 1500 )
		//      .animate({ borderRightWidth: "15px" }, 1500 );
		// });
		 
		// $( "#go2" ).click(function(){
		//   $( "#block2" ).animate({ width: "90%" }, 1000 )
		//      .animate({ fontSize: "24px" }, 1000 )
		//      .animate({ borderLeftWidth: "15px" }, 1000 );
		// });
		 
		// $( "#go3" ).click(function(){
		//  $("#go3").scrollTop(300);
		// });
		 
		// $( "#go4" ).click(function(){
		//   $( "div" ).css({ width: "", fontSize: "", borderWidth: "" });
		// });
		// $( "#goo" ).click(function(){
		//   $( ".block:first" ).animate({
		//     left: 300,
		//     opacity: 0.6
		//   }, {
		//     duration: 2000,
		//     step: function( now, fx ){
		//       $( ".block:gt(0)" ).css( "left", 300 );
		//     }
		//   });
		// });

		// $('#clickme').click(function() {

		//   $('#book').animate({
		//     opacity: 0.25,
		//     left: '+=50',
		//     height: 'toggle'
		//   }, 1000, function() {
		//     // Animation complete.
		//   });
		// });	
	});
});