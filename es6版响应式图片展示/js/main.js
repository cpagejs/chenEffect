let num = 0,
	imgs = document.querySelectorAll("#demo .item img"),
	percent = 1.7,
	model = document.querySelector("#model"),
	modelBtn = document.querySelectorAll("#model .btn")[0],
	modelW = parseInt(window.getComputedStyle(model,null)['width']),
	windowW = window.innerWidth;

for(var i=0; i<imgs.length; i++){
	imgs[i].style.height = parseInt(window.getComputedStyle(imgs[0],null)['width'])/percent + 'px';
	imgs[i].index = i;
	imgs[i].addEventListener("click",function(){
		let item = this.index;
		iClcik(item);
	},false);
}

window.addEventListener("resize",()=>{
	imgSize();
},false);

document.addEventListener("click",(e)=>{
	dClick(e);
},false);

modelBtn.addEventListener("click",()=>{
	if(model.style.display == 'block'){
		modelHide();
	}
});

const imgSize = ()=>{
	let imgs2 = document.querySelectorAll("#demo .item img");
	for(var i=0; i<imgs2.length; i++){
		imgs[i].style.height = parseInt(window.getComputedStyle(imgs2[0],null)['width'])/percent + 'px';
	}
}

const iClcik = (item)=>{
	for(var j=0; j<imgs.length; j++){
		imgs[j].classList.remove('active');
	}
	imgs[item].classList.add("active");

	modelShow();

	num++;
}

const dClick = (e)=>{
	if(e.target.nodeName.toLowerCase() != 'img'){
		for(var i=0; i<imgs.length; i++){
			if(imgs[i].classList.contains('active')){
				imgs[i].classList.remove('active');
			}
		}
		modelHide();
	}
}

const handelNum = ()=>{
	if(num == 5){
		setNum();
		document.querySelectorAll("#model .body span")[0].classList.add("num-blue");
	}else if(num >= 7){
		window.location.href = "http://www.baidu.com";
	}else{
		setNum();
		if(num%2 == 0){
			document.querySelectorAll("#model .body span")[0].classList.add("num-red");
		}else{
			document.querySelectorAll("#model .body span")[0].classList.add("num-green");
		}
	}
}

const setNum = ()=>{
	document.querySelectorAll("#model .body")[0].innerHTML = `click num: <span>${num}</span>`;
}

const modelShow = ()=>{
	handelNum();
	model.style.left = (window.innerWidth - modelW)/2 + 'px';
	window.onresize = ()=>{
		document.querySelector("#model").style.left = (window.innerWidth - modelW)/2 + 'px';
	}
	model.style.display = 'block';
}

const modelHide = ()=>{
	model.style.display = 'none';
}