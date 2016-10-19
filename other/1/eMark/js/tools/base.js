/**
 * @ eMark公共js
 * @ date	2014-09-03 13:26:29
 */
$(function(){
	//setMenu();
	testPlaceHolder();
	radioCheck();
	toUpperCaseFunc();
	onlyEnglish();
	$(".selectContainer").select();
	limiteNum();
	if($('.J_country').length>0){
		countryFunc();
	}
	if($('.J_rule').length>0){
		feeRulesFunc();
	}
	if($('.J_different').length>0){
		differenceFunc();
	}
	tabFunc();
	if($('.my_emark_handle').length>0){
		signOut();
		setUp();
	}
	//图片展示
	if($('.J_show_upload_btn').length>0){				
		$('.J_show_upload_btn').click(function(){
			var _src=$(this).siblings('.m_upload_box').find('.m_upload_img').attr('src');
			if(_src!=''){
				//$('.m_checkImg_dialog').find('.m_upload_img').attr('src',_src);
				imgSize(_src,$('.m_checkImg_dialog').find('.m_upload_img'));
				$('.m_checkImg_dialog').show();
			}
		});
		$('.m_checkImg_dialog .m_dialog_close').click(function(){
			$('.m_checkImg_dialog').find('.m_upload_img').attr('src','');
			$('.m_checkImg_dialog').hide();
		});
	}
});
function setUp(){
	$('.my_emark_handle').on('click',function(e){
		e.stopPropagation();
		var _setUp_ul = $(this).parent().find('.user_ul');
		if($('.my_emark_user').hasClass('active')){
				_setUp_ul.slideUp();
				$('.my_emark_user').removeClass('active');
			}else{
				_setUp_ul.slideDown();
				$('.my_emark_user').addClass('active');
			}
	});
	$(document).on('click',function(){
		$('.my_emark_user .user_ul').slideUp();
		$('.my_emark_user').removeClass('active');
	});
}
function signOut(){
	$('.J_sign_out').live('click',function(e){
		e.stopPropagation();
		$.dialog({
			content: 'Are you sure to sign out？',
			type:2,
			messageCallback : function(){
				window.location.href='login.html';
				return true;
			}
		});
	});
}
//点击收费规则出现弹窗
function feeRulesFunc(){
	$('.J_rule').click(function(){
		if($('.m_rules_dialog').length<1){
			$('body').append(_feeRules);
			scrollBar('.m_rules_dialog .m_wrapper');
		}
	});
	$(document).delegate('.m_dialog_close','click',function(){
		$(this).parents('.m_dialog_box').remove();
	});
}
//点击两者有什么不同出现弹窗
function differenceFunc(){
	$('.J_different').click(function(){
		if($('.m_difference_dialog').length<1){
			$('body').append(_difference);
			scrollBar('.m_difference_dialog .m_wrapper');
		}
	});
	$(document).delegate('.m_dialog_close','click',function(){
		$(this).parents('.m_dialog_box').remove();
	});
}
function imgSize(url,obj){
    var objImg = new Image();
    objImg.onload = function(){
        var _width=objImg.width;
        var _height=objImg.height;
        var _newWidth=0;
        var _newHeight=0;
        var _pWidth=obj.parent().width();
        console.log(_width+','+_height+','+_pWidth);
        if(_width>_height){
            _newWidth=_pWidth;
            _newHeight=_newWidth*_height/_width;
            var _pWidth=obj.parent().width();
            obj.css({'width':_newWidth,'height':_newHeight,'margin':(_pWidth-_newHeight)/2+'px 0 0 0'}).attr('src',url);
        }else{
            obj.css({'width':'auto','height':'100%','margin':'0 auto'}).attr('src',url);
        }
        console.log(_newWidth+','+_newHeight);
    }
    objImg.src = url;
}
var DispClose = true; 
function CloseEvent() { 
	/// TODO 是否出现提示,若不需要,将DispClose 设为false
    if (DispClose) { 
        return "This page requires you to confirm that you want to leave ,the data you entered may not be saved.";  
    }  
}
/*tab切换*/
function tabFunc(){
	$(document).delegate('.trademark_tab_title','click',function(){
		var _index=$(this).index();
		console.log(_index);
		$(this).addClass('active').siblings('.trademark_tab_title').removeClass('active');
		$(this).parents('.trademark_tab_list').find('.trademark_tab_list_check').eq(_index).show().siblings('.trademark_tab_list_check').hide();
	});
}
/*选择城市*/
function countryFunc(){
	var _countryParent=null;
	$(document).delegate('.J_country','click',function(){
		_countryParent=$(this);
		if($('.m_country_dialog').length<1){
			$('body').append(_country);
			scrollBar('.m_country_dialog .m_wrapper');
		}
	});
	$(document).delegate('.m_country_dialog .m_iscroll_right li','click',function(){
		var _countryName=$(this).find('i').text();
		_countryParent.val(_countryName);
		$(this).parents('.m_dialog_box').remove();
	});
	$(document).delegate('.m_country_dialog .m_dialog_close','click',function(){
		$(this).parents('.m_dialog_box').remove();
	});
}
//转换成大写
function toUpperCaseFunc(){
	$('.c_toUpper_input').bind('keyup',function(e){
		var _value=$(this).val().toUpperCase();
		$(this).val(_value);
			//alert(e.keyCode);
		//console.log(e.keyCode);
		/*if(e.keyCode==13){
			var _value=$(this).val().toUpperCase();
			$(this).val(_value);
		}*/
	});
}
//单选
function radioCheck(){
	$(document).delegate('.m_label','click',function(){
	    $(this).parents('.m_radio').find('.m_label').removeClass('checked');
	    $(this).addClass('checked');
	});
}
//验证
function isName(str){ 
	//var reg = /^[A-Za-z\s\.]+$/; *
	//var reg = /^[A-Za-z\s\.\-(\\([A-Za-z\s\.\-]*\\))*]+$/; 
	var reg = /^[A-Za-z\s\.\-\\(\\)]+$/; 
	//var reg = /^[A-Za-z\s]+([\.\-\\(\\)]?[A-Za-z\s])+$/; 
	//var reg = /^[A-Za-z\s]+([\.-\(\)]?[A-Za-z\s]+)+$/; 
	//return reg.test(str); 
	return true;
}
function isEmail(str){ 
	//var reg = /^([a-zA-Z0-9_-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
	var reg = /^(\w+[-+.]?\w+)@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}
