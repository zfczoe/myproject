(function(){
		var oContainer = document.getElementById('container');
		var oPrev = document.getElementById('prev');
		var oNext = document.getElementById('next');
		var ROW = 4;//图片阵列的行数
			COL = 6;//列数
			NUM = ROW *　COL; // 各自阵列总数
			BIG_IMG_WIDTH = 750;  //大图宽
			BIG_IMG_HEIGHT = 500;
			THUME_IMG_WIDTH = THUME_IMG_HEIGHT = 125;
		var bClicked = false;  //标记是否点击格子
		var iNow = 0; //标识大图索引
		//预先加载图片，包括所有的大图小图
		var iLoded = 0;//加载完毕的图片数量
		for (var i = 1; i <= NUM; i++) {
			var oBigIMg = new Image();
			oBigIMg.src = 'enjoy/rotateImg/img/' + i + '.jpg';
			oBigIMg.onload = function(){
				iLoded++;
				if(iLoded == NUM * 2){ //有图片加载完毕
					loadSuccess();
				}
			}


			var oThumbIMg = new Image();
			oThumbIMg.src = 'enjoy/rotateImg/img/thumbs/' + i + '.jpg';
			oThumbIMg.onload = function(){
				iLoded++;
				if(iLoded == NUM * 2){ //有图片加载完毕
					loadSuccess();
				}
			}
		}
		var aImg = document.getElementsByClassName('img');
		function loadSuccess(){
			var index = 0;  //表示图片格子的索引
			var iColGap = (oContainer.offsetWidth - COL * THUME_IMG_WIDTH)/(COL + 1);  //列之间的距离
			var iRowGap = (oContainer.offsetHeight - ROW * THUME_IMG_HEIGHT)/(ROW + 1);
			for (var i = 0; i < ROW; i++) {
				for (var j = 0; j < COL; j++) {
					var oDiv = document.createElement('div');
					oDiv.pos = {
						left: parseInt(iColGap + j*(iColGap + THUME_IMG_WIDTH)),
						top: parseInt(iRowGap + i*(iRowGap + THUME_IMG_HEIGHT))
					};
					oDiv.index = index;
					oDiv.martrix = {
						col: j,
						row: i
					}
					oDiv.style.left = (-Math.random()*300 - 200) + 'px';
					oDiv.style.top = (-Math.random()*300 - 200) + 'px';
					oDiv.className = 'img';
					oDiv.style.width = THUME_IMG_WIDTH + 'px'; 
					oDiv.style.height = THUME_IMG_HEIGHT + 'px'; 
					oDiv.style.background = 'url(enjoy/rotateImg/img/thumbs/' + (index+1) + '.jpg)';
					oDiv.innerHTML = '<span></span>';
					oContainer.appendChild(oDiv);
					index++;
				}
			}
			
			index--;  //上面循环结束后 index=24;所以先减一
			var time = setInterval(function(){   //相当于循环
				aImg[index].style.left = aImg[index].pos.left + 'px';
				aImg[index].style.top = aImg[index].pos.top + 'px';
				setStyle3d(aImg[index],'transform','rotate('+(Math.random()*40 - 20) + 'deg)');
				
				aImg[index].addEventListener('click',clickHandler,false);


				index--;
				if(index == -1){
					clearInterval(time);
				}
			},100)
			/*
			setTimeout(function(){   //开了一个新的队列，相当于一个线程，技巧。。焦点 。
				aImg[23].style.left = '1000px';
				aImg[23].style.top = '300px';
			},0);
			*/
			
		}
		function clickHandler(){
			if(bClicked){  //为真表示点击过，则打撒
				for (var i = 0; i < aImg.length; i++) {
					var oSpan = aImg[i].getElementsByTagName('span')[0];
					oSpan.style.opacity = 0;
					aImg[i].className = 'img';
					aImg[i].style.left = aImg[i].pos.left + 'px';
					aImg[i].style.top = aImg[i].pos.top + 'px';
					setStyle3d(aImg[i],'transform','rotate('+(Math.random()*40 - 20) + 'deg)');
				};
				
				oPrev.style.display = oNext.style.display = 'none';
			}else{
				var bigImgPos = {
					left: (oContainer.offsetWidth - BIG_IMG_WIDTH)/2,
					top: (oContainer.offsetHeight - BIG_IMG_HEIGHT)/2
				};
				for (var i = 0; i < aImg.length; i++) {
					var oSpan = aImg[i].getElementsByTagName('span')[0];


					oSpan.style.background = 'url(enjoy/rotateImg/img/'+ (this.index + 1) +'.jpg)' + (-aImg[i].martrix.col*THUME_IMG_WIDTH) + 'px ' + (-aImg[i].martrix.row*THUME_IMG_HEIGHT) + 'px';



					oSpan.style.opacity = 1;
					aImg[i].style.left = bigImgPos.left + aImg[i].martrix.col*(THUME_IMG_WIDTH+1) + 'px';
					aImg[i].style.top = bigImgPos.top + aImg[i].martrix.row*(THUME_IMG_HEIGHT+1) + 'px';
					setStyle3d(aImg[i],'transform','rotate(0deg)');
					aImg[i].className = 'img plece';
				}
				oPrev.style.display = oNext.style.display = 'block';
			}
				bClicked = !bClicked;

		}
		oPrev.onclick = oNext.onclick =function(){
			if(this == oPrev){
				iNow--;
				if(iNow == -1){
					iNow = NUM - 1;
				}
			}else{
				iNow++;
				if(iNow == NUM){
					iNow = 0;
				}
			}
			var arr = [];
			for (var i = 0; i < NUM; i++) {
				arr.push(i);
			};
			arr.sort(function(){
				return Math.random() - 0.5;
			});
			var timer = setInterval(function(){
				var item = arr.pop();
				aImg[item].getElementsByTagName('span')[0].style.background = 'url(enjoy/rotateImg/img/'+(iNow+1)+'.jpg)' + (-aImg[item].martrix.col*THUME_IMG_WIDTH) + 'px ' + (-aImg[item].martrix.row*THUME_IMG_HEIGHT) + 'px';
				if(arr.length == 0){
					clearInterval(timer);
				}
			},30);
		};
	
		// oContainer.addEventListener('click',function(e){
		// 	if(e.target.className == 'img' || e.target.tagName == 'SPAN'){
		// 		alert(e.target);

		// 	}
		// },false);
		function setStyle3d(elem,attr,value){
			['Webkit','Moz','Ms','O',''].forEach(function(prefix){
				elem.style[prefix + attr.charAt(0).toUpperCase()+attr.substr(1)] = value;  //aImg.style.WebkitTransform
			});
		}
		

	})();