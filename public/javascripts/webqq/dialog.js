var MyDialog = (function(){
	var iZIndex = 1;
	function init(options){
		var DOM = {
			container: {
				box: $('<div class="dialog-container"></div>'),
				width: options.width,
				height: options.height
			},
			title: $('<div class="dialog-title"></div>'),
			titleText: $('<div class="dialog-title-text"></div>'),
			btnMin: $('<span class="btn-min btn"></span>'),
			btnMax: $('<span class="btn-max btn"></span>'),
			btnClose: $('<span class="btn-close btn"></span>'),
			content: $('<div class="dialog-content"></div>'),
			resizeBar: $('<div class="dialog-resizebar">'),
			isMaximize: false
		}
		DOM.container.box.css({
			width: options.width,
			height: options.height
		})
		.appendTo('body').draggable({
			drag: function(event, ui){
				DOM.container.position = ui.position
			}
		}).mousedown(function(){
			$(this).css({
				zIndex: iZIndex++
			});
		});
		DOM.title.appendTo(DOM.container.box).append('<div class="dialog-right-top"></div>');
		DOM.content.appendTo(DOM.container.box).append('<iframe class="iframe" src="' + options.content + '"></iframe>');
		DOM.titleText.appendTo(DOM.title);
		$('.dialog-right-top').append(DOM.btnMin);
		$('.dialog-right-top').append(DOM.btnMax);
		$('.dialog-right-top').append(DOM.btnClose);
		DOM.resizeBar.appendTo(DOM.container.box).draggable({
			drag: function(event, ui){
				DOM.container.box.width(ui.position.left <= 300 ? 310 : ui.position.left + 10).height(ui.position.top <= 200 ? 210 : ui.position.top + 10);
			},
			stop: function(event, ui){
				DOM.container.width = ui.position.left + 10,
				DOM.container.height = ui.position.top + 10
				DOM.resizeBar.css({
					left: '',
					top: ''
				});
			}
		});
		var _this = this;
		DOM.btnClose.on('click', function(){
			_this.close(this);
			if(options.afterClose) options.afterClose(_this);
		})
		DOM.btnMin.on('click', function(){
			_this.minimize(this);
		})
		DOM.btnMax.on('click', function(){
			_this.maximize();
		})
		DOM.titleText.text(options.title);
		return DOM;
	}
	function Dialog(options){
		this.title = options.title;
		this.show = true;
		// this.task = options.task;
		this.content = options.content;
		this.DOM = init.call(this, options);
	}
	Dialog.prototype.maximize = function(){
		if(this.DOM.isMaximize){
			this.DOM.container.box.css({
				width: this.DOM.container.width,
				height: this.DOM.container.height,
				left: this.DOM.container.position.left,
				top: this.DOM.container.position.top
			});
			this.DOM.isMaximize = false;
		}else{
			this.DOM.container.box.css({
				width: $(window).width(),
				height: $(window).height(),
				position: 'fixed',
				left: 0,
				top: 0
			});
			this.DOM.isMaximize = true; 
		}
	}
	Dialog.prototype.minimize = function(){
		this.DOM.container.box.hide();
		this.show = false;
	}
	Dialog.prototype.restore = function(){ //还原
		this.DOM.container.box.show().trigger('click');
		this.show = true;
	}
	Dialog.prototype.close = function(elem){
		this.DOM.container.box.remove();
		
	}
	return Dialog;
})();