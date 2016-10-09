//公共函数

var json={
	/*'fish1':oImg,
	'fish2':oImg*/
}; //放的是 图片对象

function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n))+n;
}

function loadImage(arr,fn){
	var inow=0; //计数  加载完成图片的个数
	for(var i=0; i<arr.length; i++){
		var oImg=new Image();
		(function(index){
			oImg.onload=function(){
				inow++;
				//存图片对象
				json[arr[index]]=this;
				//判断所有图片是否加载完成
				if(inow==arr.length){
					fn && fn();
				}
			}
		})(i);
		oImg.src='img/'+arr[i]+'.png';
	}
}