function isPassword(str){ 
	var reg = /^[a-zA-Z0-9]+$/; 
	return reg.test(str); 
}
//按钮置灰
$.fn.extend({
	setDisabled : function(){
		$(this).attr('disabled','disabled').addClass('disabled');
	},
	removeDisabled : function(){
		$(this).removeAttr('disabled').removeClass('disabled');
	}
});
// input文字截取 data-limite="x" 写在行间
function limiteNum(){
	if($('.f_limit_text_num').size()>0){
		$('.f_limit_text_num').each(function(){
			var _limit = $(this).attr('data-limit');
			$(this).inputs({
				limit : _limit,  
				key: true
			});
		})
	}
}
function onlyEnglish(){
	if($('input').size()>0||$('textarea').size()){
		$("input,textarea").each(function() {
			var _this= $(this);
			_this.on("keyup blur",function(e){
				if(e.keyCode<37||e.keyCode>40){
					var val = _this.val();
					val = val.replace(/[^0-9a-zA-Z\u0000-\u00FF]/g,'');
					_this.val(val);
				}
			});

		 }); 
	}
}
// 截字符串方法
function setCutoutLen(str, len) {
	//中文.charCodeAt(0)>=299
	var l = 0; 
	var a = str.split(""); //把传过来的字符串转成数组
	var arr = [];
	for (var i=0;i<a.length;i++) { 
		if (a[i].charCodeAt(0)<299) {
			l++;
			if (l>len){
				break;
			}else{
				arr.push(a[i]);
			}
		} else { 
			l+=2; 
			if (l>len){
				break;
			}else{
				arr.push(a[i]);
			}
		} 
	} 
	return arr.join('');
};
function LimitSize(_element){
	this.e        = (typeof _element != String)?_element.value:_element;
	this.e_length = 0;
	if(this.e.replace(/\n*\s*/,'')==''){
		this.e_length = 0
	}else{
		this.e_length = this.e.match(/[^ -~]/g) == null ? this.e.length : this.e.length + this.e.match(/[^ -~]/g).length;
	}
	return this.e_length;
};
// jQuery组件
$.fn.extend({
	/*
	 * input/textarea 截字/报错/判断
	 * @name inputs
	 * @param {string}		parent				 是否事件委托
	 * @param {string} 		limit			 字体数量
	 * @param {string} 		fcls					 聚焦添加class 
	 * @param {string} 		type					 执行回调地方（手机失去焦点执行回调/其他onkeyup执行回调）
	 * @param {Boole} 		key					 是否截字
	 * @param {function} 	callback			 回调
	 * @return {none}
	 * @ps：如需聚焦input/textarea内容清空需在元素内加自定义属性_def="value"
	*/
	inputs:function(option){
		var _this=$(this),
			  _val=_this.val(),
			  _def=option.def || _this.attr("_def"),
			  _fcls=option.fcls || '',
			  $parent		= option.parent ? $(option.parent) : this,
			  _parent=option.parent||this,
			  _limit=option.limit,
			  _key  = option.key || false,
			  _type=option.type|| '' ,
			  _callback=option.callback,
			  selector	= option.parent ? this.selector : undefined;
		$parent.on("focus",selector,function(){
			_this=$(this);
			_val=_this.val();
			_this.addClass(_fcls);
			
			(_def==_val)&&_this.val("");
		}).on("blur",selector,function(e){
			_this=$(this);
			_val=_this.val();
			var fsize=LimitSize(this),
				  showf=setCutoutLen(_val,_limit),
				  n=fsize-_limit,
				  eve=e.type;
			(_val=="")&&_this.removeClass(_fcls);
			(_val=="")&&_this.val(_def);
			if (_type!=""){
				(_callback || function(){}).call(this,eve);
			}else{
				((fsize>_limit)&&!_key)?(_callback || function(){}).call(this,n,eve):(_callback || function(){}).call(this,n,eve);
			}
		}).on("keyup",selector,function(e){
			_this=$(this);
			_val=_this.val();
			var fsize=LimitSize(this),
				  eve=e.type,
				  showf=setCutoutLen(_val,_limit);
			_key&&((fsize>_limit)&&_this.val(showf));
			var n=fsize-_limit;
			if (_type==""){
					((fsize>_limit)&&!_key)?(_callback || function(){}).call(this,n,eve):(_callback || function(){}).call(this,n,eve);
			}
		}).on("change",selector,function(e){
			_this=$(this);
			_val=_this.val();
			var fsize=LimitSize(this),
				  eve=e.type,
				  showf=setCutoutLen(_val,_limit);
			_key&&((fsize>_limit)&&_this.val(showf));
			var n=fsize-_limit;
			if (_type==""){
					((fsize>_limit)&&!_key)?(_callback || function(){}).call(this,n,eve):(_callback || function(){}).call(this,n,eve);
			}
		})
	},
	/**
	 * inser 文本框插入text
	 * @name inser
	 * @param {string}	myValue		插入的值
	 **/
	inser: function(myValue){
		var $t=$(this)[0];
		if (document.selection) {
			this.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			this.focus();
		}else 
		if ($t.selectionStart || $t.selectionStart == '0') {
			var startPos = $t.selectionStart;
			var endPos = $t.selectionEnd;
			var scrollTop = $t.scrollTop;
			$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
			this.focus();
			$t.selectionStart = startPos + myValue.length;
			$t.selectionEnd = startPos + myValue.length;
			$t.scrollTop = scrollTop;
		}else {
			this.value += myValue;
			this.focus();
		}
	}
});
/*字体搜索*/
$.fn.textSearch = function(str,options){
	var defaults = {
		divFlag: true,
		divStr: " ",
		markClass: "",
		markColor: "red",
		nullReport: true,
		callback: function(){
			return false;	
		}
	};
	var sets = $.extend({}, defaults, options || {}), clStr;
	if(sets.markClass){
		clStr = "class='"+sets.markClass+"'";	
	}else{
		clStr = "style='color:"+sets.markColor+";'";
	}
	
	//对前一次高亮处理的文字还原		
	$("span[rel='mark']").each(function() {
		var text = document.createTextNode($(this).text());	
		//console.log(text);
		//var text = document.createTextNode($(this).text());	
		$(this).replaceWith($(text));
	});
	//console.log($(this).attr('class'));
	$(this).parents('tr').show();
	//字符串正则表达式关键字转化
	$.regTrim = function(s){
		var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
		var imp_c = {};
		imp_c["^"] = "\\^";
		imp_c["."] = "\\.";
		imp_c["\\"] = "\\\\";
		imp_c["|"] = "\\|";
		imp_c["("] = "\\(";
		imp_c[")"] = "\\)";
		imp_c["*"] = "\\*";
		imp_c["+"] = "\\+";
		imp_c["-"] = "\\-";
		imp_c["$"] = "\$";
		imp_c["["] = "\\[";
		imp_c["]"] = "\\]";
		imp_c["?"] = "\\?";
		//console.log(s);
		s = s.replace(imp,function(o){
			return imp_c[o];					   
		});	
		return s;
	};
	$(this).each(function(i){
		var t = $(this);
		str = $.trim(str);
		if(str === ""){
			return false;
		}else{
			//将关键字push到数组之中
			var arr = [];
			if(sets.divFlag){
				arr = str.split(sets.divStr);	
			}else{
				arr.push(str);	
			}
		}
		var v_html = t.html();
		//console.log('v_html:'+v_html);
		//var v_html = t.html().toLowerCase();
		//删除注释
		v_html = v_html.replace(/<!--(?:.*)\-->/g,"");
		
		//将HTML代码支离为HTML片段和文字片段，其中文字片段用于正则替换处理，而HTML片段置之不理
		var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
		var a = v_html.match(tags), test = 0;
		$.each(a, function(i, c){
			if(!/<(?:.|\s)*?>/.test(c)){//非标签
				//开始执行替换
				$.each(arr,function(index, con){
					if(con === ""){return;}
					var reg = new RegExp($.regTrim(con), "g");
					if(reg.test(c)){
						//正则替换
						c = c.replace(reg,"♂"+con+"♀");
						test = 1;
					}
				});
				c = c.replace(/♂/g,"<span rel='mark' "+clStr+">").replace(/♀/g,"</span>");
				a[i] = c;
			}
		});
		//将支离数组重新组成字符串

		//console.log('a:'+a);
		var new_html = a.join("");
		
		//console.log('new_html:'+new_html);
		$(this).html(new_html);
		
		if(test === 0 && sets.nullReport){
			alert("没有搜索结果");	
			return false;
		}
		
		//执行回调函数
		sets.callback();
	});
};
//自定义滚动条
function scrollBar(iscrollParent)
{
	var oDiv1 = $(iscrollParent);
	var oDiv2 = oDiv1.find('.m_iscroll').get(0);
	var oDiv3_jq = oDiv1.find('.m_bar_box');
	var oDiv3 = oDiv1.find('.m_bar_box').get(0);
	var oDiv4 = oDiv1.find('.m_bar').get(0);
	oDiv1=oDiv1.get(0);
	/*oDiv2.style.position='absolute';
	oDiv2.style.height='auto';*/
	oDiv2.style.top = 0;
	oDiv4.style.top = 0;
	var _pHeight=oDiv1.clientHeight;
	var _cHeight=oDiv2.clientHeight;
	var _bbHeight=oDiv3.clientHeight;
	var disY = 0;
	var T = 0;
	if(_pHeight/_cHeight>=1){
		oDiv4.style.height = '100%';
		//oDiv3.style.display='none';
	}else{
		//oDiv3.style.display='block';
		oDiv4.style.height =_pHeight/_cHeight*_bbHeight+'px';
	}
	var _bHeight=oDiv4.clientHeight;
	var iMaxHeight =_bbHeight - _bHeight;
	oDiv4.onmousedown = function(ev) {
		var ev = ev || event;
		disY = ev.clientY - this.offsetTop;
		oDiv3_jq.addClass('active');
		document.onmousemove = function(ev) {
			var ev = ev || event;
			var T = ev.clientY - disY;
			if (T < 0) {
				T = 0;
			} else if (T > iMaxHeight) {
				T = iMaxHeight;
			}
			var iScale = T / iMaxHeight;
			oDiv2.style.top = (_pHeight - _cHeight) * iScale + 'px';
			oDiv4.style.top = T + 'px';
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			oDiv3_jq.removeClass('active');
		}
		return false;
	}
	oDiv3.onmousewheel = fn1;
	oDiv1.onmousewheel = fn1;
	if (oDiv3.addEventListener) {
		oDiv3.addEventListener('DOMMouseScroll', fn1, false);
		oDiv1.addEventListener('DOMMouseScroll', fn1, false);
	}
	function fn1() {
		iMaxHeight =_bbHeight - _bHeight;
		var ev = event || window.event;
		var iBtn = true;
		if (ev.wheelDelta) {
			iBtn = ev.wheelDelta > 0 ? true : false;
		} else {
			iBtn = ev.detail < 0 ? true : false;
		}
		var T = 0;
		if (iBtn) {
			T = oDiv4.offsetTop - 10;
		} else {
			T = oDiv4.offsetTop + 10;
		}
		if (T < 0) {
			T = 0;
		} else if (T > iMaxHeight) {
			T = iMaxHeight;
		}
		var iScale = T / iMaxHeight;
		oDiv4.style.top = T + 'px';
		oDiv2.style.top = (_pHeight - _cHeight) * iScale + 'px';
		if (ev.preventDefault) {
			ev.preventDefault();
		}
		return false;
	}
}
// 判断浏览器是否支持placeholder
function testPlaceHolder(){
	if(!('placeholder' in document.createElement('input'))){
		$('input[placeholder],textarea[placeholder]').each(function(){
			var that = $(this),
			text= that.attr('placeholder');
			if(that.val()===""){
				that.val(text).addClass('placeholder');
			}
			that.focus(function(){
				if(that.val()===text){
					that.val("").removeClass('placeholder');
				}
			}).blur(function(){    
				if(that.val()===""){    
					that.val(text).addClass('placeholder');    
				}
			}).closest('form').submit(function(){
				if(that.val() === text){
					that.val('');
				}
			});
			that.focus().blur();
		});
		$(document).scrollTop(0);
	}
}
/*自定义下拉框*/
jQuery.fn.select = function(options){
    return this.each(function(){
        var $this = $(this);
        var $shows = $this.find(".shows");
        var $selectOption = $this.find(".selectOption");
        var $el = $this.find("ul > li");

        $this.click(function(e){
			$(this).parents('li').siblings().find('.dis').removeClass('dis');
			$(this).parents('li').siblings().find('.zIndex').removeClass('zIndex');
            $(this).toggleClass("zIndex");
            $(this).children("ul").toggleClass("dis");
            $('.selectContainer').not($(this)).removeClass('zIndex').children("ul").removeClass("dis");
            e.stopPropagation();
        });

        $el.live("click",function(e){
        	e.stopPropagation();
            var $this_ = $(this);
            if($this_.parents('#J_prince').length>0){
            	var _city=$this_.attr('val');
		    	$('#J_city ul').html('');
		    	$('.J_city').html('').removeAttr('data-value');
		    	var _html='';
		    	for(var i=0;i<_json[_city].length;i++){
		    		_html+="<li val='"+_json[_city][i]+"'>"+_json[_city][i]+"</li>";
		    	};
		    	$('#J_city ul').html(_html);
            }
            $this.find("span").removeClass("gray");
            $this_.parent().parent().find(".selectOption").text($this_.text()).attr('data-value',$this_.attr('val'));
            if($this_.parent().parent().find(".J_select_input").size()>0){
            	$this_.parent().parent().find(".J_select_input").val($this_.attr('val'));
            }
            $this.removeClass("zIndex");
            $this.find("ul").removeClass("dis");
        });

        $("body").bind("click",function(){
            $this.removeClass("zIndex");
            $this.find("ul").removeClass("dis");
        })

        //eahc End
    });

};
/*弹窗*/
$.dialog = function(options) {
    var settings = {
        content: "ok",
        type:2,
        ok:'YES',
        cancel:'NO',
        setTime:2000,
        autoHide:true,      //是否自动消失
        init: function() {
        }, //给一个初始化方法，然后可以处理绑定content传来的数据
        messageCallback: null,
        cancelCallback: function(){}
    }
    var DEFAULTS = $.extend({}, settings, typeof options == 'object' && options);

    var Dialog = function() {
        //初始化属性

    }
    if($('.dialog_box').length>0){
    	$('.dialog_box').remove();
    }
    if(DEFAULTS.type!=0){
        var html='<div class="dialog_box"><div class="dialog_mask"></div><div class="dialog_content"><p class="dialog_text">' + DEFAULTS.content + '</p><div class="dialog_foot"><button class="sureBtn">'+DEFAULTS.ok+'</button><button class="cancelBtn">'+DEFAULTS.cancel+'</button></div></div></div>';
    }else{
        var html='<div class="dialog_box"><div class="dialog_mask"></div><div class="dialog_content"><p class="dialog_text">' + DEFAULTS.content + '</p></div></div>';
    }

    Dialog.prototype = { 
        windowHeight:0,
        dialog: function(html,DEFAULTS) {
            var self = this;
            var $container = document.getElementsByTagName('body')[0];
            var $html = this.checkElem(html);
            $container.appendChild($html);
            //事件绑定，可以封装到一个方法里
            DEFAULTS.init();
            if(DEFAULTS.type!=0){
                if(DEFAULTS.type==1){
                  var $buttonBox = $('.dialog_box .dialog_foot');
                  $buttonBox.html('<button class="sureBtn">'+DEFAULTS.ok+'</button>');
                }
                var $Cancel = $('.dialog_box .cancelBtn');
                if($Cancel){
                    $Cancel.click(function() {
                        self.setClose();
                        DEFAULTS.cancelCallback();
                        return false;
                    });
                }
                var $determine = $('.dialog_box .sureBtn');
                if($determine){
                    $determine.click(function() {
                        if(!DEFAULTS.messageCallback){
                            self.setClose();
                            return false;
                        }
                        if (typeof(DEFAULTS.messageCallback) === "function") {
                            /*var call = DEFAULTS.messageCallback();*/
                            DEFAULTS.messageCallback();
                        }
                        //if (call) {
                            self.setClose();
                        //}
                        //return true;
                    });
                }                    
            }else{
                setTimeout(function(){
                    if (typeof(DEFAULTS.messageCallback) === "function") {
                         DEFAULTS.messageCallback();
                    }
                    if(DEFAULTS.autoHide)
                        self.setClose();
                },DEFAULTS.setTime);
            }
        },
        //转化为dom
        checkElem: function(a) {
            var r = null;
            if (a.constructor == String) {
                var div = document.createElement('div');
                div.innerHTML = a;
                r = div.childNodes;
            } else {
                r = a;
            }
            return r[0];
        },
        //弹出框关闭 
        setClose: function() {
            var $containerDialog = $('.dialog_box').get(0);
            $containerDialog.parentNode.removeChild($containerDialog);
        }
    }                
    if (!$.data.dialog)
        $.data.dialog =  new Dialog();
    $.data.dialog.dialog(html,DEFAULTS);
};

