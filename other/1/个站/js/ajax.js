function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]))
	}
	return arr.join('&')
}
function ajax(json){
	json=json||{};
	if(!json.url)return;
	json.data=json.data||{};
	json.type=json.type||'GET';
	json.timeout=json.timeout||10000;
	if(window.XMLHttpRequest){
		var oAjax= new XMLHttpRequest();
	}else{
		var oAjax= new ActiveXObject("Microsoft.XMLHttp")
	}
	switch(json.type.toLowerCase()){
		case 'get':
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);
		oAjax.send();
		break;
		case 'post':
		oAjax.open('POST',json.url,true);
		oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded')
		oAjax.send(json2url(json.data));
		break;
	}
	json.loading&&json.loading();

	var timer=setTimeout(function(){
		json.complete&&json.complete();
		json.error&&json.error(oAjax.status)
		oAjax.onreadystatechange=null;
	},json.timeout)

	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				clearTimeout(timer);
				json.complete&&json.complete();
				json.success&&json.success(oAjax.responseText)
			}else{
				clearTimeout(timer);
				json.complete&&json.complete();
				json.error&&json.error(oAjax.status)
			}
		}
	}
}