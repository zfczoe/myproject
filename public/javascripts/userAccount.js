define(function(require, exports){
	var $ = require('jquery');
	
	/*exports.init = function(){
		$('.login-btn').hover(function(){
			$('.more-info').show();
		}, function(){
			$('.more-info').hide();
		});
	};*/
	
	return {
		init : function(){
			$('.login-btn').hover(function(){
				$('.more-info').show();
			}, function(){
				$('.more-info').hide();
			});
		}
	};
	
	
});
