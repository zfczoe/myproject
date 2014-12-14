define(function(require, exports){
	var validate = require('./validate');
	$(function(){
		$('.username').mouseover(function(){
			$('.loginUser').css('display', 'block');
		});
		$('.username').mouseout(function(){
			$('.loginUser').css('display', 'none');
		});
		var navbar = (function(){
			var oNav = document.getElementById('nav');
			var iTop = oNav.offsetTop;
			return {
				init: function(){
					var that = this;
					this.addEvent(window, 'scroll', function(){//使用事件绑定函数，否则后面注册的事件会将前面注册的事件覆盖
						var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop; //获取文档滚动条高度
						if(iScrollTop >= iTop){
							that.fixed();
						}else{
							that.relative();
						}
					});
					// $('li').click(function(){
					// 	$('li').addClass('active');
					// });
				},
				fixed: function(){
					oNav.className = 'fixed';
				},
				relative: function(){
					oNav.className = '';
				},
				addEvent: function (elem, type, handler){
			            if(elem.addEventListener){
			                elem.addEventListener(type, handler, false);
			            }else if(elem.attachEvent){
			                elem['temp' + type + handler] = handler;
			                elem[type + handler] = function(){
			                    elem['temp' + type + handler].call(elem);
			                };
			                elem.attachEvent('on' + type, elem[type + handler]);
			                
			            }else{
			                elem['on' + type] = handler;
			            }
			    }
			};
		})();

		navbar.init();
	});
	
});
