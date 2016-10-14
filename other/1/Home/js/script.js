window.onload=function(){
	var oContent=document.getElementById("content");
	var oNav_footder=document.getElementById("nav_footer");
	var bg=document.getElementById("bg");
	var oDiv=oContent.children;
	var oBtn=oNav_footder.children;
	var oBg=bg.children;
	var slii;
	for (var i=0; i<oBtn.length;i++) {
		oBtn[i].index=i;
		oBtn[i].onmouseenter=function(){
			document.getElementById('homeBg').style.opacity=0;
			document.getElementById('sli').style.opacity='0';
			for (var i=0; i<oBtn.length;i++) {
				oBtn[i].className='';
				oDiv[i].style.opacity=0;
				oBg[i].style.opacity=0;
			}
			this.className='active';
			oDiv[this.index].style.opacity=1;
			oBg[this.index].style.opacity=1;
			clearTimeout(slii);
		}
		oBtn[i].onmouseleave=function(){
			var _this=this;
				slii=setTimeout(function(){
				document.getElementById('homeBg').style.opacity=1;
				document.getElementById('sli').style.opacity='1';
				_this.className='';
				oDiv[_this.index].style.opacity=0;
				oBg[_this.index].style.opacity=0;
			},2000);
		}
	}
	var arr=['1Simplicity is the Ultimate Sophistication','2Simplicity is the Ultimate Sophistication','3Simplicity is the Ultimate Sophistication'];
	function goto(str){
		for (var i=0; i<str.length;i++) {
			var oSpan = document.createElement('span');
			oSpan.innerHTML=str.charAt(i);
			$('#sli_s').append(oSpan);
		}
		var iNow = 0;
		aSpan=$('#sli_s span')
		for (var i=0; i<aSpan.length;i++) {
			aSpan[i].style.opacity='0';
		}
		var timer = null;
		timer = setInterval(function(){
			move(aSpan[iNow],{opacity:1});
			iNow++;
			if(iNow == aSpan.length){
				clearInterval(timer);
			}
		},10);
	};
	function goop(){
		var iNow = 0;
		var timer = null;
		timer = setInterval(function(){
			aSpan[iNow].style.transition='.5s all ease';
			aSpan[iNow].style.opacity=0;
			iNow++;
			if(iNow == aSpan.length){
				clearInterval(timer);
			}
		},10);
	};
	var count=0;
	goto(arr[count]);
	
	setInterval(function(){
		goop();
		aSpan[aSpan.length-1].addEventListener('transitionend',function(){
			$('#sli_s').html('');
			count++;
			goto(arr[count%3]);
		},false);
	},5000);
};
