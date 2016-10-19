$(function(){
	var _register={
		init:function(){
			this.codeCountDownTimer = null;
        	this.codeNum=120;
        	this.data={};
			if($('.login_page').length>0){
				this.loginPage();
			}
			if($('.forgetPassword_page').length>0){
				this.forgetPassword();
			}
			if($('.register_step1').length>0){
				this.register_step1();
				this.agreementFunc();
			}
			if($('.register_step2').length>0){
				this.register_step2();
				this.selectAddress();
			}
			if($('.J_send_code').size()>0){
				this.sendCode();
			}
			if($('.c_switch').size()>0){
				this.checkFunc();
			}
		},  
		removePoint:function(){
			$('.login_input').keypress(function(){
				if($(this).parents('.login_form_li').find('.m_point').length>0){
					$(this).parents('.login_form_li').find('.m_point').html('');
				}
			});
		},
		checkFunc:function(){
			$(document).delegate('.c_switch','click',function(){
				$(this).toggleClass('checked');
				if($('.register_step1').length>0&&$('.c_switch').hasClass('checked')){
					$('.login_btn').removeDisabled();
				}else if($('.register_step1').length>0&&!$('.c_switch').hasClass('checked')){
					$('.login_btn').setDisabled();
				}
			});
		},
		loginPage:function(){
			var _switch=true;
			$('.login_btn').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _email='',_password='',_code='';
					_email=$.trim($('.m_email').val());
					_password=$.trim($('.m_password').val());
					_code=$.trim($('.m_code').val());
					if(_email==''||_email==$('.m_email').attr('placeholder')){
						$('.m_point').eq(0).html('Account cannot be null.');
						_switch=true;
						return false;
					}
					if(!isEmail(_email)){
						$('.m_point').eq(0).html('Illegal email,please try again.');
						_switch=true;
						return false;
					}
					if(_password==''||_password==$('.m_password').attr('placeholder')){
						$('.m_point').eq(0).html('Password cannot be null.');
						_switch=true;
						return false;
					}
					if(_code==''||_code==$('.m_code').attr('placeholder')){
						$('.m_point').eq(1).html('Security code cannot be null.');
						_switch=true;
						return false;
					}
					/*$.ajax({
						url:"data.php",
						type:"POST",
						data:{'email':_email,'password':_password,'code':_code},
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){		//登录成功
								window.location.href='index.html';
							}else{							//登录失败
								if(result.errcode==101){						//result.errcode=101 验证码错误
									$('.m_point').eq(1).html('Wrong security code.');
								}else{										//邮箱与密码不匹配
									$('.m_point').eq(0).html('Wrong account or password. Please try again.');
								}	
								_switch=true;				
							}
						/*},
						error : function(e){
							$.dialog({
	        					content:'error:'+e.msg,
	        					type:0,
	        					messageCallback:function(){
	        						_switch=true;
	        					}
	        				});
						}
					});*/
				}
			});
			$('.m_email,.m_password').keypress(function(){
				if($('.m_point').eq(0).html()!=''){
					$('.m_point').eq(0).html('');
				}
			});
			$('.m_code').keypress(function(){
				if($('.m_point').eq(1).html()!=''){
					$('.m_point').eq(1).html('');
				}
			});
		},
		forgetPassword:function(){
			var _switch=true;
			$('.login_btn').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _email='',_code='',_password1='',_password2='';
					_email=$.trim($('.m_email').val());
					_code=$.trim($('.m_code').val());
					_password1=$.trim($('.m_password1').val());
					_password2=$.trim($('.m_password2').val());
					if(_email==''||_email==$('.m_email').attr('placeholder')){
						$('.m_point').eq(0).html('The e-mail cannot be null.');
						_switch=true;
						return false;
					}
					if(!isEmail(_email)){
						$('.m_point').eq(0).html('Illegal email,please try again.');
						_switch=true;
						return false;
					}
					if(_code==''||_code==$('.m_code').attr('placeholder')){
						$('.m_point').eq(1).html('Code cannot be null.');
						_switch=true;
						return false;
					}
					if(_password1==''||_password1==$('.m_password1').attr('placeholder')){
						$('.m_point').eq(2).html('Password cannot be null.');
						_switch=true;
						return false;
					}
					if(!isPassword(_password1)||_password1.length<6){
						$('.m_point').eq(2).html('Your password must comprise letters from a-z and digits from 0-9,length is not less than 6.');
						_switch=true;
						return false;
					}
					if(_password2==''||_password2==$('.m_password2').attr('placeholder')){
						$('.m_point').eq(3).html('This cannot be null.');
						_switch=true;
						return false;
					}
					if(_password2 != _password1){
						$('.m_point').eq(3).html('You have entered a different password.');
						_switch=true;
						return false;
					}
					/*$.ajax({
						url:"data.php",
						type:"POST",
						data:{'email':_email,'code':_code,'password':_password1},
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							/*var result={'errcode':102};*/
							if(result.errcode==200){		//设置成功
								$.dialog({
									content:'Password modification success',
									type:0,
									messageCallback:function(){
										window.location.href='login.html';
									}
								});
							}else{							//设置失败
								if(result.errcode==101){						//result.errcode=101 验证码错误
									$('.m_point').eq(1).html('Wrong verification code,please try again.');
								}else if(result.errcode==102){					//result.errcode=102 邮箱不存在系统内
									$('.m_point').eq(0).html('The e-mail is not existed.');
								}	
								_switch=true;				
							}
						/*},
						error : function(e){
							$.dialog({
	        					content:'error:'+e.msg,
	        					type:0,
	        					messageCallback:function(){
	        						_switch=true;
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
		},
		register_step1:function(){
			var _this=this;
			var _switch=true;
			$('.register_step1 .login_btn').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _email='',_code='',_password1='',_password2='';
					_email=$.trim($('.m_email').val());
					_code=$.trim($('.m_code').val());
					_password1=$.trim($('.m_password1').val());
					_password2=$.trim($('.m_password2').val());
					if(_email==''||_email==$('.m_email').attr('placeholder')){
						$('.m_point').eq(0).html('The e-mail cannot be null.');
						_switch=true;
						return false;
					}
					if(!isEmail(_email)){
						$('.m_point').eq(0).html('Illegal email,please try again.');
						_switch=true;
						return false;
					}
					if(_code==''||_code==$('.m_code').attr('placeholder')){
						$('.m_point').eq(1).html('Code cannot be null.');
						_switch=true;
						return false;
					}
					if(_password1==''||_password1==$('.m_password1').attr('placeholder')){
						$('.m_point').eq(2).html('Password cannot be null.');
						_switch=true;
						return false;
					}
					if(!isPassword(_password1)||_password1.length<6){
						$('.m_point').eq(2).html('Your password must comprise letters from a-z and digits from 0-9,length is not less than 6.');
						_switch=true;
						return false;
					}
					if(_password2==''||_password2==$('.m_password2').attr('placeholder')){
						$('.m_point').eq(3).html('This cannot be null.');
						_switch=true;
						return false;
					}
					if(_password2 != _password1){
						$('.m_point').eq(3).html('You have entered a different password.');
						_switch=true;
						return false;
					}
					_this.data={'email':_email,'code':_code,'password':_password1};
					/*$.ajax({
						url:"data.php",
						type:"POST",
						data:_this.data,
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							/*var result={'errcode':102};*/
							if(result.errcode==200){		//设置成功
								//window.location.href='register_step2.html';
								$('.register_step1').remove();
								$('.register_step2').removeClass('c_hide');
							}else{							//设置失败
								if(result.errcode==101){						//result.errcode=101 验证码错误
									$('.m_point').eq(1).html('Wrong verification code,please try again.');
								}else if(result.errcode==102){					//result.errcode=102 邮箱是否已存在,请直接登录
									$('.m_point').eq(0).html('This e-mail is already taken. You may just <a href="login.html">sign in</a>.');
								}	
								_switch=true;				
							}
						/*},
						error : function(e){
							$.dialog({
	        					content:'error:'+e.msg,
	        					type:0,
	        					messageCallback:function(){
	        						_switch=true;
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
		},
		register_step2:function(){
			var _this=this;
			var _switch=true;
			$('.register_step2 .login_btn').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _type='',_name='',_tel='',_fax='',_company='',_country='',_street='',_floor='',_city='',_province='',_postcode='';
					_type=$('.J_type_radio .checked').attr('data-value');
					_name=$.trim($('.m_name').val());
					_tel=$.trim($('.m_tel').val());
					_fax=$.trim($('.m_fax').val());
					_company=$.trim($('.m_company').val());
					_country=$.trim($('.m_country').val());
					_street=$.trim($('.m_street').val());
					_floor=$.trim($('.m_floor').val());
					_city=$.trim($('.m_city').val());
					_province=$.trim($('.m_province').val());
					_postcode=$.trim($('.m_postcode').val());

					if(_name==''||_name==$('.m_name').attr('placeholder')){
						$('.m_point').eq(0).html('Contact name cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(!isName(_name)){
						$('.m_point').eq(0).html('No special characters in contact name.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}else{
						var reg = /\s{2,}/g;
						_name = _name.replace(reg," ");
					}
					if(_company==''||_company==$('.m_company').attr('placeholder')){
						$('.m_point').eq(1).html('Company name cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_street==''||_street==$('.m_street').attr('placeholder')){
						$('.m_point').eq(2).html('Specific location cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}if(_city==''||_city==$('.m_city').attr('placeholder')){
						$('.m_point').eq(2).html('City cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					/*if(_postcode==''||_postcode==$('.m_postcode').attr('placeholder')){
						$('.m_point').eq(2).html('Postcode cannot be null.');
						_switch=true;
						return false;
					}*/
					if(_postcode==$('.m_postcode').attr('placeholder')){
						_postcode=='';
					}
					/*placeholder*/
					if(_tel==$('.m_tel').attr('placeholder')){
						_tel='';
					}
					if(_fax==$('.m_fax').attr('placeholder')){
						_fax='';
					}
					if(_floor==$('.m_floor').attr('placeholder')){
						_floor='';
					}
					if(_province==$('.m_province').attr('placeholder')){
						_province='';
					}
					_this.data.type=_type;
					_this.data.name=_name;
					_this.data.tel=_tel;
					_this.data.fax=_fax;
					_this.data.company=_company;
					_this.data.country=_country;
					_this.data.street=_street;
					_this.data.floor=_floor;
					_this.data.city=_city;
					_this.data.province=_province;
					_this.data.postcode=_postcode;
					if($('.J_addr_radio .checked').attr('data-value')==2){
						var _country1='',_street1='',_floor1='',_city1='',_province1='',_postcode1='';
						_country1=$.trim($('.m_country1').val());
						_street1=$.trim($('.m_street1').val());
						_floor1=$.trim($('.m_floor1').val());
						_city1=$.trim($('.m_city1').val());
						_province1=$.trim($('.m_province1').val());
						_postcode1=$.trim($('.m_postcode1').val());
						if(_street1==''||_street1==$('.m_street1').attr('placeholder')){
							$('.m_point').eq(3).html('Specific location cannot be null.');
							$('body,html').animate({scrollTop:0}, 500);
							$.dialog({
		    					content:'Error in your input. Please check and correct.',
		    					type:1,
		    					ok:'ok'
		    				});
							_switch=true;
							return false;
						}if(_city1==''||_city1==$('.m_city1').attr('placeholder')){
							$('.m_point').eq(3).html('City cannot be null.');
							$('body,html').animate({scrollTop:0}, 500);
							$.dialog({
		    					content:'Error in your input. Please check and correct.',
		    					type:1,
		    					ok:'ok'
		    				});
							_switch=true;
							return false;
						}
						/*if(_postcode1==''||_postcode1==$('.m_postcode1').attr('placeholder')){
							$('.m_point').eq(3).html('Postcode cannot be null.');
							_switch=true;
							return false;
						}*/
						if(_postcode1==$('.m_postcode1').attr('placeholder')){
							_postcode1=='';
						}
						if(_floor1==$('.m_floor1').attr('placeholder')){
							_floor1='';
						}
						if(_province1==$('.m_province1').attr('placeholder')){
							_province1='';
						}
						/*data={'type':_type,'name':_name,'tel':_tel,'fax':_fax,'company':_company,'country':_country,'street':_street,'floor':_floor,'city':_city,'province':_province,'postcode':_postcode,'country1':_country1,'street1':_street1,'floor1':_floor1,'city1':_city1,'province1':_province1,'_province1':_postcode1};*/
						_this.data.country1=_country1;
						_this.data.street1=_street1;
						_this.data.floor1=_floor1;
						_this.data.city1=_city1;
						_this.data.province1=_province1;
						_this.data._province1=_province1;

					}
					console.log(_this.data);
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:_this.data,
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){		//设置成功
								//_switch=true;
								window.location.href='register_step3.html';
							}else{							//设置失败
								if(result.errcode==101){		//result.errcode=101 检测到完全一致的企业名已被注册
									$('.m_point').eq(1).html('Please enter the full name of your organization.');
								}
								_switch=true;				
							}
						/*},
						error : function(e){
							$.dialog({
	        					content:'error:'+e.msg,
	        					type:0,
	        					messageCallback:function(){
	        						_switch=true;
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
			$('.m_street,.m_city,.m_postcode').keypress(function(){
				if($('.m_point').eq(2).html()!=''){
					$('.m_point').eq(2).html('');
				}
			});
			$('.m_street1,.m_city1,.m_postcode1').keypress(function(){
				if($('.m_point').eq(3).html()!=''){
					$('.m_point').eq(3).html('');
				}
			});
		},
		//发送验证码
		sendCode : function(){
			var _this = this;
			$('.J_send_code').on('click',function(){
				var _that=$(this);
				var _email=$.trim($('.m_email').val());
				if(_email==''){
					$.dialog({content: 'The e-mail cannot be null.',type:0});
				}else if(!isEmail(_email)){
					$.dialog({content: 'Illegal email,please try again.',type:0});
				}else{
					_that.setDisabled();
					if($('.forgetPassword_page').length>0){
						var _url="/Register/sendEmailRge";
					}else{
						var _url="/Register/sendEmail";
					}
					/*$.ajax({
						url:_url,
						type:"POST",
						data:{'email':_email},
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){			//验证码发送成功
								$.dialog({
									content:"We have sent a verification e-mail to you. Please check if it is received. If not, please check your junk mail box. If it is still not found, please click “re-send” button on this page or contact us.",
									type:1,
									ok:'OK',
									messageCallback:function(){
										_this.codeCountDown(_that);
										return true;
									}
								});
			        		}else{								//result.errcode=101 验证码发送失败
			        			if(result.errcode==101){
			        				$.dialog({
			        					content:'Send failed, please try again.',
			        					type:0,
			        					messageCallback:function(){
			        						_that.removeDisabled();
			        					}
			        				});
			        			}else if(result.errcode == 102){
									_that.removeDisabled();
									if($('.forgetPassword_page').length>0){  //忘记密码页--邮箱未注册
										$('.m_point').eq(0).html('Please use the registered E_mail.');
									}else{ 									//登录页--邮箱已注册
										$('.m_point').eq(0).html('This e-mail is already taken. You may just <a href="/Login/login">sign in</a>.');
									}								
								}
			        		}
						/*},
						error : function(e){
							$.dialog({
	        					content:'error:'+e.msg,
	        					type:0,
	        					messageCallback:function(){
									_that.removeDisabled();	
	        						_switch=true;
	        					}
	        				});
						}
					});*/
				}
			});
		},
		codeCountDown : function(obj){
			var _this = this;
			var i = _this.codeNum;
			obj.setDisabled();
			obj.html(i+'s');
			_this.codeCountDownTimer = setInterval(function(){
				i--;
				if(i<0){
					clearInterval(_this.codeCountDownTimer);
					obj.removeDisabled();
					obj.html('Verify');
					return;
				}
				obj.html(i+'s');
			},1000);
		},
		//点击协议书出现弹窗
		agreementFunc:function(){
			$('.register_step1 .m_square_text').click(function(){
				if($('.m_agreement').length<1){
					$('body').append(_agreement);
					if($('.register_step1 .c_switch').hasClass('checked')){
						$('.m_dialog_box .c_switch').addClass('checked');
					}
					scrollBar('.m_agreement .m_wrapper');
				}
			});
			$(document).delegate('.m_agreement .m_dialog_close','click',function(){
				if($(this).parents('.m_dialog_box').find('.c_switch.checked').length>0){
					$('.register_step1 .c_switch').addClass('checked');
					$('.login_btn').removeDisabled();
				}else{
					$('.register_step1 .c_switch').removeClass('checked');
					$('.login_btn').setDisabled();
				}
				$(this).parents('.m_dialog_box').remove();
			});
			this.noticeFunc();
		},
		//点击协议书出现弹窗
		noticeFunc:function(){
			$(document).delegate('.J_notice','click',function(){
				$('.m_agreement').remove();
				if($('.m_notice').length<1){
					$('body').append(_notice);
					if($('.register_step1 .c_switch').hasClass('checked')){
						$('.m_dialog_box .c_switch').addClass('checked');
					}
					scrollBar('.m_notice .m_wrapper');
				}
			});
			$(document).delegate('.m_notice .m_dialog_close','click',function(){
				if($(this).parents('.m_dialog_box').find('.c_switch.checked').length>0){
					$('.register_step1 .c_switch').addClass('checked');
					$('.login_btn').removeDisabled();
				}else{
					$('.register_step1 .c_switch').removeClass('checked');
					$('.login_btn').setDisabled();
				}
				$(this).parents('.m_dialog_box').remove();
			});
		},
		//step2点击邮寄地址
		selectAddress:function(){
			$('.J_addr_radio .m_label').bind('click',function(){
				if($(this).attr('data-value')==2){
					$('.send_address').show().animate({'height':'387px'},200);
				}else{
					$('.send_address').animate({'height':0},200,'swing',function(){
						$('.send_address').hide();
					});
				}
			});
		}
	};
	_register.init();
});
var _agreement="<div class='m_dialog_box m_agreement'>"+
	"<div class='m_dialog_mask'></div>"+
	"<div class='m_dialog_content'>"+
		"<h3 class='m_dialog_title fix'>Conditions of Use<span class='m_dialog_close'>×</span></h3>"+
		"<div class='m_wrapper'>"+
			"<div class='m_iscroll'>"+
				"<div class='m_iscroll_content'>"+
					"<p>Welcome to emarkchina.com. eMarkChina Intellectual Property Co., Ltd. and/or its affiliates ('eMarkChina') provide online filing service of trademark in China and all other professional legal services for trademark prosecustion, litigation, and enforcement (collectively, 'eMarkChina Services'). eMarkChina provides the eMarkChina Services subject to the following conditions.</p>"+
					"<p>By using eMarkChina Services, you agree to these conditions. Please read them carefully.</p>"+
					"<p>We offer a wide range of eMarkChina Services, and sometimes additional terms may apply. When you use an eMarkChina Service you also will be subject to the guidelines, terms and agreements applicable to that eMarkChina Service ('Service Terms'). If these Conditions of Use are inconsistent with the Service Terms, those Service Terms will control.</p>"+
					"<p style='text-align:center;font-weight:bold;'>PRIVACY</p>"+
					"<p>Please review our <a href='javascript:;' class='J_notice' style='font-weight:bold'>Privacy Notice</a> , which also governs your use of eMarkChina Services, to understand our practices.</p>"+
					"<p style='text-align:center;font-weight:bold;'>ELECTRONIC COMMUNICATIONS</p>"+
					"<p>When you use any eMarkChina Service, or send e-mails, text messages, and other communications from your desktop or mobile device to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you in a variety of ways, such as by e-mail, text, or by posting notices and messages on this site or through the other eMarkChina Services, such as our My eMark. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.</p>"+
					"<p style='text-align:center;font-weight:bold;'>INTELLECTUAL PROPERTY</p>"+
					"<p>All content included in or made available through any eMarkChina Service, such as all inventions, discoveries, patents, trademark right, copyrights, moral rights, know-how, intellectual property, software, shop rights, inventor’s original sole ownership licenses, developments, research data, designs, technology, trade secrets, test procedures, processes, route lists, computer programs, source code , computer discs, literature, reports and other confidential information, intellectual and similar intangible property rights, whether or not patentable or copyrightable (or otherwise subject to legally enforceable restrictions or protections against unauthorized third party usage), is the property of eMarkChina and protected by Chinese and international laws. The compilation of all content included in or made available through any eMarkChina Service is the exclusive property of eMarkChina and protected by China and international laws.</p>"+
					"<p style='text-align:center;font-weight:bold;'>TRADEMARKS</p>"+
					"<p>Graphics, logos, page headers, button icons, scripts, and service names included in or made available through any eMarkChina Service are trademarks or trade dress of eMarkChina in China and other countries. eMarkChina's trademarks and trade dress may not be used in connection with any product or service that is not eMarkChina's, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits eMarkChina. All other trademarks not owned by eMarkChina that appear in any eMarkChina Service are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by eMarkChina.</p>"+
					"<p style='text-align:center;font-weight:bold;'>LICENSE AND ACCESS</p>"+
					"<p>Subject to your compliance with these Conditions of Use and your payment of any applicable fees, eMarkChina or its content providers grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and make personal and non-commercial use of the eMarkChina Services. This license does not include any resale or commercial use of any eMarkChina Service, or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of any eMarkChina Service or its contents; any downloading, copying, or other use of account information for the benefit of any third party; or any use of data mining, robots, or similar data gathering and extraction tools. All rights not expressly granted to you in these Conditions of Use or any Service Terms are reserved and retained by eMarkChin, its rightsholders, or other content providers. No eMarkChina Service, nor any part of any eMarkChina Service, may be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of eMarkChina. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of eMarkChina without express written consent. You may not use any meta tags or any other 'hidden text' utilizing eMarkChina's name or trademarks without the express written consent of eMarkChina. You may not misuse the eMarkChina Services. You may use the eMarkChina Services only as permitted by law. The licenses granted by eMarkChina terminate if you do not comply with these Conditions of Use or any Service Terms.</p>"+
					"<p style='text-align:center;font-weight:bold;'>YOUR ACCOUNT</p>"+
					"<p>If you use any eMarkChina Service, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. eMarkChina does sell products for children, but it sells them to adults, who can purchase with a credit card or other permitted payment method. If you are under 18, you may use the eMarkChina Services only with involvement of a parent or guardian. eMarkChina reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.</p>"+
					"<p style='text-align:center;font-weight:bold;'>REVIEWS, COMMENTS, COMMUNICATIONS, AND OTHER CONTENT</p>"+
					"<p>Visitors may post reviews, comments, photos, videos, and other content; send other communications; and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights (including publicity rights), or otherwise injurious to third parties or objectionable, and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of 'spam' or unsolicited commercial electronic messages. You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or other content. eMarkChina reserves the right (but not the obligation) to remove or edit such content, but does not regularly review posted content.</p>"+
					"<p>If you do post content or submit material, and unless we indicate otherwise, you grant eMarkChina a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, perform, translate, create derivative works from, distribute, and display such content throughout the world in any media. You grant eMarkChina and sublicensees the right to use the name that you submit in connection with such content, if they choose. You represent and warrant that you own or otherwise control all of the rights to the content that you post; that the content is accurate; that use of the content you supply does not violate this policy and will not cause injury to any person or entity; and that you will indemnify eMarkChina for all claims resulting from content you supply. eMarkChina has the right but not the obligation to monitor and edit or remove any activity or content. eMarkChina takes no responsibility and assumes no liability for any content posted by you or any third party.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Payment Non-Refundable</p>"+
					"<p>Any payment for the confirmed order of online trademark application, once paid, is not refundable by reasons of amendment or withdrawal of order/application. Please be careful and cautious when you are to confirm an application and pay the order. </p>"+
					"<p style='text-align:center;font-weight:bold;'>SERVICE DESCRIPTIONS</p>"+
					"<p>eMarkChina attempts to be as accurate as possible. However, eMarkChina does not warrant that service descriptions or other content of any eMarkChina Service is accurate, complete, reliable, current, or error-free. If a service offered by eMarkChina itself is not as described, your sole remedy is to contact is immediately to make up for it reasonally.</p>"+
					"<p style='text-align:center;font-weight:bold;'>PRICING</p>"+
					"<p>Except where noted otherwise, the official fee for each trademark-related service is set by China Trademark Office in Chinese official currency yuan and converted into US dollar based on current exchange rate as published by the Central Bank of China. Such fees may vary as China trademark authorities adjust the policy and fee standard, or as the exchange rate fluctuated. All service fees offered, suggested, or estimated on the website of eMarkChina, in the debit note or e-mail of eMarkChina are set in accordance with standard industry practice, currency market condition, and the marketing strategies of eMarkChina.</p>"+
					"<p>With respect to services offered by eMarkChina, despite our best efforts, a small number of the services in our catalog may be mispriced. If the correct price of a service sold by eMarkChina is higher than our stated price, we will, at our discretion, either contact you for instructions before settling or cancel your order and notify you of such cancellation.</p>"+
					"<p>We generally do not make the service available to you until after your order has been confirmed and paid in full amount.</p>"+
					"<p style='text-align:center;font-weight:bold;'>APP PERMISSIONS</p>"+
					"<p>When you use apps created by eMarkChina, such as the eMarkChina App, you may grant certain permissions to us for your device. Most mobile devices provide you with information about these permissions. To learn more about these permissions, click here.</p>"+
					"<p style='text-align:center;font-weight:bold;'>AMAZON SOFTWARE TERMS</p>"+
					"<p>In addition to these Conditions of Use, the terms found here apply to any software (including any updates or upgrades to the software and any related documentation) that we make available to you from time to time for your use in connection with eMarkChina Services (the 'eMarkChina Software').</p>"+
					"<p style='text-align:center;font-weight:bold;'>OTHER BUSINESSES</p>"+
					"<p>Parties other than eMarkChina provide services, or conduct sub-agency through the eMarkChina Services. In addition, we provide links to the sites of affiliated companies and certain other businesses. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any of these businesses or individuals or the content of their Web sites. eMarkChina does not assume any responsibility or liability for the actions, service, and content of all these and any other third parties. You should carefully review their privacy statements and other conditions of use.</p>"+
					"<p style='text-align:center;font-weight:bold;'>DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</p>"+
					"<p>THE AMAZON SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE EMARKCHINA SERVICES ARE PROVIDED BY EMARKCHINA ON AN 'AS IS' AND 'AS AVAILABLE' BASIS, UNLESS OTHERWISE SPECIFIED IN WRITING. EMARKCHINA MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE EMARKCHINA SERVICES, OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE EMARKCHINA SERVICES, UNLESS OTHERWISE SPECIFIED IN WRITING. YOU EXPRESSLY AGREE THAT YOUR USE OF THE EMARKCHINA SERVICES IS AT YOUR SOLE RISK.</p>"+
					"<p>TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, EMARKCHINA DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. EMARKCHINA DOES NOT WARRANT THAT THE EMARKCHINA SERVICES, INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE EMARKCHINA SERVICES, EMARKCHINA'S SERVERS OR ELECTRONIC COMMUNICATIONS SENT FROM EMARKCHINA ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. EMARKCHINA WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY EMARKCHINA SERVICE, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH ANY EMARKCHINA SERVICE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE SPECIFIED IN WRITING.</p>"+
					"<p>CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.</p>"+
					"<p style='text-align:center;font-weight:bold;'>DISPUTES</p>"+
					"<p>Any dispute or claim relating in any way to your use of any eMarkChina Service, or to any products or services sold or distributed by eMarkChina or through eMarkChina.com will be resolved by binding arbitration, rather than in court, except that you may assert claims in small claims court if your claims qualify. The Arbitration Law of the People’s Republic of China apply to this agreement.</p>"+
					"<p>We each agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated or representative action. We also both agree that you or we may bring suit in court to enjoin infringement or other misuse of intellectual property rights.</p>"+
					"<p style='text-align:center;font-weight:bold;'>APPLICABLE LAW</p>"+
					"<p>By using any eMarkChina Service, you agree that the Arbitration Law of the People’s Republic of China, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and eMarkChina.</p>"+
					"<p style='text-align:center;font-weight:bold;'>SITE POLICIES, MODIFICATION, AND SEVERABILITY</p>"+
					"<p>Please review our other policies, such as our Fee Rules, posted on this site. These policies also govern your use of eMarkChina Services. We reserve the right to make changes to our site, policies, Service Terms, and these Conditions of Use at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable and shall not affect the validity and enforceability of any remaining condition.</p>"+
					"<p style='text-align:center;font-weight:bold;'>OUR ADDRESS</p>"+
					"<p>eMarkChina Intellectual Property Co., Ltd.<br/>Suite 507, 5F, Bldg. 3, Ziyu Int’l Plaza,<br/>South Yinhe Street, Shijingshan Dist. <br/>Beijing, 100040, China<br/>Tel: (86 10) 68631077<br/>E-mail: info@emarkchina.com</p>"+
					"<p>Please note also that providing detailed and accurate information at the outset will facilitate efficient processing of your request. That information will include, for example, e-mail and/or fee-paying account number used to make purchases for eMarkChina service.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Additional eMarkChina Software Terms</p>"+
					"<p>1. Use of the eMarkChina Software. You may use eMarkChina Software solely for purposes of enabling you to use and enjoy the eMarkChina Services as provided by eMarkChina, and as permitted by the Conditions of Use, these Software Terms and any Service Terms. You may not incorporate any portion of the eMarkChina Software into your own programs or compile any portion of it in combination with your own programs, transfer it for use with another service, or sell, rent, lease, lend, loan, distribute or sub-license the eMarkChina Software or otherwise assign any rights to the eMarkChina Software in whole or in part. You may not use the eMarkChina Software for any illegal purpose. We may cease providing any eMarkChina Software and we may terminate your right to use any eMarkChina Software at any time. Your rights to use the eMarkChina Software will automatically terminate without notice from us if you fail to comply with any of these Software Terms, the Conditions of Use or any other Service Terms. Additional third party terms contained within or distributed with certain eMarkChina Software that are specifically identified in related documentation may apply to that eMarkChina Software (or software incorporated with the eMarkChina Software) and will govern the use of such software in the event of a conflict with these Conditions of Use. All software used in any eMarkChina Service is the property of eMarkChina or its software suppliers and protected by United States and international copyright laws.<br/>2. Use of Third Party Services. When you use the eMarkChina Software, you may also be using the services of one or more third parties, such as a wireless carrier or a mobile platform provider. Your use of these third party services may be subject to the separate policies, terms of use, and fees of these third parties.<br/>3. No Reverse Engineering. You may not, and you will not encourage, assist or authorize any other person to copy, modify, reverse engineer, decompile or disassemble, or otherwise tamper with, the eMarkChina Software, whether in whole or in part, or create any derivative works from or of the eMarkChina Software.<br/>4. Updates. In order to keep the eMarkChina Software up-to-date, we may offer automatic or manual updates at any time and without notice to you.<br/>5. Trademark Regulations. You must comply with all trademark-related restrictions and regulations of the Department of the State Administration of Industry and Commerce and other Chinese agencies and authorities that may apply to the eMarkChina Software.</p>"+
				"</div>"+
			"</div>"+
			"<div class='m_iscroll_bottom'></div>"+
			"<div class='m_iscrollBar'>"+
				"<span class='m_bar_top'></span>"+
				"<div class='m_bar_box'><i class='m_bar'></i></div>"+
				"<span class='m_bar_bottom'></span>"+
			"</div>"+
		"</div>"+
		"<div class='m_agreement_bottom fix'>"+
			"<span class='m_square c_switch'><i></i></span>"+
			"<span class='m_square_text'>I have read and accepted the Terms and Conditions</span>"+
		"</div>"+
	"</div>"+