var _country="<div class='m_dialog_box m_country_dialog'>"+
	"<div class='m_dialog_mask'></div>"+
	"<div class='m_dialog_content'>"+
		"<h3 class='m_dialog_title fix'><span class='m_dialog_close'>×</span></h3>"+
		"<div class='m_wrapper'>"+
			"<div class='m_iscroll'>"+
				"<ul class='m_iscroll_content'>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>A</span>"+
						"<ul class='m_iscroll_right fix'>"+
							"<li><i>AFGHANISTAN</i></li>"+
							"<li><i>ALBANIA</i></li>"+
							"<li><i>ALGERIA</i></li>"+
							"<li><i>ARMENIA</i></li>"+
							"<li><i>ANGOLA</i></li>"+
							"<li><i>ARGENTINA</i></li>"+
							"<li><i>AUSTRIA</i></li>"+
							"<li><i>AUSTRALIA</i></li>"+
							"<li><i>AZERBAIJAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>B</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>BANGLADESH</i></li>"+
						"<li><i>BELGIUM</i></li>"+
						"<li><i>BURKINAFASO</i></li>"+
						"<li><i>BULGARIA</i></li>"+
						"<li><i>BULGARIA</i></li>"+
						"<li><i>BURMA</i></li>"+
						"<li><i>BURUNDI</i></li>"+
						"<li><i>BENIN</i></li>"+
						"<li><i>BRUNEI DARUSSALAM</i></li>"+
						"<li><i>BOLIVIA</i></li>"+
						"<li><i>BRAZIL</i></li>"+
						"<li><i>BOTSWANA</i></li>"+
						"<li><i>BYELORUSSIA</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>C</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>CANADA</i></li>"+
						"<li><i>CENTRAL AFRICA</i></li>"+
						"<li><i>COTE O’IVOIRE</i></li>"+
						"<li><i>CONGO</i></li>"+
						"<li><i>CAMEROON</i></li>"+
						"<li><i>CHAD</i></li>"+
						"<li><i>CHILE</i></li>"+
						"<li><i>CHINA</i></li>"+
						"<li><i>CHINA HONG KONG</i></li>"+
						"<li><i>CHINA MACAU</i></li>"+
						"<li><i>CHINA TAIWAN</i></li>"+
						"<li><i>COLOMBIA</i></li>"+
						"<li><i>COSTA RICA</i></li>"+
						"<li><i>CZECH REPUBIC</i></li>"+
						"<li><i>CUBA</i></li>"+
						"<li><i>CYPRUS</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>D</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>DENMARK</i></li>"+
						"<li><i>DOMINICAN REPUBLIC</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>E</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>ECUADOR</i></li>"+
						"<li><i>ESTONIA</i></li>"+
						"<li><i>EGYPT</i></li>"+
						"<li><i>ETHIOPIA</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>F</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>FINLAND</i></li>"+
						"<li><i>FIJI</i></li>"+
						"<li><i>FRANCE</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>G</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>GABON</i></li>"+
						"<li><i>GEORGIA</i></li>"+
						"<li><i>GERMANY</i></li>"+
						"<li><i>GHANA</i></li>"+
						"<li><i>GUINEA</i></li>"+
						"<li><i>GREECE</i></li>"+
						"<li><i>GRENADA</i></li>"+
						"<li><i>GUATEMALA</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>H</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>HONDURAS</i></li>"+
						"<li><i>HUNGARY</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>I</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>INDONESIA</i></li>"+
						"<li><i>IRELAND</i></li>"+
						"<li><i>ISRAEL</i></li>"+
						"<li><i>INDIA</i></li>"+
						"<li><i>IRAQ</i></li>"+
						"<li><i>IRAN</i></li>"+
						"<li><i>ICELAND</i></li>"+
						"<li><i>ITALY</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>J</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>JAMAICA</i></li>"+
						"<li><i>JORDAN</i></li>"+
						"<li><i>JAPAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>K</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>KYRGYZSTAN</i></li>"+
						"<li><i>KAMPUCHEA</i></li>"+
						"<li><i>KOREA DEM.PEOPLE’S</i></li>"+
						"<li><i>REPUBLIC OF KOREA</i></li>"+
						"<li><i>KUWATI</i></li>"+
						"<li><i>KAZAKHSTAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>L</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>LAOS</i></li>"+
						"<li><i>LEBANON</i></li>"+
						"<li><i>LIECHTENSTEIN</i></li>"+
						"<li><i>LIBERIA</i></li>"+
						"<li><i>LITHUANIA</i></li>"+
						"<li><i>LUXEMBOURG</i></li>"+
						"<li><i>LATVIA</i></li>"+
						"<li><i>LIBYAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>M</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>MOROCCO</i></li>"+
						"<li><i>MONACO</i></li>"+
						"<li><i>MADAGASCAR</i></li>"+
						"<li><i>MALI</i></li>"+
						"<li><i>MONGOLIA</i></li>"+
						"<li><i>MALTA</i></li>"+
						"<li><i>MAURITIUS</i></li>"+
						"<li><i>MALAWI</i></li>"+
						"<li><i>MEXICO</i></li>"+
						"<li><i>MALAYSIA</i></li>"+
						"<li><i>MOZAMBIQUE</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>N</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>NAMIBIA</i></li>"+
						"<li><i>NIGER</i></li>"+
						"<li><i>NIGERIA</i></li>"+
						"<li><i>NICARAGUA</i></li>"+
						"<li><i>NETHERLANDS</i></li>"+
						"<li><i>NORWAY</i></li>"+
						"<li><i>NEPAL</i></li>"+
						"<li><i>NEW ZEALAND</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>O</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>OMAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>P</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>PAKISTAN</i></li>"+
						"<li><i>PALESTINE</i></li>"+
						"<li><i>PANAMA</i></li>"+
						"<li><i>PERU</i></li>"+
						"<li><i>PAPUA NEW GUINEA</i></li>"+
						"<li><i>PHILIPPINES</i></li>"+
						"<li><i>POLAND</i></li>"+
						"<li><i>PORTUGAL</i></li>"+
						"<li><i>PARAGUAY</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>Q</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>QATAR</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>R</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>REPUBLIC OF MOLDOVA</i></li>"+
						"<li><i>ROMANIA</i></li>"+
						"<li><i>RUSSIAN FEDERATION</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>S</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>SAUDI ARABIA</i></li>"+
						"<li><i>SAINT LUEIA</i></li>"+
						"<li><i>SAINT VINCENT</i></li>"+
						"<li><i>SEYCHELLES</i></li>"+
						"<li><i>SUDAN</i></li>"+
						"<li><i>SWEDEN</i></li>"+
						"<li><i>SINGAPORE</i></li>"+
						"<li><i>SLOVENIA</i></li>"+
						"<li><i>SLOVAKIA</i></li>"+
						"<li><i>SAN MARINO</i></li>"+
						"<li><i>SENEGAL</i></li>"+
						"<li><i>SOMALIA</i></li>"+
						"<li><i>SOUTH AFRICA</i></li>"+
						"<li><i>SPAIN</i></li>"+
						"<li><i>LANKA</i></li>"+
						"<li><i>SYRIA</i></li>"+
						"<li><i>SWAZILAND</i></li>"+
						"<li><i>SWITZERLAND</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>T</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>TOGO</i></li>"+
						"<li><i>THAILAND</i></li>"+
						"<li><i>TAJIKISTAN</i></li>"+
						"<li><i>TURKMENISTAN</i></li>"+
						"<li><i>TUNISIA</i></li>"+
						"<li><i>TURKEY</i></li>"+
						"<li><i>TANZANIA</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>U</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>UKRAINE</i></li>"+
						"<li><i>UGANDA</i></li>"+
						"<li><i>UNITED EMIRATES</i></li>"+
						"<li><i>UNITED KINGDOM</i></li>"+
						"<li><i>UNITED STATES</i></li>"+
						"<li><i>URUGUAY</i></li>"+
						"<li><i>UZBEKISTAN</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>V</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>VENEZUELA</i></li>"+
						"<li><i>VIETNAM</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>Y</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>YEMEN</i></li>"+
						"<li><i>YUGOSLAVIA</i></li>"+
						"</ul>"+
					"</li>"+
					"<li class='fix'>"+
						"<span class='m_iscroll_left'>Z</span>"+
						"<ul class='m_iscroll_right fix'>"+
						"<li><i>ZAMBIA</i></li>"+
						"<li><i>ZAIRE</i></li>"+
						"<li><i>ZIMBABWE</i></li>"+
						"</ul>"+
					"</li>"+
				"</ul>"+
			"</div>"+
			"<div class='m_iscroll_bottom'></div>"+
			"<div class='m_iscrollBar'>"+
				"<span class='m_bar_top'></span>"+
				"<div class='m_bar_box'><i class='m_bar'></i></div>"+
				"<span class='m_bar_bottom'></span>"+
			"</div>"+
		"</div>"+
	"</div>"+
