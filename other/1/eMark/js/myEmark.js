 $(function(){
	var _myEmark={
		init:function(){
			var _this=this;
			this.setMenu();
			if($('.setPassword').size()>0){
				this.setPassword();
			}
			if($('.editUserInformation').size()>0){
				//window.onbeforeunload = CloseEvent;
				this.editUserInformation();
				this.selectAddress();
			}
			//时间选择器
			if($('.J_startTime').size()>0){
				this.timeSelect();
			}
			//删除列表
			if($('.failure').size()>0){
				this.failure_edit();
			}
			//删除列表
			if($('.J_order_del').size()>0){
				this.table_del();
			}
			//倒计时
			if($('.J_countDown').size()>0){
				$('.J_countDown').each(function(){
					var _data=$(this).attr('data');
					_this.countDown(_data,$(this));
				});
			}
			//图片尺寸
			if($('.m_upload_img').size()>0){
				imgSize($('.m_upload_box').eq(0).find('.m_upload_img').attr('src'),$('.m_upload_box').eq(0).find('.m_upload_img'));
			}
		},
		setMenu:function(){
			$('#menu_list .menu_item').click(function(){
		 		if($(this).parent().find('.menu_ul').size()>0){
		 			var _menu_ul = $(this).parent().find('.menu_ul');
		 			if(_menu_ul.css('display') == 'block'){
		 				$(this).parent().removeClass('active');
		 				_menu_ul.slideUp();
		 			}else{
		 				$(this).parent().addClass('active');
		 				_menu_ul.slideDown();
		 			}
		 		}
		 	});
		 	$('.menu_ul .active').parents('li').find('.menu_item').click();
		},
		removePoint:function(){
			$('.c_input').keypress(function(){
				if($(this).parents('.emark_from_list').find('.m_point').length>0){
					$(this).parents('.emark_from_list').find('.m_point').html('');
				}
			});
		},
		editUserInformation:function(){
			var _switch=true;
			$('.emark_btn').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _name='',_tel='',_fax='',_country='',_street='',_floor='',_city='',_province='',_postcode='';
					_name=$.trim($('.m_name').val());
					_tel=$.trim($('.m_tel').val());
					_fax=$.trim($('.m_fax').val());
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
					if(_street==''||_street==$('.m_street').attr('placeholder')){
						$('.m_point').eq(0).html('Specific location cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}if(_city==''||_city==$('.m_city').attr('placeholder')){
						$('.m_point').eq(0).html('City cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_postcode==''||_postcode==$('.m_postcode').attr('placeholder')){
						/*$('.m_point').eq(0).html('Postcode cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;*/
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

					var data={};
					if($('.J_addr_radio .checked').attr('data-value')==2){
						var _country1='',_street1='',_floor1='',_city1='',_province1='',_postcode1='';
						_country1=$.trim($('.m_country1').val());
						_street1=$.trim($('.m_street1').val());
						_floor1=$.trim($('.m_floor1').val());
						_city1=$.trim($('.m_city1').val());
						_province1=$.trim($('.m_province1').val());
						_postcode1=$.trim($('.m_postcode1').val());
						if(_street1==''||_street1==$('.m_street1').attr('placeholder')){
							$('.m_point').eq(0).html('Specific location cannot be null.');
							$('body,html').animate({scrollTop:0}, 500);
							$.dialog({
		    					content:'Error in your input. Please check and correct.',
		    					type:1,
		    					ok:'ok'
		    				});
							_switch=true;
							return false;
						}if(_city1==''||_city1==$('.m_city1').attr('placeholder')){
							$('.m_point').eq(0).html('City cannot be null.');
							$('body,html').animate({scrollTop:0}, 500);
							$.dialog({
		    					content:'Error in your input. Please check and correct.',
		    					type:1,
		    					ok:'ok'
		    				});
							_switch=true;
							return false;
						}
						if(_postcode1==''||_postcode1==$('.m_postcode1').attr('placeholder')){
							/*$('.m_point').eq(0).html('Postcode cannot be null.');
							$('body,html').animate({scrollTop:0}, 500);
							$.dialog({
		    					content:'Error in your input. Please check and correct.',
		    					type:1,
		    					ok:'ok'
		    				});
							_switch=true;
							return false;*/
							_postcode=='';
						}
						if(_floor1==$('.m_floor1').attr('placeholder')){
							_floor1='';
						}
						if(_province1==$('.m_province1').attr('placeholder')){
							_province1='';
						}
						data={'name':_name,'tel':_tel,'fax':_fax,'country':_country,'street':_street,'floor':_floor,'city':_city,'province':_province,'postcode':_postcode,'country1':_country1,'street1':_street1,'floor1':_floor1,'city1':_city1,'province1':_province1,'postcode1':_postcode1};
					}else{
						data={'name':_name,'tel':_tel,'fax':_fax,'country':_country,'street':_street,'floor':_floor,'city':_city,'province':_province,'postcode':_postcode};
					}
					//alert(_floor1);
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:{'email':_email,'code':_code,'password':_password1},
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101,'msg':'error'};*/
							if(result.errcode==200){		//设置成功
								$.dialog({
		        					content:'Save completed',
		        					type:0,
		        					messageCallback:function(){
		        						window.location.href='myEmark_userInformation.html';
		        					}
		        				});									
							}else{							//设置失败
								$('.m_point').eq(0).html(result.msg);
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
			$('.c_input').keypress(function(){
				$('.m_point').eq(0).html('');
			});
		},
		setPassword:function(){
			var _switch=true;
			$('.J_Confirm').click(function(){
				if(_switch){
					$('.m_point').html('');
					_switch=false;
					var _oldPassword='',_newPassword1='',_newPassword2='';
					_oldPassword=$.trim($('.m_oldPassword').val());
					_newPassword1=$.trim($('.m_newPassword1').val());
					_newPassword2=$.trim($('.m_newPassword2').val());
					if(_oldPassword==''){
						$('.m_point').eq(0).html('Original password cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_newPassword1==''){
						$('.m_point').eq(1).html('New password cannot be null.');
						_switch=true;
						return false;
					}
					if(!isPassword(_newPassword1)||_newPassword1.length<6){
						$('.m_point').eq(1).html('Your password must comprise letters from a-z and digits from 0-9,length is not less than 6.');
						_switch=true;
						return false;
					}
					if(_newPassword2==''){
						$('.m_point').eq(2).html('This cannot be null.');
						_switch=true;
						return false;
					}
					if(_newPassword2 != _newPassword1){
						$('.m_point').eq(2).html('You have entered a different password.');
						_switch=true;
						return false;
					}
					$.dialog({
    					content:'Are you sure to change the password?',
    					type:2,
    					ok:'Yes',
    					cancel:'Cancel',
    					messageCallback:function(){
    						/*$.ajax({
								url:"data.php",
								type:"POST",
								data:{'oldPassword':_oldPassword,'newPassword':_newPassword1},
								dataType:'json',
								success:function(result) {*/
									var result={'errcode':200};
									/*var result={'errcode':101};*/
									//var result={'errcode':102,'msg':'error'};
									if(result.errcode==200){		//设置成功
										$.dialog({
					    					content:'The password is changed now.',
					    					type:0
					    				});
									}else{							//设置失败
										if(result.errcode==101){						//result.data=101 --原始密码不正确
											$('.m_point').eq(0).html('You have entered a wrong password. Please try again.');
											_switch=true;	
										}else{
											$.dialog({
						    					content:result.msg,
						    					type:0,
					        					messageCallback:function(){
					        						_switch=true;
					        					}
						    				});
										}			
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
    					},
    					cancelCallback:function(){
    						_switch=true;
    					}
    				});
				}
			});
 			this.removePoint();
		},
		//点击邮寄地址
		selectAddress:function(){
			$('.J_addr_radio .m_label').bind('click',function(){
				if($(this).attr('data-value')==2){
					$('.send_address').show().animate({'height':'336px'},200);
				}else{
					$('.send_address').animate({'height':0},200,'swing',function(){
						$('.send_address').hide();
					});
				}
			});
		},
		timeSelect:function(){
			/**
			 * @ 选择时间段 - 结束时间不小于开始时间
			 * @ 开始时间添加 class --> J_startTime 
			 * @ 结束时间添加 class --> J_endTime 
			  **/
			var exStartTime = $('.J_startTime');
		    var exEndTime = $('.J_endTime');
		    var startTime = $('.J_startTime').val() || '2015-07-21';
		     exStartTime.focus(function(){
		        WdatePicker({
		            el:this,
		            lang:"en",
		            dateFmt:'yyyy-MM-dd',
		            autoPickDate:true,
		            minDate: '2015-07-21',
		            maxDate : '%yyyy-%MM-%dd',
		            skin:'twoer',
		            onpicked:function(dp){
		                startTime = dp.cal.getDateStr();
		                exEndTime.val('');
		            }
		        });
		    });
		    exEndTime.focus(function(){
		         WdatePicker({
		            el:this,
		            lang:"en",
		            dateFmt:'yyyy-MM-dd',
		            autoPickDate:true,
		            skin:'twoer',
		            minDate: startTime,
		            maxDate: '%yyyy-%MM-%dd'
		        });
		    });
		},
		table_del:function(){
			var _switch=true;
			$('.J_order_del').live('click',function(){
				if(_switch){
					_switch=false;
					var _this=$(this);
			        var id= _this.parents('.J_order_parent').attr('data-id');
			        console.log(id);
			        var _content='Delete this Order?';
			        if($('.emark_draftList').size()>0){
			        	_content='Delete this draft?';
			        }
			        $.dialog({
			            content:_content,
			            ok:'Confirm',
			            cancel:'Cancel',
			            type:2,
			            messageCallback : function(){	//点击确定按钮后的回调函数
			                var data = {'id':id};
			                var url = $('.J_delete_dataUrl').val();
			                console.log(url);
			                /*$.ajax({
								url:url,
								type:"POST",
								data:data,
								dataType:'json',
								success:function(result) {*/
									var result={'errcode':200};
									/*var result={'errcode':102,'msg':'error'};*/
									if(result.errcode==200){		//成功
										window.location.reload();	
									}else{							//失败
										$.dialog({
					    					content:result.msg,
					    					type:0,
				        					messageCallback:function(){
				        						_switch=true;
				        					}
					    				});		
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
			            },
			            cancelCallback : function(){
			                _switch=true;
			            }
			        });
				}
			});
		},
		countDown:function(data,obj){
			var _this=this;
			var _timer=null; 
		    var ts = (new Date(data).getTime()) - (new Date().getTime());//计算剩余的毫秒数  
		    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数  
		    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数  
		    var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数  
		    dd = checkTime(dd);  
		    hh = checkTime(hh);  
		    mm = checkTime(mm);   
		    _timer=setInterval(function(){_this.countDown(data,obj)},60000);  
		    if(dd<0||hh<0||mm<0){
		    	clearInterval(_timer);
		    	//window.href.reload();  
		    	return false;
		    }else{
		    	if($('.emark_orderList').size()>0){
		    		obj.html(dd+" days "+hh+" hours<br/>"+mm+" minutes");  
		    	}else{
		    		obj.html(dd+" days "+hh+" hours "+mm+" minutes"); 
		    	}
		    }
			function checkTime(i)    
			{    
			   if (i < 10 && i>=0) {    
			       i = "0" + i;    
			    }    
			   return i;    
			}  
		},
		failure_edit:function(){
			var _switch=true;
			$('.emark_btn').click(function(){
				if(_switch) {
					_switch = false;
					var _num = $('.J_modified_num').text();
					if (_num <= 0) {
						$.dialog({
							content: "The number of changes has reached the upper limit, please contact customer service E-mail:info@eMarkChina.com",
							type: '0',
							messageCallback:function(){
								_switch=true;
							}
						});
					} else {
						var _msid=$('#msid').val();
						/*$.ajax({
							url:"/Myemark/edituser",
							type:"POST",
							data:{'msid':_msid},
							dataType:'json',
							success:function(result) {*/
								//var result={'errcode':200};
								var result={'errcode':100};
								if(result.errcode==200){		//可编辑
									window.location.href='trademark_step1.html';
								}else{							//修改次数达上限
									$.dialog({
										content: 'The number of changes has reached the upper limit, please contact customer service.E-mail:info@eMarkChina.com',
										type: '0',
										messageCallback:function(){
											_switch=true;
										}
									});
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
				}
			});
		}
	};
	_myEmark.init();
});

