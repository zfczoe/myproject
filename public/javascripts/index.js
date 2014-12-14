define(function(require, exports){
	require('./nav');
	require('./move');
	var oUl = document.getElementById('blockList');
	var aLi = oUl.getElementsByTagName('li');
	var iZIndex = 1;
	var aPos = [];

	//布局转换
	for(var i=0; i<aLi.length; i++){
		// aLi[i].innerHTML = aLi[i].offsetLeft +", " + aLi[i].offsetTop;
		aLi[i].style.left = aLi[i].offsetLeft + 'px';
		aLi[i].style.top = aLi[i].offsetTop + 'px';

		aPos[i] = {left: aLi[i].offsetLeft, top: aLi[i].offsetTop};

		aLi[i].index = i;
	}
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.position = 'absolute';
		aLi[i].style.margin = 0;
	}


	//拖拽
	for(var i=0; i<aLi.length; i++){
		drag(aLi[i]);
	}

	function drag(elem){
		var disX = disY = 0;
		elem.onmousedown = function(e){
			elem.style.zIndex = iZIndex++;
			e = e || window.event;
			disX = e.clientX - elem.offsetLeft;
			disY = e.clientY - elem.offsetTop;
			document.onmousemove = function(e){
				e = e || window.event;
				elem.style.left = e.clientX - disX + 'px';
				elem.style.top = e.clientY - disY + 'px';

				var oNearest = getNearest(elem);
				if(oNearest){
					oNearest.className = 'on';
				}

				// for(var i=0; i<aLi.length; i++){
				// 	aLi[i].className = '';
				// 	if(elem == aLi[i]){
				// 		continue;
				// 	}
				// 	var bResult = collideTest(elem, aLi[i]);
				// 	if(bResult){
				// 		aLi[i].className = 'on';
				// 	}
				// }
			};

			document.onmouseup = function(){
				document.onmousemove = null;

				var oNearest = getNearest(elem);
				if(oNearest){

					startMove(elem, aPos[oNearest.index]);
					startMove(oNearest, aPos[elem.index]);

					var temp = elem.index;
					elem.index = oNearest.index;
					oNearest.index = temp;

				}else{
					startMove(elem, aPos[elem.index]);
				}

			};
			return false;
		};
	}

	function collideTest(elem, target){   //碰撞检测   
		var elemL = elem.offsetLeft,
			elemR = elem.offsetLeft + elem.offsetWidth,
			elemT = elem.offsetTop,
			elemB = elem.offsetTop + elem.offsetHeight;
		
		var targetL = target.offsetLeft,
			targetR = target.offsetLeft + target.offsetWidth,
			targetT = target.offsetTop,
			targetB = target.offsetTop + target.offsetHeight;

		if(elemR < targetL || elemB < targetT || elemL > targetR || elemT > targetB){
			return false;
		}else{
			return true;
		}
	}

	function getDis(elem, target){     //计算距离
		var iLeft = elem.offsetLeft - target.offsetLeft;
		var iTop = elem.offsetTop - target.offsetTop;
		return Math.sqrt(iLeft*iLeft + iTop*iTop);
	}

	function getNearest(elem){
		var iMin = 9999999;
		var iMinIndex = -1;
		for(var i=0; i<aLi.length; i++){
			aLi[i].className = '';
			if(elem == aLi[i]){
				continue;
			}   //自身碰撞   则跳过
			var bResult = collideTest(elem, aLi[i]);
			if(bResult){
				var dis = getDis(elem, aLi[i]);
				if(dis < iMin){
					iMin = dis;
					iMinIndex = i;
				}
			}
			
		}
		if(iMinIndex == -1){
			return null;
		}else{
			return aLi[iMinIndex];
		}
	}
});