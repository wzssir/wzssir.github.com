



window.onload=function(){
	
	
	
//导航	
	var LP_Products=document.getElementsByClassName('LP-Products');
	var LP_proNavBox=document.getElementsByClassName('proNavBox');
	var LP_proNav1=document.getElementsByClassName('proNav-1');
	var LP_proNav1LI=LP_proNav1[0].getElementsByTagName('li');
	var LP_proNav2=document.getElementsByClassName('proNav-2');
	var LP_proNav2LI=LP_proNav2[0].getElementsByTagName('li');
	var LP_Nav=document.getElementsByClassName('nav')[0];
	var LP_NavLi=LP_Nav.getElementsByTagName('li');
	var arr=['background-position:15px -1621px;','15px -1676px'];
	var oldLI=null;
	var num=0;
	LP_Products[0].onmouseover=function(){
		LP_proNavBox[0].style.display='block';
	};
	LP_Products[0].onmouseout=function(){
		LP_proNavBox[0].style.display='none';
	};
	LP_proNav1LI[0].onmouseover=function(){
		LP_proNav2LI[0].style.display='block';
		LP_proNav2LI[1].style.display='none';
		this.getElementsByTagName('a')[0].style.cssText="background-position: 15px -1621px;background-color: #141520;color: #4999F2;";
	};
	LP_proNav1LI[1].onmouseover=function(){
		LP_proNav2LI[1].style.display='block';
		LP_proNav2LI[0].style.display='none';
		this.getElementsByTagName('a')[0].style.cssText="background-position: 15px -2434px;background-color: #141520;color: #4999F2;";
	};
	for (var i=0;i<2;i++) {
		LP_proNav1LI[i].onmouseout=function(){
			this.getElementsByTagName('a')[0].style.cssText='';
		};
	}
//导航


//LP_Products-community-control
	var oCont=document.getElementById('comtyCont');
	var aContLI=oCont.getElementsByTagName('li');
	var oContImg=document.getElementById('controlImg');
	var oImg=oContImg.getElementsByTagName('img')[0];

	var arrUrl=['../img/community_09.png','../img/community_09.gif','../img/community_09.png','../img/community_09.gif','../img/community_09.png','../img/community_09.gif']
	var num=0;
	var oldLI=null;
	oldLI=aContLI[num];
	
	//初始化
	
	for (var i=0;i<6;i++) {
		aContLI[i].index=i;
		aContLI[i].onmouseover=function(){
			this.className='high';
			oImg.src=arrUrl[this.index];
			oldLI.className='';
			oldLI=this;
			this.className='high';
			
		};
	}
//LP_Products-community-control 
};



