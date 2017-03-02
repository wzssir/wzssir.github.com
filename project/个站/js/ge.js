
window.onload=window.onresize=function(){
	
	var timer=null;	
	var aHd = document.getElementById('hdList');
	var aImg = aHd.getElementsByTagName('img');
	var Con = document.getElementById('content');//包7个div
	var aDiv = Con.children;//7个div
	var aImg1 = getByClass(document,'img');//每屏的大图
	var aLi = aHd.children;
	var cH = document.documentElement.clientHeight;
	var fx1 = Tween.Bounce.easeOut;
	var fx2 = Tween.Back.easeOut;

	//给每个div
	for(var i=0;i<aDiv.length;i++){
		aDiv[i].style.height=cH+'px';
	}
	;(function(){
		for(var i=0;i<aLi.length;i++){
			(function(n){
				aLi[n].onclick = function(){					
					//控制滚动条
					
					var start = document.documentElement.scrollTop || document.body.scrollTop;
					var dis=n*aDiv[0].offsetHeight-start;
					var count=parseInt(2500/30);
					var m=0;
					clearInterval(timer)
					timer=setInterval(function(){
						m++;
						var a=1-m/count;
						var cur=start+dis*(1-a*a*a);
						document.documentElement.scrollTop=document.body.scrollTop=cur;
						if(m==count){clearInterval(timer)}
					},30);
				}
			})(i)
		}	
	})();
	
	var bOK=true;
	var bReady=true;
	window.onscroll = function(){	
		var cH = document.documentElement.clientHeight;
		var sT = document.documentElement.scrollTop || document.body.scrollTop;		
		var n=parseInt(sT/cH);
		var m=sT%cH/cH;

		//导航栏与滚动条的联系
		for(var i=0;i<aImg.length;i++){//清空  每个导航栏回到初始位置
			aImg[i].style.top = 32 +'px';
		}		
		aImg[n].style.top = 32*m +'px';
		if(n >= aImg.length - 1){
			aImg[n].style.top = 0 +'px';
		}else{
			aImg[n+1].style.top = 32*(1-m) +'px';
		}
		//猫
		var aHoop=document.getElementById('hoop');
		var aLi=aHoop.children;
		var Tip1=getByClass(document,'tip1')[0];
		document.title=sT
	
		if(sT>cH&&sT<cH*3){
			if(!bOK)return;
			bOK=false;
			Hoop();
			//Tip1.style.transition='12s all linear 1s';
			//Tip1.style.transform='perspective(800px) translateX(2000px)';
			
		}else{
			bOK=true;
			Stop()
			//Tip1.style.transition='none';
			//Tip1.style.transform='perspective(800px) translateX(-2000px)';
			
		}
		if(sT>cH*3+50){
			if(!bReady)return;
			bReady=false;
			Skill()					
		}else{
			bReady=true;
			Reset()					
		}
		
		
	}
	

	//首页各种按钮
	;(function(){
		var Down1=document.getElementById('down1');
		var aBtn=getByClass(document,'icon1')
		var Rbox=getByClass(document,'r_box')[0];
		var Rbtn=getByClass(document,'r_btn')[0];
		var iCon=getByClass(document,'icon')[0];
		var Txtcon=getByClass(document,'txtCon')[0];
		var bOK=true
		//首页小按钮事件
		for(var i=0;i<aBtn.length;i++){		
			aBtn[i].onmouseover=function(){
				var Before=this.children[0];
				var After=this.children[1];
				move(Before,{opacity:0})
				move(After,{opacity:1})			
			}
			aBtn[i].onmouseout=function(){
				var Before=this.children[0];
				var After=this.children[1];
				move(Before,{opacity:1})
				move(After,{opacity:0})
			}
			aBtn[0].onclick=function(){
				clearInterval(document.body.timer)
				clearInterval(document.documentElement.timer)
				clearInterval(timer)
				moveS(document.body || document.documentElement,{scrollTop:cH},{easeing:fx2});
			}
			aBtn[1].onclick=function(){
				moveT(Rbox,{right:0},{easeing:fx1},{time:500})
				move(iCon,{left:-600},{time:300})
				move(Txtcon,{left:-600},{time:300})
				bOK=false;
			}
		}
		//首页大按钮事件
		Rbtn.onmouseover=function(){
			var oB=this.children[0];
			var oA=this.children[1];
			move(oB,{opacity:0});
			move(oA,{opacity:1})
		}
		Rbtn.onmouseout=function(){
			var oB=this.children[0];
			var oA=this.children[1];
			move(oB,{opacity:1});
			move(oA,{opacity:0})
		}	
		Rbtn.onclick=function(){
			if(bOK){
				moveT(Rbox,{right:0},{easeing:fx1},{time:500})
				move(iCon,{left:-600},{time:300})
				move(Txtcon,{left:-600},{time:300})
			}else{
				moveT(Rbox,{right:-630},{easeing:fx1},{time:500})
				move(iCon,{left:0})
				move(Txtcon,{left:0})
			}
			bOK=!bOK;
		}
	})();
	//第三页按钮
	;(function(){
	
		
		var Rbox=getByClass(document,'r_box3')[0];
		var Rbtn=getByClass(document,'r_btn3')[0];
		
		
		var bOK=true;
		
		//首页大按钮事件
		Rbtn.onmouseover=function(){
			var oB=this.children[0];
			var oA=this.children[1];
			move(oB,{opacity:0});
			move(oA,{opacity:1})
		}
		Rbtn.onmouseout=function(){
			var oB=this.children[0];
			var oA=this.children[1];
			move(oB,{opacity:1});
			move(oA,{opacity:0})
		}	
		Rbtn.onclick=function(){
			if(bOK){
				moveT(Rbox,{right:0},{easeing:fx1},{time:500})
				
			}else{
				moveT(Rbox,{right:-330},{easeing:fx1},{time:500})
				
			}
			bOK=!bOK;
		}
	})();
	//波浪条
	;(function(){
		var Wave=document.getElementById('r_box_wave');
		var wDiv=Wave.getElementsByTagName('div');
		var oSpan=Wave.getElementsByTagName('span');
		for (var i = 0; i < oSpan.length; i++) {
			(function(index){
				oSpan[i].onmouseover=function(){
					move(wDiv[index],{width:405},{fn:function(){
						move(wDiv[index],{width:0})
					}})
				}
			})(i)
		}
	})();
	//第三页波浪条
	;(function(){
		var Wave=document.getElementById('r_box_wave3');
		var wDiv=Wave.getElementsByTagName('div');
		var oSpan=Wave.getElementsByTagName('span');
		for (var i = 0; i < oSpan.length; i++) {
			(function(index){
				oSpan[i].onmouseover=function(){
					move(wDiv[index],{width:305},{fn:function(){
						move(wDiv[index],{width:0})
					}})
				}
			})(i)
		}
	})();
	function Stop(){
		var aHoop=document.getElementById('hoop');
		var aLi=aHoop.children;
		for (var i = 0; i < aLi.length; i++) {
			
			aLi[i].style.transform='perspective(1500px) rotateY(0deg) translateZ(0px)';		
		}
		aHoop.style.transform='perspective(1500px) rotateX(0deg)';
	}
	function Hoop(){
		var aIndex3=getByClass(document,'index3')[0];
		var aHoop=document.getElementById('hoop');
		var aLi=aHoop.children;
		var N=11;
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.transition='1s all ease '+200*(N-i)+'ms';
			(function(obj,index){
				setTimeout(function(){
					obj.style.transform='perspective(1500px) rotateY('+index*360/N+'deg) translateZ(300px)';
				},0)
			})(aLi[i],i);
		}
		aHoop.style.transform='perspective(1500px) rotateX(-15deg)';
		aLi[0].addEventListener('transitionend',function(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.transition='none';
				d=Math.abs(Math.abs((i*360/N)%360)-180)/180;
				if(d<0.3){
					d=0.3;
				}
				aLi[i].style.opacity=d;
			}
		},false)
		var y=0;
		var x=0;
		var lastX=0;
		var lastY=0;
		var speedX=0;//绕着X轴旋转的速度
		var speedY=0;//绕着Y轴旋转的速度
		var timer1=null;
		aHoop.onmousedown=function(ev){
			clearInterval(timer1);
			var disX=ev.clientX-y;
			var disY=ev.clientY-x;
			document.onmousemove=function(ev){
				speedX=ev.clientY-lastY;
				speedY=ev.clientX-lastX;
				lastX=ev.clientX;
				lastY=ev.clientY;
				x=ev.clientY-disY;
				y=ev.clientX-disX;
				//赋值
				move(-x/6,y/6);
			};
			document.onmouseup=function(){
				timer1=setInterval(function(){
					speedX*=0.95;
					speedY*=0.95;
					x+=speedX;
					y+=speedY;
					move(-x/6,y/6);
					if(Math.abs(speedX)<1 && Math.abs(speedY)<1){
						clearInterval(timer1);
					}
				},30)
				document.onmouseup=null;
				document.onmousemove=null;
			};
			return false;
		};
		function move(x,y){
			for(var i=0;i<aLi.length; i++){
				aLi[i].style.transition='none';
				aLi[i].style.transform='perspective(1500px) rotateY('+(i*360/N+y)+'deg) translateZ(300px)';

				d=Math.abs(Math.abs((i*360/N+y)%360)-180)/180;
				//aLi[i].innerHTML=time;
				if(d<0.3){
					d=0.3;
				}
				aLi[i].style.opacity=d;
			}
			aHoop.style.transform='perspective(1500px) rotateX('+(x-15)+'deg)';
		}
	}




	;(function(){
		var aHoop=document.getElementById('hoop');
		var aSpan=aHoop.getElementsByTagName('span');
		var oClose=document.getElementById('close');
		var oGather=document.getElementById('gather');//装作品的集合		
		var oDiv=oGather.children;
		var Tip1=getByClass(document,'tip1')[0];
		var Case=document.getElementById('case3');
		
		//点击鼻子出来作品集 关闭按钮
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].onclick=function(){
				Case.style.display='block';
				//through()
				oGather.style.transition='1s all ease';
				oGather.style.transform='perspective(800px) translateX(110%)';
				oClose.style.transition='1s all ease';
				oClose.style.transform='perspective(800px) translateX(-200px) rotate(720deg)';
				
			}
		}
		//点击关闭按钮
		oClose.onclick=function(){
			oGather.style.transition='1s all ease';
			oGather.style.transform='perspective(800px) translateX(-80%)';
			oClose.style.transition='1s all ease';
			oClose.style.transform='perspective(800px) translateX(200px) rotate(0deg)';
			
			
		}
		//case1视觉差
		;(function(){
			var Case1=document.getElementById('case1');
			var Move1=document.getElementById('move1');
			var oDiv=Move1.children;
			var x=0;
			var y=0;
			Case1.onmousedown=function(ev){
				var oEv=ev||event;
				var disX=oEv.clientX-x;
				var disY=oEv.clientY-y;
				Case1.onmousemove=function(ev){
					var oEv=ev||event;
					x=oEv.clientX-disX;
					y=oEv.clientY-disY;
					for (var i = 0; i < oDiv.length; i++) {
						oDiv[i].style.marginLeft=x*oDiv[i].style.zIndex/15+'px';
						oDiv[i].style.marginTop=y*oDiv[i].style.zIndex/15+'px';
					}
				}
				Case1.onmouseup=function(){
					Case1.onmousemove=null;
					Case1.onmouseup=null;
				}
				return false;
			}
		})();
		//case2照片墙
		function through(){
			var Box=document.getElementById('box2');
			var Btn=document.getElementById('btn2');
			var aLi=Box.children;
			var zIndex=0;
			function getDis(obj1,obj2){
				var l1=obj1.offsetLeft+obj1.offsetWidth/2;
				var t1=obj1.offsetTop+obj1.offsetHeight/2;
				var l2=obj2.offsetLeft+obj2.offsetWidth/2;
				var t2=obj2.offsetTop+obj2.offsetHeight/2;
				var a=l2-l1;
				var b=t2-t1;
				return Math.sqrt(a*a+b*b)
			}
			var arr=[];
			for (var i = 0; i < aLi.length; i++) {
				arr[i]={
					left:aLi[i].offsetLeft,
					top:aLi[i].offsetTop
				}
			}
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.position='absolute';
				aLi[i].style.left=arr[i].left+'px';
				aLi[i].style.top=arr[i].top+'px';
				aLi[i].style.margin=0;
			}
			Btn.onclick=function(){
				arr.sort(function(){
					return Math.random()-0.5
				})
				for(var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					move(aLi[i],arr[aLi[i].index])
				}
			}
			for (var i = 0; i < aLi.length; i++) {                
                aLi[i].index = i;
                drag(aLi[i]);
            }
            function drag(obj){
				obj.onmousedown=function(ev){
					var oEv=ev||event;					
					var disX=oEv.clientX-obj.offsetLeft;
					var disY=oEv.clientY-obj.offsetTop;
					zIndex++;
					obj.style.zIndex=zIndex;
					document.onmousemove=function(ev){
						var oEv=ev||event;
						var l=oEv.clientX-disX;
						var t=oEv.clientY-disY;
						obj.style.left=l+'px';
						obj.style.top=t+'px';					
						var near=findNear(obj);						
						/*if(near){							
							near.style.border='3px solid #fff'
						}*/
					}
					document.onmouseup=function(){
						document.onmousemove=null;
						document.onmouseup=null;
						var near=findNear(obj);						
						if(near){
							move(obj,arr[near.index])
							move(near,arr[obj.index])
							
							//near.style.border=none;
							
						}else{
							move(obj,arr[obj.index])
						}						
						var tmp;
						tmp=near.index;
						near.index=obj.index;
						obj.index=tmp								
					}
					return false
				}
			}
			function findNear(obj){
				var iMin=99999999999999;
				var iMinIndex=-1;
				for(var i=0;i<aLi.length;i++){
					if(obj==aLi[i])continue;
					if(collTest(obj,aLi[i])){
						var dis=getDis(obj,aLi[i]);
						if(dis<iMin){
							iMin=dis;
							iMinIndex=i;
						}
					}
				}
				if(iMinIndex==-1){
					return null
				}else{
					return aLi[iMinIndex]
				}
			}
		}
		//case3颗粒翻转
		;(function(){
			var Case=document.getElementById('case3');
			var Box=document.getElementById('box3');
			var R=7;
			var C=4;
			for(var c=0;c<C;c++){
				for(var r=0;r<R;r++){
					var oSpan=document.createElement('span');
					oSpan.style.left=r*100+'px';
					oSpan.style.top=c*100+'px';
					oSpan.style.backgroundPosition=-r*100+'px -'+c*100+'px';
					Box.appendChild(oSpan)
				}
			}
			function rnd(n,m){
				return parseInt(Math.random()*(m-n)+n)
			}
			var iNow=0;
			var bOK=true;//设置开关是为了解决点快了快速切换的bug
			var aSpan=Box.getElementsByTagName('span');
			Case.onclick=function(){
				if(!bOK)return;
				bOK=false;
				iNow++;


				Box.style.backgroundImage='url(./case/img/'+iNow%4+'.jpg)'


				for (var i = 0; i < aSpan.length; i++) {
					//x y坐标离中心点有多远  就让span移动多少
					var x=aSpan[i].offsetLeft+50-350;
					var y=aSpan[i].offsetTop+50-200;
					aSpan[i].style.transition='1s all ease';
					aSpan[i].style.transform='perspective(800px) translate('+x+'px,'+y+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-90,90)+'deg) scale(1.5)' ;//注意写的顺序 后写的先执行
					aSpan[i].style.opacity=0;

				}
			}
			aSpan[0].addEventListener('transitionend',function(){
				for (var i = 0; i < aSpan.length; i++) {

					bOK=true;

					aSpan[i].style.transition='none';//恢复初始状态的时候 不能有动画效果  
					aSpan[i].style.transform='perspective(800px) translate(0px,0px) rotateX(0deg) rotateY(0deg) scale(1)' ;
					aSpan[i].style.opacity=1;

					aSpan[i].style.backgroundImage='url(./case/img/'+iNow%4+'.jpg)'


				}
			},false)
		})();
		//case4苹果菜单
		;(function(){
			var Case=document.getElementById('case4')
			var Box=document.getElementById('box4');
			var aImg=Box.children;
			Case.onmousemove=function(ev){
				var oEv=ev||event;
				for (var i = 0; i < aImg.length; i++) {
					var a=oEv.clientX-aImg[i].offsetLeft-aImg[i].offsetWidth/2-Box.offsetLeft;
				    var b=oEv.clientY-aImg[i].offsetTop-aImg[i].offsetHeight/2-Box.offsetTop;
				    var c=Math.sqrt(a*a+b*b);
					var scale=1-c/500;
					if(scale<0.5){
						scale=0.5
					}
					aImg[i].style.width=128*scale+'px';
				}
			}
		})();
		//case5手风琴
		;(function(){
			var Box=document.getElementById('box5');
			var aLi=Box.children;
			var w=40;
			for(var i=1;i<aLi.length;i++){
				aLi[i].style.left=Box.offsetWidth-(aLi.length-i)*w+'px';
			}
			for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].onmouseover=function(){
					for(var i=0;i<aLi.length;i++){
						if(i<=this.index){
							move(aLi[i],{left:i*w},{easing:'ease-out'})
						}else{
							move(aLi[i],{left:Box.offsetWidth-(aLi.length-i)*w},{easing:'ease-out'})
						}
					}
				}
			}
		})();
		//case6
		;(function(){




		})();
	})();













	//第五屏
	function Skill(){
		$('.skillbar').each(function(){
			$(this).find('.skillbar-bar').animate({
				width:$(this).attr('data-percent')
			},6000)
		})
	}
	function Reset(){
		$('.skillbar').each(function(){
			$(this).find('.skillbar-bar').animate({
				width:0
			},100)
		})
	}
	


	setTimeout(function(){
		document.documentElement.scrollTop = document.body.scrollTop=0;
	},0)
}


