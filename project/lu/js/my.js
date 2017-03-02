$(function(){
//myskills栏目显示隐藏
	$('.mySkills-des li').on({
		'mouseenter':function(){
			$(this).find('.msd').animate({'bottom':0});
		},
		'mouseleave':function(){
			$(this).find('.msd').animate({'bottom':-80});
		},
	});
	
//myskills--变换位置
	var aLi=$('.mySkills-des li');
	var aPos=[]; 
	var arr1=[];
		//布局转换
	for(var i=0;i<aLi.length;i++){
		aPos[i]={left:aLi.eq(i).position().left,top:aLi.eq(i).position().top};
	}
	for(var i=0;i<aLi.length;i++){
		aLi.eq(i).css({
			'position':'absolute',
			'left':aPos[i].left,
			'top':aPos[i].top,
			'margin':0
		});
		aLi.eq(i)[0].index=i;//自定义属性
		arr1[i]=aLi.eq(i)[0].index;
	}
	$('.mySkills-btn1').on('click',change);
	function change(){
		arr1.sort(function(){
			return Math.random()-0.5;
		});
		for(var i=0;i<aLi.length;i++){
			aLi.eq(i).css({
				'left':aPos[arr1[i]].left,
				'top':aPos[arr1[i]].top
			})
		}
		
	}
	
//myskills--点击一下试试吧
	var timer1=null;
	var timer2=null;
	$('.mySkills-btn2').on('click',tmp);
	function tmp(){
		var count=0;
		clearInterval(timer1);
		timer1=setInterval(function(){
			(function(index){
				move(aLi[index],{left:1000,top:1300,width:0,height:0},{fn:function(){
					if(index==aLi.length-1){
						index=aLi.length-1;
						clearInterval(timer2);
						timer2=setInterval(function(){
							move(aLi[index],{width:300,height:150,left:aPos[index].left,top:aPos[index].top});
							index--;
							if(index==-1){
								clearInterval(timer2);
							}
						},100);
					}
				}});
			})(count);
			count++;
			if(count==aPos.length){
				clearInterval(timer1);
			}
		},100)
	}
	
});



//myWorks的无缝轮播
$(function(){
	var oParent=$('.myWorks-img ul');
	var oPre=$('.myWorks-img .pre');
	var oNext=$('.myWorks-img .next');
	var oChild=$('.myWorks-img ul li');
	var timer=null;
	var l=0;       //存储left值
	var speed=10;  //运动增值
	var ow=oChild.eq(0).outerWidth();//第一个li的宽度
	var ol=oChild.length*2;//li的个数
	if(oChild.eq(0)){
		var zw=(oChild.eq(0).outerWidth()+20)*2;//一次运动2个li
	}else{return;}
	
	oParent[0].innerHTML+=oParent[0].innerHTML;//复制一份
	oParent.css({
		'width':(ow+20)*ol//20是margin的值
	});
	var w=oParent.outerWidth()/2;
	function tab(){
		l+=speed;
		if(l%zw==0){
			clearInterval(timer);
		}
		oParent.css({
			'left':(l%w-w)%w
		});
	}
	oPre.on('click',function(){
			speed=-10;
			clearInterval(timer);
			timer=setInterval(tab,30);
	});
	oNext.on('click',function(){
		speed=10;
		clearInterval(timer);
		timer=setInterval(tab,30);
	});
	
});


//myWork抽奖
$(function(){
	var list=$('#content li');
	var len=list.length;
	var begin=$('#begin');
	var index=0;
	var remain=0;
	var timer=null;
	var bok=false;
	begin.on('click',function(){
		if(bok)return;//运动完之前防止点击
		bok=true;
		remain = 1500 + Math.random() * 5000;
		timer=setInterval(function(){
			if(remain<200){
				bok=false;
				alert( '你抽中了: '+list[index].innerHTML );
				clearInterval(timer);
			}else{
				list[index].className = "";    // 当前无色
				list[(index+1) % len].className = "current";  //下一个绿色
				index = ++index % len;    //index加一
				remain-= 100;      //减100
			}
		},100);
	})
});
//弹窗效果
$(function(){
	function prop(obj){
		obj.on('click',function(){
			$('.shadow').show();
		});
		$('.prompt h3 a,.btn-s1-small').on('click',function(){
			$('.shadow').hide();
		})
	}
	prop($('.rules a'))
});

