function DOMReady(fn){  //快速加载页面内容
				if(document.addEventListener){
					    document.addEventListener('DOMContentLoaded',function(){   //不兼容IE8--;系统自带的
						   fn&&fn();
					     },false);
				}else{
				      document.attachEvent('onreadystatechange',function(){ //ie8--使用,模拟的;
				    	if(document.readyState=='complete'){
						   fn&&fn();
						   }
				  		   })
					   }
			}


function getStyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}
				else{
					return getComputedStyle(obj,false)[attr];	
				}
			}

function setStyle(){
				var obj=arguments[0];
				if(arguments.length==3){
					var name=arguments[1];
					var value=arguments[2];
					obj.style[name]=value;
				}
				else{
					var json=arguments[1];
					for(var name in json){
						obj.style[name]=json[name];
					}
				}
			}