"</div>";
var _feeRules="<div class='m_dialog_box m_rules_dialog'>"+
	"<div class='m_dialog_mask'></div>"+
	"<div class='m_dialog_content'>"+
		"<h3 class='m_dialog_title fix'>Fee Rules<span class='m_dialog_close'>×</span></h3>"+
		"<div class='m_wrapper'>"+
			"<div class='m_iscroll'>"+
				"<div class='m_iscroll_content'>"+
					"<p style='text-align:center;font-weight:bold;'>Calculation of Official Fee</p>"+
					"<p>1. For both single-class application and multi-class application, the official fee is calculated per class, and there is no discount for any extra class(es) in one application. That is to say, the official fees by either single-class system or multi-class system are equal on the basis of same items of goods/services."+
					"<p>2. The official fee for a same class of 10 items of goods/services is RMB CNY 600.00 as basic fee, for each additional item in excess of ten under the same class RMB CNY 60.00."+
					"<p>For example, for an application that contains 15 items of goods/service under a same class, the official fee is RMB CNY 900.00."+
					"<p>3. If the number of items under a same class is less than 10, the official fee is still RMB CNY 600.00, rather than calculated by number of items."+
					"<p>For example, for an application that contains 5 items of goods/services, the official fee is RMB CNY 600.00.</p>"+
					"<p>For a multi-class application that contains 15 items of goods/service wherein 12 items in class A and 3 items in class B, the official fee totals RMB CNY 1320.00 (RMB CNY 720.00 for class A + RMB CNY 600.00 for class B). (Note: the official fee is NOT RMB CNY 900.00 which is calculated by number of total items)"+
					"<p style='text-align:center;font-weight:bold;'>Service Fee</p>"+
					"<p>Our Service fee for each online application of normal type is RMB CNY 1300.00 (around USD 199.00 dollars based on current exchange rate).</p>"+
					"<p style='text-align:center;font-weight:bold;'>Payment Non-Refundable</p>"+
					"<p>Any payment for the confirmed order of online trademark application, once paid, is not refundable by reasons of amendment or withdrawal of order/application. Please be careful and cautious when you are to confirm an application and pay the order.</p>"+
				"</div>"+
			"</div>"+
			"<div class='m_iscroll_bottom'></div>"+
			"<div class='m_iscrollBar'>"+
				"<span class='m_bar_top'></span>"+
				"<div class='m_bar_box'><i class='m_bar'></i></div>"+
				"<span class='m_bar_bottom'></span>"+
			"</div>"+
		"</div>"+
	"</div>"+
