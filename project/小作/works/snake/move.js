				function getStyle(obj,name){
					if(obj.currentStyle){
						return obj.currentStyle[name];
					}else{
						return getComputedStyle(obj,false)[name];
					}
				}
				//complete包括:time,easing,fn
				function move(obj,json,complete){	
								complete=complete || {}; //存在则执行,否则为默认的
								complete.time=complete.time || 1000;  //存在则执行complete.time,否则为1000
								complete.easing=complete.easing || 'linear';//存在则执行complete.easing,否则为linear
								var start={};
								var dis={};
								for(var name in json){
									start[name]=parseFloat(getStyle(obj,name));
									dis[name]=json[name]-start[name];
								}
								var count=parseInt(complete.time/30);
								var n=0;
								clearInterval(obj.timer);
								obj.timer=setInterval(function(){
										n++;
										for(var name in json){
											switch(complete.easing){
													case 'linear':      //匀速
															var a=n/count;
															var cur=start[name]+dis[name]*a;
															break;
													case 'ease-in':   //加速
															var a=n/count;
															var cur=start[name]+dis[name]*a*a*a;
															break;
													case 'ease-out':    //减速
															var a=1-n/count;
															var cur=start[name]+dis[name]*(1-a*a*a);
															break;
											}
											if(name=='opacity'){
													obj.style.opacity=cur;
													obj.style.filter='alpha(opacity:'+cur*100+')';
											}else{obj.style[name]=cur+'px';}	
										}
										if(n==count){
											clearInterval(obj.timer);
											complete.fn&&complete.fn();
											}
										
							},30)
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
						if(r1>l2&&b1>t2&&l1<r2&&t1<b2){
							return true;
						}else{return false;}
		}