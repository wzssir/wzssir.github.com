function json2str(json){    //将json转str
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));  //encodeURIComponent兼容汉字
	}
	return arr.join('&');
}

//json:url,data,type,success,error   data是url？后面的东西,type是获取方式
function ajax(json){  
	json=json||{}; //判断json是否存在,存在则为json
	if(!json.url) return;//json.url为空则停止
	json.data=json.data||{};//判断json.data是否存在,存在则为json.data
	json.type=json.type||'GET';//获取方式默认为GET
	json.timeout=json.timeout||10000;//超时处理
	
	//1.创建一个ajax对象
	if(window.XMLHttpRequest){//可以用undefined作为判断条件,但不能用error作为判断条件;变量不定义,加window相当于undefinded;
		var oAjax = new XMLHttpRequest();   //用于非ie6
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHttp');//用于ie6;Microsoft公司的插件
	}
	switch(json.type.toLowerCase()){
		case 'get':
						//2.建立连接  是否异步
					oAjax.open('GET',json.url+'?'+json2str(json.data),true);
					//3.发送
					oAjax.send();
					break;
		case 'post':
					oAjax.open('POST',json.url,true);
					oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded')
					oAjax.send(json2str(json.data));
					break;
	}
		json.loading&&json.loading();  //加载事件
		
	//如果超过指定时间没有请求到数据
	var timer=setTimeout(function(){
			json.complete&&json.complete();//完成事件,跟成功失败无关
			json.error&&json.error(oAjax.status);
			oAjax.onreadystatechange=null;
	},json.timeout);
	//4.接收
	oAjax.onreadystatechange = function(){
		     //网络状态readyState
		if(oAjax.readyState == 4){   //接收完成   0,初始化1,建立连接2.发送3.接收4.完成
		    //http的状态status
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status == 304){   //接收成功  200-300接收成功 304未修改 404未找到
				//从服务器返回的文本
					clearTimeout(timer);   //成功失败都要关定时器
					json.complete&&json.complete();
					json.success&&json.success(oAjax.responseText);	//如果成功,服务器返回的文本内容	
			}else{
					clearTimeout(timer);
					json.complete&&json.complete();
					json.error&&json.error(oAjax.status);//如果错误,服务器返回的错误码
			}
		}
	};
	
}	
