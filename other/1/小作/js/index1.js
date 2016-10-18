//header的滑块
			DOMReady(function(){
				var oHeader=document.getElementById("header");
					var  oHeaderCon =document.getElementById("header_con");
					var aHeaderLi=oHeaderCon.getElementsByTagName('li');
					var oHeaderMask=document.getElementById("header_mask");
					var c=Tween.Back.easeOut;   //运动曲线
					var bok=true;    //用于判断鼠标移出是否在点击之后发生的，true是在点击之后
					oHeader.onmouseover=function(){
						move(this,{opacity:1},{time:500,easing:c});
					};
					oHeader.onmouseout=function(){
						move(this,{opacity:0.4},{time:500,easing:c});
					};
					
					for(var i=0;i<aHeaderLi.length;i++){
							aHeaderLi[i].onmouseenter=function(){
								bok=false;    //鼠标移入且没有点击按钮让滑块回到0的位置
								that=this;
								move(oHeaderMask,{left:this.offsetLeft},{time:500,easing:c})
							}
							aHeaderLi[i].onclick=function(){
						    bok=true;  //点击之后让滑块固定
							}
					}
					oHeaderCon.onmouseleave=function(){
						if(bok){
							move(oHeaderMask,{left:that.offsetLeft},{time:500,easing:c});
						}
						else{move(oHeaderMask,{left:0},{time:500,easing:c});}		
					}
			});
			
			//分布出字
			DOMReady(function(){
				var oWord=document.getElementById("word");
				var oBtn=oWord.getElementsByTagName('input')[0];
				var str='青春,就要拼热血,苦点累点咬咬牙,继续前进的步伐';
				var timer=null;
				var c=Tween.Back.easeOut;   //运动曲线
				var count=0;
				oBtn.onmouseover=function(){
					this.style.background='purple';
				};
				oBtn.onmouseout=function(){
					this.style.background='rgb(160,100,160)';
				};
				for(var i=0;i<str.length;i++){
					var oDiv=document.createElement('div');
					oDiv.className='show';
					oDiv.innerHTML=str.charAt(i);
					oWord.appendChild(oDiv)
				}
				var aDiv=oWord.getElementsByTagName('div');
				oWord.onclick=function(){
					clearInterval(timer);
					timer=setInterval(function(){
						move(aDiv[count],{opacity:1},{time:100,easing:c});
						count++;
						if(count==aDiv.length){
							clearInterval(timer);
						}
					},80);
				};
			});
			
			//第一张大图右边框显示隐藏
			DOMReady(function(){
				var oContentIndex1R=document.getElementById("content_index1R");
				var oMouse1=document.getElementById("mouse1");
				var oTime=document.getElementById("time");
				
				var c=Tween.Back.easeOut;
				var timer=null;
				oContentIndex1R.onmouseenter=function(){
					clearTimeout(timer);
					move(this,{right:-50},{time:500,easing:c});
					move(oTime,{right:500},{time:500,easing:c});
					
				};
				oContentIndex1R.onmouseleave=function(){
					
					clearTimeout(timer);
					timer=setTimeout(function(){
						move(oContentIndex1R,{right:-500},{time:500,easing:c,fn:function(){
							oContentIndex1R.style.background='#777';
						}});
						move(oTime,{right:180},{time:500,easing:c});
					},1000);
				};
				
			});

			//中心变大
			DOMReady(function(){
			     var oContentIndex1R=document.getElementById("content_index1R")
					var aLi=oContentIndex1R.getElementsByTagName('li');
					var c=Tween.Cubic.easeOut;
					var arr=[];
					for(var i=0;i<aLi.length;i++){
						 arr[i]={left:aLi[i].offsetLeft,
						 				top:aLi[i].offsetTop}
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.position='absolute';
						aLi[i].style.left=arr[i].left+'px';
						aLi[i].style.top=arr[i].top+'px';
						aLi[i].style.margin=0;
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].onmouseover=function(){
							move(this,{width:100,height:100,marginLeft:-25,marginTop:-25},{time:500,easing:c})
							this.style.zIndex=i++;
						};
						aLi[i].onmouseout=function(){
							move(this,{width:50,height:50,marginLeft:0,marginTop:0},{time:500,easing:c})
						};
						aLi[i].onclick=function(){
							oContentIndex1R.style.background=getStyle(this,'background');
						};
					}
				});
				
				//右边框里的条运动
				DOMReady(function(){
					var oCon1bar=document.getElementById("con1bar");
					var aSpan=oCon1bar.getElementsByTagName('span');
					var aDiv=oCon1bar.getElementsByTagName('div');
					var c=Tween.Cubic.easeOut;
					//span与div的top相差10来保证文字在div里面显示
					for(var i=0;i<aSpan.length;i++){
						aSpan[i].style.top=i*60+20+'px';
					}
					for(var i=0;i<aDiv.length;i++){
						aDiv[i].style.top=i*60+10+'px';
					}
					
					for(var i=0;i<aSpan.length;i++){
						aSpan[i].index=i;
						aSpan[i].onmouseover=function(){
							var that=this;
							move(aDiv[that.index],{width:350},{time:500,easing:c,fn:function(){
								move(aDiv[that.index],{width:0},{time:500,easing:c});
							}});
						};
					}
				});
				
			//时钟
			DOMReady(function(){
				var oBox=document.getElementById("time");
				var aSpan=oBox.querySelectorAll('span');
				
				//制作表盘
				for(var i=0;i<60;i++){
					var oI=document.createElement('i');
					oI.style.width=3+'px';
					if(i%5){
						oI.style.height=8+'px';//短的表盘刻度
					}else{//显示的长的指针,b标签里面放0123.......
						oI.innerHTML='<b>'+i/5+'</b>';
						oI.children[0].style.transform='rotate(-'+i*6+'deg)';//b标签里面的字相反方向旋转
						oI.style.height=16+'px';//长的表盘刻度
					}
					oI.style.position='absolute';
					oI.style.left=100+'px';
					oI.style.top=0;
					oI.style.transform='rotate('+i*6+'deg)';
					oI.style.transformOrigin='0px 100px';//旋转参照物
					oI.style.background='#000';
					oBox.appendChild(oI);
				}
				
				//时钟的旋转
				function clock(){
					var oDate=new Date();
					var h=oDate.getHours();
					var m=oDate.getMinutes();
					var s=oDate.getSeconds();
					var ms=oDate.getMilliseconds();
					
					aSpan[0].style.transform='rotate('+(360*(h%12)/12+m*30/60)+'deg)';
					aSpan[1].style.transform='rotate('+(360*m/60+s*6/60)+'deg)';
					aSpan[2].style.transform='rotate('+(360*s/60+ms*6/1000)+'deg)';
				}
				clock();
				setInterval(clock,30);
				})
			
			//折纸
			DOMReady(function(){
				var oWrap=document.getElementById("wrap1");
				var oH2=oWrap.getElementsByTagName('h2')[0];
				var aDiv=oWrap.getElementsByTagName("div");
				var iDelay=200;
				var oTimer=null;
				var i=0;
				var bOff=true;
				oH2.onclick=function()
				{
					if(oTimer)
					{
						return;
					}
					if(bOff)
					{
						i=0;
						oTimer=setInterval(function(){
							aDiv[i].className="show";
							i++;
							if(i==aDiv.length)
							{
								clearInterval(oTimer);
								oTimer=null;
								bOff=false;
							}	
						},iDelay);
					}
					else
					{
						i=aDiv.length-1;
						oTimer=setInterval(function(){
							aDiv[i].className="hide";
							i--;
							if(i<0)
							{
								clearInterval(oTimer);
								bOff=true;
								oTimer=null;
							}	
						},iDelay);
					}
				};
			})
			
			
			//回到顶部
			DOMReady(function(){
				var oToTop=document.getElementById("toTop");
				oToTop.onmouseover=function(){
					this.style.background='red';
				};
				oToTop.onmouseout=function(){
					this.style.background='#666';
				};
				window.onscroll=function(){
					var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
					if(scrollTop>200){
							oToTop.style.display='block';
					}else{oToTop.style.display='none';}
					oToTop.onclick=function(){
						var start=scrollTop;
						var dis=0-start;
						var count=parseInt(2000/30);
						var n=0;
						var timer=null;
						clearInterval(timer);
						timer=setInterval(function(){
							n++;
							var a=1-n/count;
							var cur=start+dis*(1-a*a*a);
							document.documentElement.scrollTop=document.body.scrollTop=cur;
							if(n==count){
									clearInterval(timer);
								}
						},30);
					};
					
				};
			});
			
			//滚动条
			DOMReady(function(){
				var oHeaderCon=document.getElementById("header_con");
				var c=Tween.Back.easeOut;   //运动曲线
				var aLi=oHeaderCon.getElementsByTagName('li');
				var oImg=document.getElementById("imgimg");
				var timer=null;
				for(var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					aLi[i].onclick=function(){
						var scrollT=document.documentElement.scrollTop||document.body.scrollTop;	
						var start=scrollT;
						var dis=oImg.offsetHeight*this.index-start;
						var count=parseInt(3000/30);
						var n=0;
						clearInterval(timer);
						timer=setInterval(function(){
							n++;
							var a=1-n/count;
							var cur=start+dis*(1-a*a*a);
							document.documentElement.scrollTop=document.body.scrollTop=cur;
							if(n==count){
									clearInterval(timer);
								}
						},30);
					
					};
					
				};
			});
			
			//第二张大图右边框显示隐藏
			DOMReady(function(){
				var oContentIndex2R=document.getElementById("content_index2R");
				var oMouse2=document.getElementById("mouse2");
				var c=Tween.Back.easeOut;
				var timer=null;
				oContentIndex2R.onmouseenter=function(){
					clearTimeout(timer);
					move(this,{right:-50},{time:500,easing:c});
					
				};
				oContentIndex2R.onmouseleave=function(){
					
					clearTimeout(timer);
					timer=setTimeout(function(){
						move(oContentIndex2R,{right:-500},{time:500,easing:c,fn:function(){
							oContentIndex2R.style.background='#777';
						}});
					},1000);
				};
				
			});
			
			//第二张大图右边框阴影
				DOMReady(function(){
					var oCon2con=document.getElementById("con2con");
					var aLi=oCon2con.getElementsByTagName('li');
					var aDiv=oCon2con.getElementsByTagName('div');
					var arr=[];
					for(var i=0;i<aLi.length;i++){
						arr[i]={
							left:aLi[i].offsetLeft,
							top:aLi[i].offsetTop
						}
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.position='absolute';
						aLi[i].style.left=arr[i].left+'px';
						aLi[i].style.top=arr[i].top+'px';
						aLi[i].style.marginLeft=0;
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].index=i;
						aLi[i].onmouseenter=function(){
							move(aDiv[this.index],{height:90});
						};
						aLi[i].onmouseleave=function(){
							move(aDiv[this.index],{height:0});
						};
					}
					
					
				})
			
			//第三张大图右边框显示隐藏
			DOMReady(function(){
				var oContentIndex3R=document.getElementById("content_index3R");
				var oMouse3=document.getElementById("mouse3");
				var c=Tween.Back.easeOut;
				var timer=null;
				oContentIndex3R.onmouseenter=function(){
					clearTimeout(timer);
					move(this,{right:-50},{time:500,easing:c});
					
				};
				oContentIndex3R.onmouseleave=function(){
					
					clearTimeout(timer);
					timer=setTimeout(function(){
						move(oContentIndex3R,{right:-500},{time:500,easing:c});
					},1000);
				};
				
			});
			
			//第三张大图右边框阴影
				DOMReady(function(){
					var oCon3con=document.getElementById("con3con");
					var aLi=oCon3con.getElementsByTagName('li');
					var aDiv=oCon3con.getElementsByTagName('div');
					var arr=[];
					for(var i=0;i<aLi.length;i++){
						arr[i]={
							left:aLi[i].offsetLeft,
							top:aLi[i].offsetTop
						}
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.position='absolute';
						aLi[i].style.left=arr[i].left+'px';
						aLi[i].style.top=arr[i].top+'px';
						aLi[i].style.marginLeft=0;
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].index=i;
						aLi[i].onmouseenter=function(){
							move(aDiv[this.index],{height:50});
						};
						aLi[i].onmouseleave=function(){
							move(aDiv[this.index],{height:0});
						};
					}
					
					
				})
			
			//第四张大图右边框显示隐藏
			DOMReady(function(){
				var oContentIndex4R=document.getElementById("content_index4R");
				var oMouse4=document.getElementById("mouse4");
				var oImg4=document.getElementById("img4")
				var oWord4=document.getElementById("word4")
				var c=Tween.Back.easeOut;
				var timer=null;
				oContentIndex4R.onmouseenter=function(){
					clearTimeout(timer);
					oImg4.style.transition='none';
					move(this,{right:-50},{time:500,easing:c});
					move(oImg4,{right:460},{time:500,easing:c,fn:function(){
						
					}});
					move(oWord4,{right:600},{time:500,easing:c});
				};
				oContentIndex4R.onmouseleave=function(){
					
					clearTimeout(timer);
					timer=setTimeout(function(){
						move(oContentIndex4R,{right:-500},{time:500,easing:c});
						move(oImg4,{right:180},{time:500,easing:c,fn:function(){
							oImg4.style.transition='1s all ease';
						}});
						move(oWord4,{right:320},{time:500,easing:c});
					},1000);
				};
				
			});
			
			//第四张大图右边框阴影
				DOMReady(function(){
					var oCon4con=document.getElementById("con4con");
					var aLi=oCon4con.getElementsByTagName('li');
					var aDiv=oCon4con.getElementsByTagName('div');
					var arr=[];
					for(var i=0;i<aLi.length;i++){
						arr[i]={
							left:aLi[i].offsetLeft,
							top:aLi[i].offsetTop
						}
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.position='absolute';
						aLi[i].style.left=arr[i].left+'px';
						aLi[i].style.top=arr[i].top+'px';
						aLi[i].style.marginLeft=0;
					}
					for(var i=0;i<aLi.length;i++){
						aLi[i].index=i;
						aLi[i].onmouseenter=function(){
							move(aDiv[this.index],{height:50});
						};
						aLi[i].onmouseleave=function(){
							move(aDiv[this.index],{height:0});
						};
					}
				})
			
			
			
			//	第四页html5的蒙版
			DOMReady(function(){
				var oMbmask=document.getElementById("mbmask")
				var oDiv=oMbmask.getElementsByTagName('div')[0];
					
					document.body.onmousemove=function(ev){
						var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
						var e=ev||event;
						var l=e.clientX-100-oMbmask.offsetLeft;
						var t=e.clientY-100-oMbmask.getBoundingClientRect().top;
						oDiv.style.webkitMaskPosition=l+'px '+t+'px';
				}
			})
			
			
		//	第五页作品1小球
			DOMReady(function(){
				var oBobble=document.getElementById("bobble");
				var oBbcon=document.getElementById("bbcon");
				var N=9;
				var d=0;
				var bOK=false;
				var timer22=null;
				
				for(var i=1;i<N;i++){
							var oLi=document.createElement('li');
							oLi.style.backgroundImage='url(./img/img3/'+i+'.png)';
							oLi.style.transition='1s all ease '+200*(N-i-1)+'ms';
							oBobble.appendChild(oLi);
						}
				
					
					var aLi=oBobble.getElementsByTagName('li');
					oBbcon.onmousedown=function(ev){
						var e=ev||event;
						e.cancelBubble=true;
						bOK=!bOK;
						if(bOK){
							for(var i=0;i<aLi.length;i++){
								aLi[i].style.transform='perspective(1500px) rotateY('+i*360/(N-1)+'deg) translateZ(350px)';
								aLi[i].style.transition='1s all ease '+200*(N-i)+'ms';
							}
							tab();
						}else{
							for(var i=0;i<aLi.length;i++){
								aLi[i].style.transition='1s all ease '+200*(N-i)+'ms';
								aLi[i].style.transform='perspective(1500px) rotateY(0deg) translateZ(0px)';
								
							}
						}
						
					};
					
					aLi[1].onclick=function(){
						oBbcon.innerHTML='<p>姓名:杨新权</p>'+
															'<p>性别:男</p>'+
															'<p>籍贯:河南省信阳市</p>'+
															'<p>民族:汉族</p>'+
															'<p>政治面貌:党员</p>'+
															'<p>婚姻状况:未婚</p>'+
															'<p>出生年月:1992-9-1</p>';
															
					};
					aLi[2].onclick=function(){	
						oBbcon.innerHTML='<p>学历:本科</p>'+
															'<p>毕业院校:河南科技学院</p>'+
															'<p>所学专业:电气自动化</p>'+
															'<p>在校时间:2010-9--2014-6</p>';
															
					};
					aLi[3].onclick=function(){	
						oBbcon.innerHTML='<p>联系电话:13525065838</p>'+
															'<p>通信地址:北京市大兴区亦庄</p>'+
															'<p>电子邮箱:yangxinquan0902@163.com</p>';
															
					};
					aLi[4].onclick=function(){	
						oBbcon.innerHTML='<p>兴趣:读书、旅游、打球、运动</p>'+
															'<p>个人爱好:看电影</p>'+
															'<p>秉性:不屈不挠</p>';
															
					};
				aLi[5].onclick=function(){	
						oBbcon.innerHTML='<p>性格上:积极乐观向上,活泼开朗大方</p>'+
															'<p>工作上:积极主动,吃苦耐劳</p>'+
															'<p>交际上:易于相处,待人诚恳</p>'+
															'<p>能力上:较强实际动手能力</p>';
															
					};
				aLi[6].onclick=function(){	
						oBbcon.innerHTML='<p>html技能:熟悉HTML、DIV、CSS，熟悉页面架构和布局，对Web标准和标签语义化有一定理解</p>'+
															'<p>熟练运用Photoshop，Dreamweaver等常用网页设计制作软件</p>'+
															'<p>能够解决不同主流浏览器的兼容性问题</p>';
															
					};
				aLi[7].onclick=function(){	
						oBbcon.innerHTML='<p>javascript技能:熟悉Javascript脚本语言，jQuery框架，能实现网页特效和用户交互体验</p>'+
															'<p>熟悉DOM、Cookie、Ajax、JSONP、正则表达式和事件处理机制</p>'+
															'<p>对sea.js,angular.js有一定的了解</p>';
															
					};
				aLi[0].onclick=function(){	
						oBbcon.innerHTML='<p>html5/css3技能:熟悉Javascript脚本语言，jQuery框架，能实现网页特效和用户交互体验</p>'+
															'<p>熟悉DOM、Cookie、Ajax、JSONP、正则表达式和事件处理机制</p>'+
															'<p>对sea.js,angular.js有一定的了解</p>';
															
					};
					
					
					
					function move(x,y){
						
							for(var i=0;i<aLi.length; i++){
								aLi[i].style.transition='none';
								aLi[i].style.transform='perspective(1500px) rotateY('+(i*360/(N-1)+y)+'deg) translateZ(350px)';
				
								d=Math.abs(Math.abs((i*360/(N-1)+y)%360)-180)/180;
								//aLi[i].innerHTML=d;
								if(d<0.3){
									d=0.3;
								}
								aLi[i].style.opacity=d;
							}
							oBobble.style.transform='perspective(1500px) rotateX('+(x-30)+'deg)';
						}
					
					//键盘运动
					var y=0;
					var x=-30;
					document.body.onkeydown=function(ev){
							if(bOK){
								switch(ev.keyCode){
								case 37:
									y--;
									break;
								case 39:
									y++;
									break;
							}
				
							move(x,y);
							}
						};
						
						//鼠标事件
						var lastX=0;
						var lastY=0;
				
						var speedX=0;//绕着X轴旋转的速度
						var speedY=0;//绕着Y轴旋转的速度
				
						var timer=null;
					function tab(){
						document.documentElement.onmousedown=function(ev){
							clearInterval(timer);
								var disX=ev.clientX-y;
								var disY=ev.clientY-x;
								document.documentElement.onmousemove=function(ev){
									speedX=ev.clientY-lastY;
									speedY=ev.clientX-lastX;
					
									lastX=ev.clientX;
									lastY=ev.clientY;
									x=ev.clientY-disY;
									y=ev.clientX-disX;
									//赋值
									move(-x/4,y/4);
								};
								document.documentElement.onmouseup=function(){
									timer=setInterval(function(){
										speedX*=0.95;
										speedY*=0.95;
										x+=speedX;
										y+=speedY;
										move(-x/4,y/4);
					
										if(Math.abs(speedX)<1 && Math.abs(speedY)<1){
											clearInterval(timer);
										}
					
									},30)
									document.documentElement.onmouseup=null;
									document.documentElement.onmousemove=null;
								};
								return false;
							}
							
					}
						
						
						aLi[0].addEventListener('transitionend',function(){
								for (var i = 0; i < aLi.length; i++) {
									aLi[i].style.transition='none';
									d=Math.abs(Math.abs((i*360/N)%360)-180)/180;
									if(d<0.3){
										d=0.3;
									}
									aLi[i].style.opacity=d;
								}
								oBbcon.innerHTML='';
						},false)
				})
				
			
			
			