"</div>";
var _notice="<div class='m_dialog_box m_notice'>"+
	"<div class='m_dialog_mask'></div>"+
	"<div class='m_dialog_content'>"+
		"<h3 class='m_dialog_title fix'>eMarkChina.com Privacy Notice<span class='m_dialog_close'>×</span></h3>"+
		"<div class='m_wrapper'>"+
			"<div class='m_iscroll'>"+
				"<div class='m_iscroll_content'>"+
					"<p>eMarkChina.com knows that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This notice describes our privacy policy. By visiting eMarkChina.com, you are accepting the practices described in this Privacy Notice.</p>"+
					"<p>What Personal Information About Customers Does eMarkChina.com Gather?<br/>What About Cookies?<br/>Does eMarkChina.com Share the Information It Receives?<br/>How Secure Is Information About Me?<br/>Which Information Can I Access?<br/>What Choices Do I Have?<br/>Are Children Allowed to Use eMarkChina.com?<br/>Conditions of Use, Notices, and Revisions<br/>Examples of Information Collected</p>"+
					"<p style='text-align:center;font-weight:bold;'>What Personal Information About Customers Does eMarkChina.com Gather?</p>"+
					"<p>The information we learn from customers helps us personalize and continually improve your eMarkChina experience. Here are the types of information we gather.</p>"+
					"<p>Information You Give Us: We receive and store any information you enter on our Web site or give us in any other way. You can choose not to provide certain information, but then you might not be able to take advantage of many of our features. We use the information that you provide for such purposes as proceeding with official submissionof documents, responding to your requests, customizing future services for you, improving our platform, and communicating with you.</p>"+
					"<p>Automatic Information: We receive and store certain types of information whenever you interact with us. For example, like many Web sites, we use 'cookies,' and we obtain certain types of information when your Web browser accesses eMarkChina.com or advertisements and other content served by or on behalf of eMarkChina.com on other Web sites. </p>"+
					"<p>E-mail Communications: E-mail communications are important means of contact for case information and other service matters. To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from eMarkChina.com if your computer supports such capabilities. We also compare our customer list to lists received from other companies, in an effort to avoid sending unnecessary messages to our customers.</p>"+
					"<p>Mobile: When you download or use apps created by eMarkChina or our subsidiaries, we may receive information about your location and your mobile device, including a unique identifier for your device. We may use this information to provide you with location-based services, such as advertising, search results, and other personalized content. Most mobile devices allow you to turn off location services.</p>"+
					"<p>Information from Other Sources: We might receive information about you from other sources and add it to our account information.</p>"+
					"<p style='text-align:center;font-weight:bold;'>What About Cookies?</p>"+
					"<p>Cookies are unique identifiers that we transfer to your device to enable our systems to recognize your device, and storage of drafts in your account between visits.</p>"+
					"<p>The Help feature on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Additionally, you can disable or delete similar data used by browser add-ons, such as Flash cookies, by changing the add-on's settings or visiting the Web site of its manufacturer. Because cookies allow you to take advantage of some of eMarkChina.com's essential features, we recommend that you leave them turned on. For instance, if you block or otherwise reject our cookies, you will not be able to add items to your Shopping Cart, proceed to Checkout, or use any eMarkChina.com products and services that require you to Sign in.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Does eMarkChina.com Share the Information It Receives?</p>"+
					"<p>Information about our customers is an important part of our business, and we are not in the business of selling it to others. We share customer information only as described below and with subsidiaries eMarkChina.com Intellectual Property Co., Ltd. controls that either are subject to this Privacy Notice or follow practices at least as protective as those described in this Privacy Notice.</p>"+
					"<p>Official Trademark Authorities: Most of the personal and corporate date are directed to China’s official trademark authorities such as China Trademark Office and Trademark Review and Adjudication Board under the State Administration of Industry and Commerce, Intellectual Property Law Court of Beijing etc to support submission of official documents as required in the forms, such as trademark application, review of refusal, opposition, assignment etc.</p>"+
					"<p>Affiliated Businesses We Do Not Control: We work closely with affiliated businesses. In some cases, such as trademark attorney partners providing professional legal services to you at eMarkChina.com. In other cases, we operate stores, provide services, or sell product lines jointly with these businesses. You can tell when a third party is involved in your transactions, and we share customer information related to those transactions with that third party.</p>"+
					"<p>Third-Party Service Providers: We employ other companies and individuals to perform functions on our behalf. Examples include fulfilling orders, delivering packages, sending postal mail and e-mail, removing repetitive information from customer lists, analyzing data, providing marketing assistance, providing search results and links (including paid listings and links), processing credit card payments, and providing customer service. They have access to personal information needed to perform their functions, but may not use it for other purposes.</p>"+
					"<p>Business Transfers: As we continue to develop our business, we might sell or buy ventures, subsidiaries, or business units. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice (unless, of course, the customer consents otherwise). Also, in the unlikely event that eMarkChina.com, Inc., or substantially all of its assets are acquired, customer information will of course be one of the transferred assets.</p>"+
					"<p>Protection of eMarkChina.com and Others: We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Conditions of Use and other agreements; or protect the rights, property, or safety of eMarkChina.com, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction. Obviously, however, this does not include selling, renting, sharing, or otherwise disclosing personally identifiable information from customers for commercial purposes in violation of the commitments set forth in this Privacy Notice.</p>"+
					"<p>With Your Consent: Other than as set out above, you will receive notice when information about you might go to third parties, and you will have an opportunity to choose not to share the information.</p>"+
					"<p style='text-align:center;font-weight:bold;'>How Secure Is Information About Me?</p>"+
					"<p>We work to protect the security of your information during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input.</p>"+
					"<p>We reveal only part of your fee-paying account when confirming an order. Of course, we transmit the entire account data to the appropriate third party payment company you choose during order processing.</p>"+
					"<p>It is important for you to protect against unauthorized access to your password and to your computer. Be sure to sign off when finished using a shared computer. Click here for more information on how to sign off.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Which Information Can I Access?</p>"+
					"<p>eMarkChina.com gives you access to a broad range of information about your account and your interactions with eMarkChina.com for the limited purpose of viewing and, in certain cases, updating that information.</p>"+
					"<p style='text-align:center;font-weight:bold;'>What Choices Do I Have?</p>"+
					"<p>As discussed above, you can always choose not to provide information, even though it might be needed to order a trademark application or to take advantage of such eMarkChina.com features as My eMark.</p>"+
					"<p>You can add or update certain information on pages such as those referenced in the Which Information Can I Access? section. When you update information, we usually keep a copy of the prior version for our records.</p>"+
					"<p>You have to receive e-mail or other mail from us, as the information or notices contained in such communications are so important to your cases that may require you knowledge and further instruction. (If you do not read or review Conditions of Use and other legal notices from us, such as this Privacy Notice, those notices will still govern your use of eMarkChina.com, and it is your responsibility to review them for changes.)</p>"+
					"<p>The Help feature on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Additionally, you can disable or delete similar data used by browser add-ons, such as Flash cookies, by changing the add-on's settings or visiting the Web site of its manufacturer. Because cookies allow you to take advantage of some of eMarkChina.com's essential features, we recommend that you leave them turned on. For instance, if you block or otherwise reject our cookies, you will not be able to add items to your Shopping Cart, proceed to Checkout, or use any eMarkChina.com products and services that require you to Sign in.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Are Children Allowed to Use eMarkChina.com?</p>"+
					"<p>eMarkChina.com does not provide services for children. If you are under 18, you may use eMarkChina.com only with the involvement of a parent or guardian.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Conditions of Use, Notices, and Revisions</p>"+
					"<p>If you choose to visit eMarkChina.com, your visit and any dispute over privacy is subject to this Notice and our Conditions of Use, including limitations on damages, resolution of disputes, and application of the law of the People’s Republic of China. If you have any concern about privacy at eMarkChina.com, please contact us with a thorough description, and we will try to resolve it. Our business changes constantly, and our Privacy Notice and the Conditions of Use will change also. We may e-mail periodic reminders of our notices and conditions, but you should check our Web site frequently to see recent changes. Unless stated otherwise, our current Privacy Notice applies to all information that we have about you and your account. We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of customer information collected in the past without the consent of affected customers.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Related Practices and Information</p>"+
					"<p>Conditions of Use<br/>Create Account<br/>Application Form---Applicant<br/>My eMark<br/>Contact Center</p>"+
					"<p style='text-align:center;font-weight:bold;'>Examples of Information Collected</p>"+
					"<p style='text-align:center;font-weight:bold;'>Information You Give Us</p>"+
					"<p>You provide most such information when you create account, order, post, participate in a contest or questionnaire, or communicate with customer service. For example, you provide information when you place an order through eMarkChina.com; provide information in Create Account, Application Form, and My eMark (and you might have more than one if you have used more than one e-mail address when creating more than one accounts); communicate with us by phone, e-mail, or otherwise; complete a questionnaire or a contest entry form; provide and rate Review. As a result of those actions, you might supply us with such information as your name, address, and phone numbers; payment information; people to whom services have been delivered, including addresses and phone number; content of comment, instruction, reviews and e-mails to us; personal description, business registration document, and trade image in your applications; and financial information, including bank account numbers.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Automatic Information</p>"+
					"<p>Examples of the information we collect and analyze include the Internet protocol (IP) address used to connect your computer to the Internet; login; e-mail address; password; computer and connection information such as browser type, version, and time zone setting, browser plug-in types and versions, operating system, and platform; purchase history, which we sometimes aggregate with similar information from other customers to create features like Top Sellers ; the full Uniform Resource Locator (URL) clickstream to, through, and from our Web site, including date and time; cookie number; products you viewed or searched for; and the phone number you used to call our 800 number. We may also use browser data such as cookies, Flash cookies (also known as Flash Local Shared Objects), or similar data on certain parts of our Web site for fraud prevention and other purposes. During some visits we may use software tools such as JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page. We may also collect technical information to help us identify your device for fraud prevention and diagnostic purposes.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Mobile</p>"+
					"<p>Most mobile devices provide users with the ability to disable location services. Most likely, these controls are located in the device's settings menu. If you have questions about how to disable your device's location services, we recommend you contact your mobile service carrier or your device manufacturer.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Information from Other Sources</p>"+
					"<p>Examples of information we receive from other sources include updated delivery and address information from our carriers or other third parties, which we use to correct our records and deliver your next order or communication more easily; account information, order or redemption information, and page-view information from some merchants with which we operate co-branded businesses or for which we provide technical, fulfillment, advertising, or other services; search term and search result information from some searches conducted through the Web search features; search results and links, including paid listings (such as Sponsored Links); and credit history information from credit bureaus, which we use to help prevent and detect fraud and to offer certain credit or financial services to some customers.</p>"+
					"<p style='text-align:center;font-weight:bold;'>Information You Can Access</p>"+
					"<p>Examples of information you can access easily at eMarkChina.com include up-to-date information regarding recent orders; personally identifiable information (including name, e-mail, password, communications and applicant book, and application data); payment settings (including payment option information); e-mail notification settings; and My eMark (including your profile, orders, transaction history, application draft etc,).</p>"+
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