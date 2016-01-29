window.onload = function(){
	var autoMs = 3000;
	var ms = 100;
	var nextTarget = 0;
	var oWidth = 0;
	var speed = 0;
	var proSpeed = 0;
	var timer = null;
	var currentTime = null;
	var proTimer = null;

	var obj = document.getElementById('play');
	var oOl = obj.getElementsByTagName('ol')[0];
	var oOlLis = oOl.getElementsByTagName('li');
	var oOlSpan = oOl.getElementsByTagName('span');
	var oUl = obj.getElementsByTagName('ul')[0];
	var oUlLis = oUl.getElementsByTagName('li');
	var prev = obj.getElementsByTagName('p')[0];
	var next = obj.getElementsByTagName('p')[1];

	//上一张
	function btnPrev(){
		nextTarget -= 1;
		if(nextTarget < 0) nextTarget = oOlLis.length -1;
		oOlLis[nextTarget].className = 'active';
		go(nextTarget);
	}
	//下一张
	function btnNext(){
		nextTarget += 1;
		if(nextTarget > 4) nextTarget = 0;
		oOlLis[nextTarget].className = 'active';
		go(nextTarget);
	}
	//自动播放
	function autoPlay(){
		// go(nextTarget,function(){
		// 	progress(nextTarget-1);
		// });
		go(nextTarget);
		progress(nextTarget);
		nextTarget += 1;
		if(nextTarget >= oUlLis.length){
			nextTarget = 0;
			// setTimeout(function(){
			// 	progress(oUlLis.length-1);
			// },1800);
		}
	}
	//开始启动
	function go(index,fn){
		for(var i=0; i<oOlLis.length; i++){
			oOlLis[i].className = '';
			oOlSpan[i].style.width = 0 + 'px';
		}
		oOlLis[index].className = 'active';

		var oLiWidth = oUlLis[0].offsetWidth;
		oWidth = -index*oLiWidth;
		
		if(timer) clearInterval(timer);
		timer = setInterval(function(){
			//图片切换
			oUl.style.left = speed + 'px';
			speed += (oWidth - oUl.offsetLeft)/3;
			if(Math.abs(oWidth - oUl.offsetLeft) === 0){
				oUl.style.left = oWidth + 'px';
				clearInterval(timer);
				timer = null;
				if(fn) {fn();}
			}
		},ms);
	}

	//进度条
	function progress(index){
		if(proTimer) clearInterval(proTimer);
		for(var i=0; i<oOlSpan.length; i++){
			oOlSpan[i].style.width = 0 + 'px';
		}
		
		proTimer = setInterval(function(){
			oOlSpan[index].style.width = proSpeed + 10 + 'px';
			proSpeed += 5;
			if(parseInt(getComputedStyle(oOlSpan[index],null)['width']) >= 50) {
				proSpeed = 0;
				clearInterval(proTimer);
				proTimer = null;
			}
		},ms);
	}

	//停止运动
	function stop(){
		clearInterval(proTimer);proTimer = null;clearInterval(currentTime);
		for(var i=0; i<oOlSpan.length; i++){
			oOlSpan[i].style.width = 0 + 'px';
		}
		proSpeed = 0;
	}

	oUl.style.width = oUlLis.length*oUlLis[0].offsetWidth + 'px';

	//执行操作
	for(var i=0; i<oOlLis.length; i++){
		oOlLis[i].index = i;
		oOlLis[i].onmouseover = function(){
			stop();
			go(this.index,function(){
				clearInterval(timer);
			});
		};
		oOlLis[i].onmouseout = function(){
			nextTarget = this.index;
		}
	}
	obj.onmouseover = function(){
		clearInterval(currentTime);
	}
	obj.onmouseout = function(){
		if(currentTime) clearInterval(currentTime);
		currentTime = setInterval(autoPlay,autoMs);
	}

	prev.onclick = btnPrev;
	next.onclick = btnNext;

	progress(0);
	if(parseInt(oOlSpan[0].style.width)>='50'){
		oOlSpan[0].style.width = 0 + 'px';
		clearInterval(proTimer);
	}
	nextTarget += 1;
	currentTime = setInterval(autoPlay,autoMs);

}