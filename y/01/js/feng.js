//1.随机数
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n)
}
//2.查重
function findInArr(n,arr){
	for(var i = 0; i < arr.length; i++){
		if(n == arr[i]){
			return true	;
		}	
	}
	return false;
}
//3.补零
function toDouble(n){
	if(n < 10){
		return '0'+n;	
	}else{
		return '' + n;	
	}
}
//4.getByClass
function getByClass(oParent,sClass){
	//如果浏览器支持JS自带的获取class的方法就是用JS自带的获取方法;
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{//如果浏览器不支持JS自带的获取class的方法,也就是ie8-
		//通过oPraent获取所有的元素;
		var aEle = oParent.getElementsByTagName('*');
		var arr = [];
		//循环吧每个元素绳身上的class切割一下，切割完成返回一个数组
		for(var i = 0; i < aEle.length; i++){
			var tmp = aEle[i].className.split(' ');	
			//判断切割完成后的数组里面是否包含我们需要找的className;
			if(findInArr(sClass,tmp)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}	
}
/*调用
window.onload = function(){
	var aBlue = getByClass(document,'blue');
	for(var i = 0; i < aBlue.length; i++){
		aBlue[i].style.background = 'red';	
	}	
}
 */
//5.setStyle
function setStyle(){
	var obj = arguments[0];	
	if(arguments.length == 3){
		var name = arguments[1];
		var value = arguments[2];
		obj.style[name] = value;
	}else{
		var json = arguments[1];
		for(var name in json){
			obj.style[name] = json[name];	
		}
	}
}
/*调用
window.onload = function(){
	var oBox = document.getElementById('box');
	oBox.onclick = function(){
		setStyle(oBox,'width','200px');
		setStyle(oBox,{
			width:'200px',
			height: '200px',
			background: 'green'	
		});		
	}
}
*/
//6.最小数(由小到大排列)
function findInMin(arr,start){
	var iMin = arr[start];
	var iMinIndex = start;
	for(var i = start; i < arr.length; i++){
		if(iMin > arr[i]){
			iMin = arr[i];	
			iMinIndex = i;
		}
	}
	return iMinIndex;
}
/*
for(var i = 0; i < arr.length; i++){
	var n = findInMin(arr,i);//最小数出现的位置;
	var tmp;//空房子;
	tmp = arr[n];
	arr[n] = arr[i];//arr[i]代表当前的数;
	arr[i] = tmp;//交换两个数的位置;
}
 */
//7.最大数(由大到小排列)
function findInMax(arr,start){
	var iMax = arr[start];
	var iMaxIndex = start;
	for(var i = start; i < arr.length; i++){
		if(iMax > arr[i]){
			iMax = arr[i];	
			iMaxIndex = i;
		}
	}
	return iMaxIndex;
}
//8.求和
function sum(){
	var res = 0;
	for(var i = 0; i < arguments.length; i++){
		res+=arguments[i];
	}
	return res;
}
//9.事件绑定
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);	
	}else{
		obj.attachEvent('on'+sEv,fn);	
	}
}
//10.事件解除
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);	
	}else{
		obj.detachEvent('on'+sEv,fn);	
	}
}
/*调用
window.onload = function(){
	var oBtn = document.getElementById('btn');
	function show(){
		alert('1');	
	}	
	addEvent(oBtn,'click',show);	
	removeEvent(oBtn,'click',show)		
}
 */
//11.检测碰撞,obj1,obj2分别代表我们要拖拽检测两个物体;
function collTest(obj1,obj2){
	var l1 = obj1.offsetLeft;
	var t1 = obj1.offsetTop;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	var b1 = obj1.offsetTop + obj1.offsetHeight;
			
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var b2 = obj2.offsetTop + obj2.offsetHeight;
			
	if(r1 < l2 || b1 < t2 || l1 > r2 || t1  > b2){
		return false;	
	}else{
		return true;
	}		
}
/*
if(collTest(oDiv1,oDiv2)){如果碰撞了
				oDiv2.style.background = 'yellow';
			}else{
				oDiv2.style.background = 'green';	
			}
 */
//12.滚轮事件
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;		
		bDown = oEvent.wheelDelta ? oEvent.wheelDelta > 0 : oEvent.detail < 0;
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvent(obj,'mousewheel',wheel)
	}	
}
/*调用
window.onload = function(){
	var oBox = document.getElementById('box');
	addWheel(oBox,function(bDown){
		if(bDown){
			oBox.style.height = oBox.offsetHeight - 10 + 'px';	
		}else{
			oBox.style.height = oBox.offsetHeight + 10 + 'px';		
		}
	});	
}
 */
//13.DOMReady=window.onload
function DOMReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){//通过事件绑定添加DOMContentLoaded方法;
			fn && fn();//执行函数;
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){//通过事件绑定添加onreadystatechange
			//如果资源加载状态为complete,代表资源加载完成;
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}
/*调用
DOMReady(function(){
	var oBox = document.getElementById('box');
	oBox.onclick = function(){
		alert('1');	
	}
});
 */
//14.getStyle
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];	
	}else{
		return getComputedStyle(obj,false)[name];
	}	
}
//15.运动
//json:{width:400,height: 500,left: 600,top: 700}要改变的属性名和属性值；
//complete{}:可选参数,可传递时间,运动形式,回调函数; {time:500,easeing:'linear',fn:function(){}}
function move(obj,json,complete){
	clearInterval(obj.timer);
	complete = complete || {};
	//默认运动完成时间3000；
	complete.time = complete.time || 500;
	//默认运动形式ease-in
	complete.easeing = complete.easeing || 'linear';
	var dis = {};
	var start = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];	
	}
	var count = parseInt(complete.time/30);
	var n = 0;
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(complete.easeing){
				//匀速
				case 'linear':
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				//加速
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*a*a*a;	
				break;
				//减速
				case 'ease-out':
					var a = 1 - n/count;
					var cur = start[name]+dis[name]*(1-a*a*a);	
					break;
			}
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';		
			}else{
				obj.style[name] = cur + 'px';		
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			complete.fn && complete.fn();	
		}
	},30);
}
//t  当前时间
//b  初始值  start
//c  总距离  dis
//d  总时间
//var cur=fx(t,b,c,d)
var Tween={ Linear:function(t,b,c,d){return c*t/d+b},
			Quad   :{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},                     					easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},
			Cubic  :{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},										easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},
			Quart  :{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},										easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},
			Quint  :{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},									easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},
			Sine   :{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},						easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},
			Expo   :{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},					easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},
			Circ   :{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},						easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},
			Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},
			Back   :{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},
			Bounce :{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function moveT(obj,json,complete){
	clearInterval(obj.timer);
	complete = complete || {};
	complete.time = complete.time || 500;
	complete.easeing = complete.easeing || Tween.Expo.easeIn;
	var dis = {};
	var start = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];	
	}
	var count = parseInt(complete.time/30);
	var n = 0;
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
		
			var cur=complete.easeing(n/count*complete.time,start[name],dis[name],complete.time)
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';		
			}else{
				obj.style[name] = cur + 'px';		
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			complete.fn && complete.fn();	
		}
	},30);
}          //多运动形式运动框架  结合Tween
/*调用window.onload=function(){
	var Box=document.getElementById('box');
	
	var fx=Tween.Back.easeOut
	Box.onclick=function(){
		moveT(Box,{left:800},{time:3000,easeing:fx})
	}
}*/