//			第六页的作品1拖拽图片
			DOMReady(function(){
				var oBox=document.getElementById("personwork");
				var oUl=document.getElementById("c6_con");
				var aLi=oUl.getElementsByTagName('li');
				var aMask=oUl.getElementsByTagName('div');
				oUl.onmousedown=function(ev){
					var e=ev||event;
					var disX=e.clientX-oUl.offsetLeft;
					document.body.onmousemove=function(ev){  //用document.body,不然和下面有冲突
						var e=ev||event;
						var l=e.clientX-disX;
						
						if(l>oBox.offsetWidth/2-aLi[0].offsetWidth/2-aLi[0].offsetLeft){
							l=oBox.offsetWidth/2-aLi[0].offsetWidth/2-aLi[0].offsetLeft;
						}else if(l<-(aLi[aLi.length-1].offsetLeft+aLi[aLi.length-1].offsetWidth/2-oBox.offsetWidth/2)){
							l=-(aLi[aLi.length-1].offsetLeft+aLi[aLi.length-1].offsetWidth/2-oBox.offsetWidth/2)
						}
						
						oUl.style.left=l+'px';
						
						for(var i=0;i<aLi.length;i++){
							var dis1=oBox.offsetWidth/2;
							var dis2=aLi[0].offsetWidth/2+aLi[i].offsetLeft+oUl.offsetLeft;
							var c=Math.abs(dis2-dis1);
							var scale1=1-c/500;
							if(scale1<0.5){
								scale1=0.5;
							}
							aLi[i].children[0].style.width=scale1*520+'px';
							aLi[i].children[0].style.marginLeft=-(scale1*520-260)/2+'px';
							aLi[i].children[0].style.marginTop=-(scale1*358-179)/2+'px';
							aLi[i].children[0].style.zIndex=scale1*100;
						}
						
					}
					document.body.onmouseup=function(){
						document.body.onmousemove=null;
						document.body.onmouseup=null;
					};
					return false;
				};
				
			})

	//第六页的作品2手风琴
	DOMReady(function(){
				var oBox=document.getElementById("accordion");
				var aLi=oBox.getElementsByTagName('li');
				var c=Tween.Back.easeOut;   //运动曲线
				var w=30;
				for(var i=1;i<aLi.length;i++){
					aLi[i].style.left=aLi[0].offsetWidth-(aLi.length-i)*w+'px';
				}
				for(var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					aLi[i].onmouseover=function(){
						for(var i=0;i<aLi.length;i++){
							if(i<=this.index){
								move(aLi[i],{left:i*w,opacity:1},{time:500,easing:c});
							}else{
								move(aLi[i],{left:aLi[0].offsetWidth-(aLi.length-i)*w,opacity:0.6},{time:500,easing:c});
							}
						}
					};
					aLi[i].onmouseout=function(){
						for(var i=1;i<aLi.length;i++){
							move(aLi[i],{left:aLi[0].offsetWidth-(aLi.length-i)*w,opacity:0.6},{time:500,easing:c});
						}
					}
				}
	})
	
	
	//第六页的作品3照片墙
	DOMReady(function(){
		function getDis(obj1,obj2){
				var l1=obj1.offsetLeft+obj1.offsetWidth/2;
				var l2=obj2.offsetLeft+obj2.offsetWidth/2;
				var t1=obj1.offsetTop+obj1.offsetHeight/2;
				var t2=obj2.offsetTop+obj2.offsetHeight/2;
				var a=l2-l1;
				var b=t2-t1;
				return Math.sqrt(a*a+b*b);
			}
			
			function collTest(obj1,obj2){
				var l1=obj1.offsetLeft;
				var r1=obj1.offsetLeft+obj1.offsetWidth;
				var t1=obj1.offsetTop;
				var b1=obj1.offsetTop+obj1.offsetHeight;
				
				var l2=obj2.offsetLeft;
				var r2=obj2.offsetLeft+obj2.offsetWidth;
				var t2=obj2.offsetTop;
				var b2=obj2.offsetTop+obj2.offsetHeight;
				
				if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
                // 没有碰
                return false;
            } else {
                return true;
            }
			}
			
				var oBox=document.getElementById("picwall");
				var aLi=oBox.getElementsByTagName('li');
				var oBtn=document.getElementById("btn1");
				var arr=[];
				var num=1;//用于提升层级
				
				//获取每个li的坐标
					for(var i=0;i<aLi.length;i++){
						arr[i]={
							left:aLi[i].offsetLeft,
							top:aLi[i].offsetTop
						}
					}
				
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.position='absolute';
					aLi[i].style.left=arr[i].left+'px';
					aLi[i].style.top=arr[i].top+'px';
					aLi[i].style.margin=0;
				}
				
				
				//每个li都执行拖拽
			for(var i=0;i<aLi.length;i++){
					aLi[i].index = i;
                drag(aLi[i]); 
            }
			function drag(obj){
				obj.onmousedown=function(ev){
					var e=ev||event;
					var disX=e.clientX-obj.offsetLeft;
					var disY=e.clientY-obj.offsetTop;
					obj.style.zIndex=num++;
					document.body.onmousemove=function(ev){
						var e=ev||event;
						var l=e.clientX-disX;
						var t=e.clientY-disY;
						
						if(l<0){
							l=0;
						}else if(l>=obj.parentNode.offsetWidth-obj.offsetWidth){l=obj.parentNode.offsetWidth-obj.offsetWidth;}
						if(t<0){
							t=0;
						}else if(t>=obj.parentNode.offsetHeight-obj.offsetHeight){t=obj.parentNode.offsetHeight-obj.offsetHeight;}
						obj.style.left=l+'px';
						obj.style.top=t+'px';
						for (var i = 0; i < aLi.length; i++) {
                            aLi[i].style.border = '1px solid #666';
                        }
						var oNext = findNext(obj);
                        if (oNext) {
                            oNext.style.border = '3px dashed green';
                        }
					};
					document.body.onmouseup=function(){
						document.body.onmousemove=null;
						document.body.onmouseup=null;
						var oNext=findNext(obj);
						if(oNext){
							move(oNext,arr[obj.index],{time:500});
							move(obj,arr[oNext.index],{time:500});
							oNext.style.border = '1px solid #666';
						}else{
							move(obj,arr[obj.index]);
						}
						// 交换索引位置
                        var temp;
                        temp = oNext.index;
                        oNext.index = obj.index;
                        obj.index = temp;
						obj.releaseCapture&&obj.releaseCapture();
					};
					obj.setCapture&&obj.setCapture();
					return false;
				}
			}
				
				//找最近的物体
				function findNext(obj){
					var iMin=9999;
					var iMinIndex=-1;
					for(var i=0;i<aLi.length;i++){
						//自己，没有碰撞
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
						return null;
					}else{
						return aLi[iMinIndex];
					}
					
				}
				
				function change(){
					arr.sort(function(){
						return Math.random()-0.5;
					});
					for(var i=0;i<aLi.length;i++){
						move(aLi[i],arr[aLi[i].index],{time:500,fn:function(){
							oBtn.style.background='blue';
						}});
					}
				};
				
				//oBtn点击事件
				oBtn.onclick=change;
				document.onkeydown=function(ev){
					var e=ev||event;
					if(e.keyCode==13){
						oBtn.style.background='purple';
						change();
					}
				}
				
				oBtn.onmouseenter=function(){
					this.style.background='purple';
				};
				oBtn.onmouseout=function(){
					this.style.background='blue';
				};
	})
	
	
	//第六页作品4计算器
	DOMReady(function(){
		function cal(num1,num2,opr){
							var result=0;
							switch(opr){
									case '+':
											result=parseInt(num1)+parseInt(num2);
											break;
									case '-':
											result=num1-num2;
											break;
									case '*':
											result=num1*num2;
											break;
									case '/':
											result=num1/num2;
											break;
									default:
											result=num2;
							}
							return result;
					}
				var oCon=document.getElementById("calculatorcon");
				var oTxt=document.getElementById("txt111");
				var aLi=oCon.getElementsByTagName('li');
				var num1=0;
				var num2=0;
				var val='';//用于存储+-*/
				
				for(var i=0;i<aLi.length;i++){
					aLi[i].onclick=function(){
							var con=this.innerHTML;
							switch(con){
									case '+':
									case '-':
									case '*':
									case '/':
										var re=/\d+/;   //解决parseInt(*2)为NaN的问题
										var num=oTxt.value.match(re);
										num1=parseInt(num);
										oTxt.value=con;
										val=con;
										break;
										
									case '=':
											var re=/\d+/;
											var num=oTxt.value.match(re);
											num2=num;
											oTxt.value=cal(num1,num2,val).toFixed(2);
											break;
									case 'c':
											oTxt.value=0;
											break;
									default:
											if(oTxt.value==0){   //解决输入框开始为0的问题
												oTxt.value=this.innerHTML;
											}else{
												oTxt.value+=this.innerHTML;
											}
												
												break;
							}
						
					};
					
					aLi[i].onmouseover=function(){
						move(this,{opacity:1},{time:500});
					};
					aLi[i].onmouseout=function(){
						move(this,{opacity:0.6},{time:500});
					};
				}
	})
	
	//作品5爆炸
	DOMReady(function(){
		function rand(n,m){
			return parseInt(Math.random()*(m-n)+n);
		}
				var oBox=document.getElementById("boombox");
				var R=4;   //4行
				var C=7;    //7列
				var iNow=0;   //图片切换
				var ready=true;
				
				for(var c=0;c<C;c++){
					for(var r=0;r<R;r++){
						var oSpan=document.createElement('span');
						oSpan.style.transition='1s all ease';    //过渡完成之后取消了过渡,在此要重新定义过渡,不然切换异常
						oSpan.style.left=c*100+'px';      //跟列有关
						oSpan.style.top=r*100+'px';      //跟行有关
						oSpan.style.backgroundPosition=-c*100+'px -'+r*100+'px';   //背景位置
						oBox.appendChild(oSpan);
					}
				}
				
				
				var aSpan=oBox.children;
				document.onclick=function(){
					if(!ready)return;
					ready=false;
					iNow++;              //用于图片切换
					oBox.style.backgroundImage='url(./works/boom/img/'+iNow%3+'.jpg)';
					
					for(var i=0;i<aSpan.length;i++){
						aSpan[i].style.transition='1s all ease'; 
						//每个span运动到它到oBox的中心点的距离
						var x=aSpan[i].offsetLeft+aSpan[i].offsetWidth/2-oBox.offsetWidth/2;
						var y=aSpan[i].offsetTop+aSpan[i].offsetHeight/2-oBox.offsetHeight/2;
						//-180到180随机翻转,运动到不同的距离,同时放大1.5倍
						aSpan[i].style.transform='perspective(800px) translate('+x+'px,'+y+'px) rotateY('+rand(-180,180)+'deg) rotateX('+rand(-180,180)+'deg) scale(1.5)';
						aSpan[i].style.opacity=0;
					}
				};
				
				
				//过渡完成,开关打开,取消过渡,迅速回到初始状态,更换图片
				aSpan[0].addEventListener('transitionend',function(){
					ready=true;
					for(var i=0;i<aSpan.length;i++){
						aSpan[i].style.transition='none';//取消过渡,迅速回到初始状态
						aSpan[i].style.transform='perspective(800px) translate(0px,0px) rotateY(0deg) rotateX(0deg) scale(1)';
						aSpan[i].style.opacity=1;
						aSpan[i].style.backgroundImage='url(./works/boom/img/'+iNow%3+'.jpg)';//更换下一张图片
				
					}
				},false);
	})
	
	
	//第六页菜单
	DOMReady(function(){
				var oBox=document.getElementById("c6_img");
					var aImg=oBox.getElementsByTagName('img');
					document.onmousemove=function(ev){
						var e=ev||event;
						//用于限定其位置只能在鼠标移动的时候变大变小
						for(var i=0;i<aImg.length;i++){
							var t=oBox.offsetTop+aImg[i].offsetTop+aImg[i].offsetHeight/2-e.clientY;
							var l=oBox.offsetLeft+aImg[i].offsetLeft+aImg[i].offsetWidth/2-e.clientX;
							var z=Math.sqrt(l*l+t*t);
							var scale=1-z/400;
							if(scale<0.5){scale=0.5}
								aImg[i].style.width=scale*256+'px';
							}
					};
	})
			
			//菜单控制显示隐藏
			DOMReady(function(){
				var oContentIndex6=document.getElementById("content_index_6");
				var oC6Img1=document.getElementById("c6_img1");
				var oC6Img2=document.getElementById("c6_img2");
				var oC6Img3=document.getElementById("c6_img3");
				var oC6Img4=document.getElementById("c6_img4");
				var oC6Img5=document.getElementById("c6_img5");
				var oC6Img6=document.getElementById("c6_img6");
				var oHome=document.querySelector('.home');
				var oPersonwork=document.getElementById("personwork");
				var oAccordion=document.getElementById("accordion");
				var oPicWall=document.getElementById("picwall");
				var oCalculator=document.getElementById("calculator");
				var oBoom=document.getElementById("boom");
				
				
				var c=Tween.Back.easeOut;   //运动曲线
				
				
				
				go(oC6Img2,oAccordion);
				go(oC6Img1,oPersonwork);
				go(oC6Img3,oPicWall);
				go(oC6Img4,oCalculator);
				go(oC6Img5,oBoom);
				
				function go(obj1,obj2){
					obj1.onclick=function(){
						var oDiv=document.createElement('div');
						oDiv.className='home';
						oDiv.innerHTML='<img src="img/img2/home.png">';
						oContentIndex6.appendChild(oDiv);
						
						move(obj1.parentNode,{bottom:0,opacity:0},{time:1000,easing:c,fn:function(){
							move(obj2,{left:300,opacity:1},{time:1000,easing:c});
							move(oDiv,{opacity:1},{time:1000,easing:c})
						}});
						
						oDiv.onclick=function(){
								move(obj2,{left:1300,opacity:0},{time:1000,easing:c,fn:function(){
										move(obj1.parentNode,{bottom:50,opacity:1},{time:1000,easing:c});
									}});
								oContentIndex6.removeChild(this);
						};
					};
					
				}
				
				
				
				
				
				
			})
			
			
			
			
			//微信显示隐藏
			DOMReady(function(){
				var oWxbimg=document.getElementById("wxbimg");
				var oWxsimg=document.getElementById("wxsimg");
				var c=Tween.Back.easeOut;
				var timer=null;
				oWxbimg.onmouseover=oWxsimg.onmouseover=function(){
					clearTimeout(timer);
					move(oWxbimg,{width:200,height:200},{time:500,easing:c,fn:function(){
						
					}});
				};
				oWxbimg.onmouseout=oWxsimg.onmouseout=function(){
					timer=setTimeout(function(){
						move(oWxbimg,{width:0,height:0},{time:500,easing:c})
					},500);
				};
				
			});
			
			//bottom显示隐藏
			DOMReady(function(){
				var oBottom=document.getElementById("bottom");
				var c=Tween.Back.easeOut;
				var timer=null;
				oBottom.onmouseenter=function(){
					clearTimeout(timer);
					move(this,{bottom:0},{time:500,easing:c});
				};
				oBottom.onmouseleave=function(){
					var that=this;
					clearTimeout(timer);
					timer=setTimeout(function(){ //定时器用于缓冲1秒再执行回去的函数
						move(that,{bottom:-240},{time:500,easing:c});
					},1000);
				};
			});