// css加载
function loadingCss(cssHref,_callback){
	var _doc=document.getElementsByTagName('head')[0];  
	var link=document.createElement('link');  
    link.setAttribute('type','text/css');  
    link.setAttribute('rel','stylesheet'); 
    link.setAttribute('href',cssHref);  
    _doc.appendChild(link);  
    link.onload=link.onreadystatechange=function(){
       if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){  
       		_callback();
        }
        link.onload=link.onreadystatechange=null;
    }
}
