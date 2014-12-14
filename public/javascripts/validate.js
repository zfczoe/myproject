define(function(require, exports){
	var $ = require('jquery');
	
	//exports.xx = function(){};
	
	return {
		init: function(options){
			var _this = this;
			var rules = options.rules;
			$('.show_error').html("");
			for(p in rules){
				(function(p){
					$(options.formSelector+' '+ '[name='+p+']').on('blur', function(){
							for(p2 in rules[p]){
								// if(rules[p][p2]){
								_this[p2](this,rules[p][p2]);
								// console.log(rules[p]+' '+p2)
								// }
								// (function(p2,p){

								// })(p2,p);

							}
					}).on('focus', function(){
						$(this).parents('.control-group').removeClass('error');
						$('.show_error').html("");
					});
				})(p);
			}


			$(options.formSelector).on('submit', function(){
				var bFlag = true; 
				var flag = true;
				var arr = [];
				for(p in rules){
					for(p2 in rules[p]){
						var elem = $('[name='+p+']').get(0);//获取原生的表单元素
						if(p2 == 'minlength'){
							elem.minlength = rules[p][p2];
						}
						bFlag = _this[p2]( elem );
						arr.push(bFlag);
					}
				}
			
				for (var i = 0; i < arr.length; i++) {
					if(!arr[i]){
						flag = false;
						break;
					}else{
						continue;
					}
				};

				if(flag){
					return true;
				}
				$('.show_error').html("请填写正确信息");
				return false;
			});
		},
		placehold: function(){
			
		},
		username: function(elem){    //用于用户名注册，，用户名只 能用 中文、英文、数字、下划线、4-16个字符。
			var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/;
			if(!reg.test(elem.value)){
				$(elem).parents('.control-group').addClass('error');
			}
			return reg.test(elem.value);
		},
		email: function(elem){
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
			if(!reg.test(elem.value)){
				$(elem).parents('.control-group').addClass('error');
			}
			return reg.test(elem.value); 
		},
		required: function(elem){  //验证是否为空

			if($.trim(elem.value).length == 0){
				$(elem).parents('.control-group').addClass('error');
				return false;
			}
			return true;
		},

		minlength: function(elem,minlength){
			if($.trim(elem.value).length < minlength){
				$(elem).parents('.control-group').addClass('error');
				// elem.value = '长度应大于等于' + elem.minlength;
				return false;
			}
			return true;
		}
	};
});