//滚动条
window.onload=function(){
		var oBig=document.getElementById("big");
		var oSmall=document.getElementById("small");
		var oBox1=document.getElementById("protopy");
		var oBox2=document.getElementById("protopycon");
		var oPass=document.getElementById("pass");
		var num=0;
		var count=0;
		function setTop(t){
			if(t<0){t=0;}
			else if(t>oBig.offsetHeight-oSmall.offsetHeight){
					t=oBig.offsetHeight-oSmall.offsetHeight;
				}
				var scale=t/(oBig.offsetHeight-oSmall.offsetHeight);
				oSmall.style.top=t+'px';
				oBox2.style.top=scale*(oBox1.offsetHeight-oBox2.offsetHeight)+'px';
		}
		//鼠标事件
		oSmall.onmousedown=function(ev){
			var e=ev||event;
			var disY=e.clientY-oSmall.offsetTop;
			document.onmousemove=function(ev){
				var e=ev||event;
				var t=e.clientY-disY;
				setTop(t);
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oSmall.releaseCapture&&oSmall.releaseCapture();
			};
			oSmall.setCapture&&oSmall.setCapture();
			return false;
		};
		
		//键盘
		document.onkeydown=function(ev){
			var e=ev||event;
			var t=oSmall.offsetTop;
			switch(e.keyCode){
				case 38:
						t-=10;
						break;
				case 40:
						t+=10;
						break;
			}
			setTop(t);
			return false;
		};
		//滚轮事件
		addWheel(oPass,function(bDown){
			var t=oSmall.offsetTop;
			if(bDown){
				t-=10;
			}else{t+=10;}
			setTop(t);
		})
	};


//mypratice文字出现
$(function(){
	var timer1=null;
	var arr=['九月的这一天 洒下蓝色月光 洋李树下一片静默', '轻拥着  沉默苍白的吾爱  偎在我怀中  宛若美丽的梦','夏日晴空在我们之上  一朵白云攫住了我们的目光','如此洁白  至高无上  我再度仰望  却已不知去向'
    ];
	var oMyPratice=document.getElementById("myPractice-block");
	
	var count=0;
	var num=2;
	//每个文字一个div
	function show(str){
		for(var i=0;i<str.length;i++){
			var oDiv=document.createElement('div');
			oDiv.innerHTML=str.charAt(i);
			oMyPratice.appendChild(oDiv);
		}
		var aDiv=oMyPratice.getElementsByTagName('div');
		timer1=setInterval(function(){
			move(aDiv[count],{opacity:1},{time:1500});
			count++;
			if(count==aDiv.length){ //创建完成关定时器
				clearInterval(timer1);
			}
		},100);
	};
	$('.myPractice-item li').on({
		'mouseenter':function(){
			
			$('.myPractice-block').stop().animate({'height':120,time:800});//文字框出现
			show(arr[$(this).index()]);
			$('.myPractice-block').css({
				'border':'5px solid #996600'
			});
			$(this).css({//鼠标移入的div的层级最高
				'zIndex':num++,
			})
		},
		'mouseleave':function(){
			$('.myPractice-block').stop().animate({'height':0,time:800});
			$('.myPractice-block').html('');
			clearInterval(timer1);
			$('.myPractice-block').css({
				'border':'0px solid #996600'
			});
			count=0;
		}
	})
});


//myPractice无缝滚动
$(function(){
	var oParent=$('.myPractice-box');
	var oChild=$('.myPractice-box li');
	var timer=null;
	var l=0;
	var speed=2;
	var w=oChild.eq(0).outerWidth();
	var len=oChild.length*2;
	oParent.html(oParent.html()+oParent.html());
	oParent.css({
		'width':w*len//获取不到，必须在前面定义
	});
	var w=oParent.outerWidth()/2;
	function tab(){
		l-=speed;
		oParent.css({
			'left':(l%w-w)%w
		});
	}
	clearInterval(timer);
	timer=setInterval(tab,30);
	oParent.on({
		'mouseover':function(){
			clearInterval(timer);
		},
		'mouseout':function(){
			timer=setInterval(tab,30);
		}
	})
});

//侧边栏aside
$(function(){
	//回到顶部
	$('.toTop').on('click',function(){
			$('body,html').animate({'scrollTop':0},800);
			return false;
	});
	
	var index="";
	function findInLast(n,arr){  //找n>arr[i]的最后一位i值
		for(var i=0;i<arr.length;i++){
			if(n>arr[i]){  
				index=i;
			}
			
		}
		return index;
	}
	var arr=[];
	function move1(){
		arr=[];       //先清空
		var top=$(document).scrollTop()+$(window).height()/2;
		$('.item').each(function(index,ele){
			arr.push($(ele).position().top);//把每一个元素的高度存放在arr;
		});
		var num=findInLast(top,arr);
		$('.aside li').eq(num).addClass('active').siblings('li').removeClass('active');	
	}
	$(document).on('scroll',move1);  //滚动改变背景class
	$('.aside li').on('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		$('html,body').animate({scrollTop:arr[$(this).index()]},'800');
		return false;  //阻止默认事件，防止出现选中文字；
	});
	
})