"</div>";
var _difference="<div class='m_dialog_box m_difference_dialog'>"+
	"<div class='m_dialog_mask'></div>"+
	"<div class='m_dialog_content'>"+
		"<h3 class='m_dialog_title fix'>Single-Class Application vs. Multi-Class Application<span class='m_dialog_close'>×</span></h3>"+
		"<div class='m_wrapper'>"+
			"<div class='m_iscroll'>"+
				"<div class='m_iscroll_content'>"+
					"<p style='text-align:center;font-weight:bold;'>I. What is single-class application? And What is multi-class application?</p>"+
					"<p>China has been practicing single-class system of application before implementing the 3rd Amendment of the Trademark Law since May 1, 2014 (“the new law”). That is to say, an application may apply for registration of a mark on a single class of goods/services in one application.</p>"+
					"<p>The other system is the multi-class application. It is mainly reflected in Article 22 of the new law, providing that “an applicant may apply for registration of a same trademark on multiple classes of goods/services in a same application.” That is to say, an application form may contain applications on multiple classes of goods/services, or a certificate of trademark registration (a registration number) may contain registrations on multiple classes of goods/services.</p>"+
					"<p style='text-align:center;font-weight:bold;'>II. Corresponding Division under the Two Application Systems</p>"+
					"<p>There is no division clause under the single-class system in the old law regarding the partial refusal during prosecution. Thus partial refusal will render the whole mark into the procedure review just as the overall refusal does. That is to say, if an applicant wishes to maintain a mark that is partially rejected, later in the procedure of review it has to waiver those that has already been approved during the preliminary examination.</p>"+
					"<p>The new law sets up the multi-class system of application and provides the corresponding division clauses. Rule 22 of the Implementing Regulations of the Trademark Law of China provides that “where China Trademark Office rejects an application on certain designated good/services, the applicant may divide the preliminarily approved portion of the said application into another application. The date of application of the original application shall be retained for the divisional application.</p>"+
					"<p>Where an application needs to be divided, the applicant shall apply to divide the said application with China Trademark Office within 15 days upon receipt of the Notification of Partial Refusal issued by China Trademark Office.</p>"+
					"<p>Upon receipt of the application for dividing the original application, China Trademark Office shall divide the original application into two separate applications, generate a new application number for the portion that is preliminary approved as a result of the division, and publish the same.”</p>"+
					"<p>According to the new law, a multi-class application/registration may not be divided except in the event of partial refusal during examination, a multi-class application may be divided into two so as to maintain the preliminarily approved portion first and apply for review regarding to the rejected portion. In other words, an applicant may not divide a multi-class application if someone files an opposition only against part of the goods/services or an applicant/registrant tries to assign part of the goods/services.</p>"+
					"<p>As stressed in the third “Notes” of the Instruction on the Division of Application of Trademark Registration and the Announcement on the Issues for Attention published by China Trademark Office on August 20, 2014, “each application may be divided for once only, which only applies to the procedure of refusal of part of the goods/services of an application, and does not apply to any other procedures.”</p>"+
					"<p style='text-align:center;font-weight:bold;'>III. Pros & Cons of Multi-Class Application</p>"+
					"<p>Multi-class application is relatively simple in terms of the procedure. Such applications will be subject to the prosecution of a same examiner, so as to avoid difference of discretion. Such system is designed to secure the rights and interest of trademark applicants, and streamlines the registration process with efficiency and quality.</p>"+
					"<p>However, the corresponding division under such system is far from satisfactory.</p>"+
					"<p>On one hand, the multi-class application/registration becomes cumbersome in the procedure of assignment or licensing etc compared with that for the sing-class application/registration, because multi-class application/registration may not be divided except in the event of partial refusal.</p>"+
					"<p>On the other hand, if the description of goods in one class is not acceptable, the process of the entire application will be delayed for further examination. Same situation as it is in other countries, but it seems more risky in China as the Chinese Trademark Office may incline to give only one chance to the applicant for amendment of goods/services during the prosecution, and may refuse the application if the applicant fails to amend properly. This brings high risk to the applications in other class(es) in which the description of goods/services is acceptable.</p>"+
					"<p>In addition, there is no difference for the official fees between single-class application and multi-class application.</p>"+
					"<p>Given the above, an applicant has to weigh the pros and cons based on the actual condition of its application/brand. Generally speaking, an applicant with a large portfolio in China may consider the multi-class application to improve efficiency. While if the search result suggests little margin for refusal regarding certain class(es) on which the applicant wishes to get registered, it may file single-class application(s). Multi-class application will become cumbersome and incur more costs if it is rejected and has to be divided in the review.</p>"+
				"</div>"+
			"</div>"+
			"<div class='m_iscroll_bottom'></div>"+
			"<div class='m_iscrollBar'>"+
				"<span class='m_bar_top'></span>"+
				"<div class='m_bar_box'><i class='m_bar'></i></div>"+
				"<span class='m_bar_bottom'></span>"+
			"</div>"+
		"</div>"+
	"</div>"+
"</div>";
