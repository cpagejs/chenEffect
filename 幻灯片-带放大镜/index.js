window.onload = function(){
	//1 获取元素节点
	var proShow = document.getElementById("pro-show");
	var showLeft = document.getElementById("show-left");
	var showBtn = document.getElementById("show-btn");
	var showRight = document.getElementById("show-right");
	var showMove = document.getElementById("show-move");
	var showBg = document.getElementById("show-bg");
	var showLeftImg = showLeft.getElementsByTagName('img')[0];
	var showRightImg = showRight.getElementsByTagName('img')[0];
	var showSmall = document.getElementById("show-small");
	var showPrev = showBtn.getElementsByTagName("p")[0];
	var showNext = showBtn.getElementsByTagName("p")[1];

	var timer = null;
	var time = 60;
	var moved = false;
	//2 绑定事件,实现触摸小图显示大图
	showBtn.onmouseover = function(e){
		var e = e || window.event;
		var imgObj = e.srcElement || e.target;
		if(imgObj.nodeName == 'IMG'){
			//绝对路径
			var src = imgObj.src;
			var imgName = src.substring(src.lastIndexOf('/')).replace(/1/,'2');
			showLeftImg.src = "img" + imgName;
			var imgName2 = src.substring(src.lastIndexOf('/')).replace(/1/,'3');
			showRightImg.src = "img" + imgName2;
		}
	}  

	//3 放大镜效果
	showBg.onmouseover = function(){
		showRight.style.display = "block";
		showMove.style.display = "block";
	}
	showBg.onmousemove = function(e){
		var e = e || window.event;
		var left = e.clientX - proShow.offsetLeft - showLeft.offsetLeft - showMove.offsetWidth/2;
		var top = e.clientY - proShow.offsetTop - showLeft.offsetTop - showMove.offsetHeight/2;
		if(left < 0){
			left = 0;
		}else if(left > (showLeft.offsetWidth - showMove.offsetWidth)){
			left = (showLeft.offsetWidth - showMove.offsetWidth);
		}
		if(top < 0){
			top = 0;
		}else if(top > (showLeft.offsetHeight - showMove.offsetHeight)){
			top = (showLeft.offsetHeight - showMove.offsetHeight);
		}
		showMove.style.left = left + 'px';
		showMove.style.top = top + 'px';

		var percentX = left/(showLeft.offsetWidth - showMove.offsetWidth);
		var percentY = top/(showLeft.offsetHeight - showMove.offsetHeight);

		showRightImg.style.left = -(showRightImg.offsetWidth - showRight.offsetWidth)*percentX + 'px';
		showRightImg.style.top = -(showRightImg.offsetHeight - showRight.offsetHeight)*percentY + 'px';
	}
	showBg.onmouseout = function(){
		showRight.style.display = "none";
		showMove.style.display = "none";
	}
	//4 点击底部左右按钮，移动图片
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			return parseInt(window.getComputedStyle(obj,null)[attr]);
		}else{
			return parseInt(obj.currentStyle[attr]);
		}
	}
	function setSta(){
		var lis = showSmall.getElementsByTagName('li');
		var rr = lis[lis.length-1].getBoundingClientRect().right - showBtn.getBoundingClientRect().right;
		if(lis.length <= 6){
			showPrev.style.display = 'none';
			showNext.style.display = 'none';
		}else if(lis.length > 6){
			if(getStyle(showSmall,'left') == 14){
				showPrev.style.display = 'none';
				showNext.style.display = 'block';
			}else if(getStyle(showSmall,'left') != 14 && rr>=-10){
				showPrev.style.display = 'block'; 
				showNext.style.display = 'block';
			}else {
				showPrev.style.display = 'block'; 
				showNext.style.display = 'none';
			}
		}
	}
	setSta();
	function move(offset){
		moved = true;
		var uL = getStyle(showSmall,'left');
		var speed = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			showSmall.style.left = uL + speed + 'px';
			setSta();
			if(offset < 0){  //showNext
				speed -= 2;
				if(speed <= offset) {
					clearInterval(timer);
					moved = false;
				}
			}else{   //showPrev
				speed += 2;
				if(speed >= offset) {
					clearInterval(timer);
					moved = false;
				}
			}
		},time);	
	}
	showNext.onclick = function(){
		if(moved) return;
		move(-60);
	}
	showPrev.onclick = function(){
		if(moved) return;
		move(60);
	}
}