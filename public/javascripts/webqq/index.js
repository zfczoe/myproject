//侧边栏
var sidebar = (function(){
	return me = {
		dialogList: [],
		init: function(){
			this.createMenu();
			this.createPinyin();
		},
		createMenu: function(){
			var menuData = [//读取菜单信息，从远程服务器或本地cookie中读取的
				{bTask: true, dialog: {width: 1024, height: 450, title: '应用市场', content: 'http://www.baidu.com/'}, img: {src: 'images/webqq/appmarket.png', alt:'应用市场'}},
				{bTask: true, dialog: {width: 1024, height: 450, title: '企鹅', content:'...'}, img: {src: 'images/webqq/big.png', alt:'应用市场'}},
				{bTask: true, dialog: {width: 1024, height: 450, title: '微薄', content:'...'}, img: {src: 'images/webqq/weibo.png', alt:'应用市场'}},
				{bTask: true, dialog: {width: 1024, height: 450, title: '邮箱', content:'...'}, img: {src: 'images/webqq/email.png', alt:'应用市场'}},
				{bTask: true, dialog: {width: 1024, height: 450, title: '互联网', content:'...'}, img: {src: 'images/webqq/internet.png', alt:'应用市场'}},
				{bTask: false, dialog: {width: 1024, height: 450, title: '空间', content:'...'}, img: {src: 'images/webqq/zone.png', alt:'应用市场'}},
			];
			for(var i=0; i<menuData.length; i++){
				var menu = menuData[i];
				(function(menu){
					menu.box = $('<li class="app-button"></li>');
					menu.box.append('<img src="'+menu.img.src+'" alt="'+menu.img.alt+'"/>')
					.on('click', function(){
						me.createDialog(menu);
					});
					$('.app-items').append(menu.box);
				})(menu);
			}
		},
		createDialog: function(menu){
			var bFlag = false;
			for (var i = 0; i < me.dialogList.length; i++) {
				var dialog = me.dialogList[i];
				if(dialog.title == menu.dialog.title){
					dialog.restore();
					bFlag = true;
					break;
				}
			};
			if(!bFlag){
				
				

				var options = {
					afterClose: function(dialog){
						me.dialogList.splice($.inArray(dialog, me.dialogList), 1);
						if(menu.bTask) task.box.remove();
					}
				};

				options = $.extend(menu.dialog, options)
				var dialog = new MyDialog(menu.dialog);
				me.dialogList.push(dialog);
				if(menu.bTask){
					var task = me.createTask(menu, dialog);
				}
			}
		},
		createTask: function(menu, dialog){
			var task = {
				box: $('<li class="task"></li>'),
				icon: '<img class="task-icon" src="' + menu.img.src+ '" alt="">',
				title: '<span class="task-title">' + menu.dialog.title + '</span>'
			}
			task.box.append(task.icon)
			.append(task.title)
			.on('click', function(){
				dialog.show ? dialog.minimize() : dialog.restore();
				
			})
			.appendTo('#task-list');
			return task;
		},
		createPinyin: function(){},
		createSystemSound: function(){},
		createSystemSetting: function(){},
		createThemeSetting: function(){
			me.createDialog({
				bTask: false,
				dialog: {
					width: 500,
					height: 300,
					title: '设置皮肤',
					content: '...'
				}
			});
		}
	}
})();

$(function(){
	sidebar.init();  //初始化侧边栏
	$('#test').on('click', function(){
		for (var i = 0; i < sidebar.dialogList.length; i++) {
			sidebar.dialogList[i].close();

		};
		sidebar.dialogList = [];
	})









	
	function resizeWindow(){
		$('#wallpaper').css({
			width: $(window).width(),
			height: $(window).height()
		});
	}
	resizeWindow();
	$(window).on('resize', function(){
		resizeWindow();
	});
});