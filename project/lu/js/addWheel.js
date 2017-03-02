function addEvent(obj,ev,fn){
	if(obj.attachEvent){obj.attachEvent('on'+ev,fn);
	}else{obj.addEventListener(ev,fn,false)}
}
function addWheel(obj,fn){
					function wheel(ev){
							var e=ev||event;
							var bDown=true;
							bDown=e.wheelDelta?e.wheelDelta>0:e.detail<0;
							fn&&fn(bDown);//函数存在则传参执行;
							e.preventDefault&&e.preventDefault();//ff下阻止有滚动条时不随滚动条滚动
							return false;
				}
				if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
								addEvent(obj,'DOMMouseScroll',wheel);
				}else{
								addEvent(obj,'mousewheel',wheel);
				}
				}