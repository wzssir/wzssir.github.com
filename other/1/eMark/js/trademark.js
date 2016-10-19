$(function(){
	var _trademark={
		init:function(){
			if($('.trademark_steps_wrapper').length>0){
				this.trademarkSteps();
				this.knowledgeFunc();
				this.markTypesFunc();
				this.agreementFunc();
			}
			if($('.c_switch').size()>0){
				this.checkFunc();
			}
			if($('.trademark_step1_wrapper').length>0){
				this.trademark_step1_wrapper();
			}
			if($('.trademark_step2_wrapper').length>0){
				//window.onbeforeunload = CloseEvent;
				this._service_charge=parseFloat($('#service_charge').val());
				this._base_class_num=parseFloat($('#base_class_num').val());
				this._class_charge1=parseFloat($('#class_charge1').val());
				this._class_charge2=parseFloat($('#class_charge2').val());
				this._selectClassArr=[];
				this._selectSubClassArr=[];
				this._selectCountClassJson={};
				this.allClassesFunc();
				this.keyWordFunc();
				this.step2_tabFunc();
				this.step2_classFunc();
				this.trademark_step2_wrapper();
			}
			if($('.trademark_step3_wrapper').length>0){
				//window.onbeforeunload = CloseEvent;
				this.trademark_step3_wrapper();
				this.trademark_step3_handle();
			}
			if($('.trademark_step4_wrapper').length>0){
				//window.onbeforeunload = CloseEvent;
				imgSize($('.m_upload_box').eq(0).find('.m_upload_img').attr('src'),$('.m_upload_box').eq(0).find('.m_upload_img'));
				this.trademark_step4_wrapper();
			}
			if($('.trademark_step6_wrapper').size()>0){
				this.payStatementFunc();
				this.trademark_step6_wrapper();
			}
			if($('.trademark_step7_wrapper').size()>0){
				if($('.pay_input').length>0){
					var _switch=true;
					$('.J_order_btn').click(function(){
						if(_switch){
							var _payInput=$.trim($('.pay_input').val());
							console.log(_payInput);
							_switch=false;
							if(_payInput==''){
								$.dialog({
			    					content:'Bank draft cannot be null.',
			    					type:0,
		        					messageCallback:function(){
		        						_switch=true;
		        					}
			    				});
			    				return false;
							}
							$.dialog({
		    					content:'<span style="margin-bottom:10px;display:block;word-break:break-all;word-wrap:break-word;white-space:normal;">Remittance Receipt：<i style="color:#ff1111;">'+_payInput+'</i></span>Your payment will be verified off line after you submitted the Remittance Number. Continue?',
		    					ok:'ok',
		    					cancel:"cancel",
		    					type:2,
		    					init:function(){
		    						$('.dialog_text').css('text-align','left');
		    					},
		    					messageCallback:function(){
		    						/*$.ajax({
										url:"data.php"
										type:"POST",
										data:data,
										dataType:'json',
										success:function(result) {*/
											var result={'errcode':200};
											if(result.errcode==200){		//设置成功	
												setTimeout(function(){											
													$.dialog({
														content:'Submitted successfully',
														ok:'Back to index',
														cancel:"Start a new application",
														type:2,
														init:function(){
															$('.dialog_foot button').css('font-size','20px');
															$('.dialog_foot .sureBtn').css('width','160px');
															$('.dialog_foot .cancelBtn').css({'width':'260px','margin-left':'10px'});
														},
														messageCallback:function(){
															window.location.href='index.html';
														},
														cancelCallback:function(){
															window.location.href='trademark.html';
														}
													});
												},100);
											}else{
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
		    					cancelCallback:function(){
		    						_switch=true;
		    					}
		    				});
						}
					});
				}
			}
		},
		keyWordFunc:function(){
			var _this=this;
			$('.trademark_tab_search input').live('keyup',function(){
				var _thisParent=$(this).parents('.trademark_tab_list_check');
				var _value=$.trim($(this).val());
				if(_value==''){
					_thisParent.find("p").show();
				}
				//var _value=$.trim($(this).val()).toLowerCase();
				_thisParent.find(".trademark_tab_checkbox").textSearch(_value,{
					markColor: "#fab427",
					nullReport: false,
					callback:function(){
						for(var i=0;i<_thisParent.find("p").length;i++){
							if(_thisParent.find("p").eq(i).find("span[rel='mark']").length<1){
								_thisParent.find("p").eq(i).hide();
							}else{
								var _data_id=_thisParent.find("p").eq(i).find('.tab_input').attr('data-value');
								for(var j=0;j<_this._selectSubClassArr.length;j++){
									var _check_id=_this._selectSubClassArr[j].id;
									if(_check_id==_data_id){
										_thisParent.find("p").eq(i).find('.tab_input').attr('checked','checked');
									}
								}
								_thisParent.find("p").eq(i).show();
							}
						}
					}
				});
			});
		},
		step2_tabFunc:function(){
			var _this=this;
			//删除选择则类
			$(document).delegate('.trademark_tab_title .trademark_class_icon','click',function(){
				var _that=this;
				$.dialog({
					content:'Are you sure to delete this class?',
					ok:'Yes',
					cancel:"No",
					type:2,
					messageCallback:function(){
						var _title=$(_that).parent();
						var _index=$(_that).parent().index();
						var _list=$(_that).parents('.trademark_tab_list').find('.trademark_tab_list_check').eq(_index);
						var _data_value=$(_that).attr('data-value');
						console.log(_index);
						for(var i=0;i<_this._selectClassArr.length;i++){
							if(_this._selectClassArr[i]==_data_value){
								_this._selectClassArr.splice(i,1);
								console.log(_this._selectClassArr);
								break;
							}
						}
						if(_title.prev().length>0){
							_title.prev().addClass('active');
							$(_that).parents('.trademark_tab_list').find('.trademark_tab_list_check').eq(_title.prev().index()).show();
						}else if(_title.next().length>0){
							_title.next().addClass('active');
							$(_that).parents('.trademark_tab_list').find('.trademark_tab_list_check').eq(_title.next().index()).show();
						}else{
							$(_that).parents('.trademark_tab_list').remove();
							if(_this._selectClassArr.length<1){
								$('.trademark_class_count').remove();
							}
						}
						$('.m_point').eq(1).html('(You may choose from the recommended class(es) below as needed)');
						_title.remove();
						_list.remove();
						_this.setCheckedClass();						
						_this._selectSubClassArr=[];
						for(var j=0;j<$('.tab_input:checked').length;j++){
							var _id=$('.tab_input:checked').eq(j).attr('data-value');
							var _code=$('.tab_input:checked').eq(j).attr('data-num');
							_this._selectSubClassArr.push({'id':_id,'code':_code});							
						}
						console.log(_this._selectSubClassArr);
						_this.countClassJsonFunc();
						_this.countClass();
						return true;
					}
				});
			});
			//类的数值变换
			$('.tab_input').live('click',function(){
				var _index=$(this).parents('.trademark_tab_list_check').index();
				var _thisTitle=$(this).parents('.trademark_tab_list').find('.trademark_tab_title').eq(_index).find('em');
				var _total=_thisTitle.html();
				var _data_value=$(this).attr('data-value');
				var _data_num=$(this).attr('data-num');
				if($(this).is(':checked')){
					_total++;
					_this._selectSubClassArr.push({'id':_data_value,'code':_data_num});					
				}else{
					_total--;
					for(var i=0;i<_this._selectSubClassArr.length;i++){
						if(_this._selectSubClassArr[i].id==_data_value){
							_this._selectSubClassArr.splice(i,1);
							break;
						}
					}
				}
				console.log(_this._selectSubClassArr);
				_this.countClassJsonFunc();
				_thisTitle.html(_total);
				_this.countClass();
			});
		},
		countClassJsonFunc:function(){
			var _this=this;
			_this._selectCountClassJson={};
			for(var i=0;i<_this._selectClassArr.length;i++){
				var _attr='';
				if(_this._selectClassArr[i]<10){
					_attr='0'+_this._selectClassArr[i];
				}else{
					_attr=_this._selectClassArr[i];
				}
				_this._selectCountClassJson[_attr]=[];
				for(var j=0;j<_this._selectSubClassArr.length;j++){
					if(_this._selectSubClassArr[j].code.substring(0,2)==_attr){
						_this._selectCountClassJson[_attr].push(_this._selectSubClassArr[j].id);
						//_this._selectSubClassArr.splice(j,1);
					}
				}
			}
			console.log(_this._selectCountClassJson);
		},
		step2_classFunc:function(){
			var _this=this;
			var _industry=$('.selectOption').attr('data-value');
			industryClass(_industry);
			//选择行业及推荐类
			$('.selectMenu li').bind('click',function(){
				var _data_value=$(this).attr('val');
				industryClass(_data_value);
			});
			function industryClass(_index){
				if(_index){
					var _html='';
					for(var i=0;i<_recommendJson[_index].length;i++){
						_html+="<li class='trademark_class_li fix'>"+
								"<span class='trademark_class_icon J_class_icon' data-value='"+_recommendJson[_index][i]+"'></span>"+
								"<p class='trademark_class_list_text'><em>"+_recommendJson[_index][i]+"</em> "+_allClassJson[_recommendJson[_index][i]].title+"</p>"+
							"</li>";
					}
					$('.trademark_class_ul').html(_html);
					_this.setCheckedClass();
				}
			}
		},
		trademark_step1_wrapper:function(){
			//选择新建申请人或者已有申请人
			$('.J_newLabel').bind('click',function(){
				DispClose=false;
				window.location.href='trademark_step1.html';
			});
			$('.J_frequentLabel').bind('click',function(){
				DispClose=false;
				window.location.href='trademark_step1-2.html';
			});
			//type:个人or公司
			$('.J_type_radio .m_label').bind('click',function(){
				$('.m_point').eq(1).html('');
				if($(this).attr('data-value')==2){
					$('.J_trademark_type i').html("Company Reg. No.");
				}else{
					$('.J_trademark_type i').html("Passport No.");
				}
			});
			//具体操作
			if($('#J_newApplicant').size()>0){			
				//window.onbeforeunload = CloseEvent;
				this.step1_ajax_func();
			}
			if($('#J_frequentApplicant').size()>0){
				this.step1_select_func();
			}
		},
		trademark_step2_wrapper:function(){
			var _this=this;
			var _switch=true;
			$('.J_submit').click(function(){
				if(_switch){
					DispClose=false;
					$('.m_point').eq(0).html('');
					_switch=false;
					var _name='',_type='',_description='',_class='';
					_name=$.trim($('.m_trademark_name').val());
					_description=$.trim($('.m_trademark_description').val());
					_class=$('.selectOption').attr('data-value');
					_type=$('.m_radio').eq(0).find('.checked').attr('data-value');
					if(_name==''){
						$('.m_point').eq(0).html('Trademark name cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					/*if(!isName(_name)){
						$('.m_point').eq(0).html('No special characters in Trademark Name.');
						_switch=true;
						return false;
					}else{
						var reg = /\s{2,}/g;
						_name = _name.replace(reg," ");
					}*/
					if(_description==''||_description==$('.m_trademark_description').attr('placeholder')){
						_description='';
					}
					//类别选择组合数据
					var _data_selectClassJson={};
					if(_this._selectClassArr.length>0){
						for(var i=0;i<_this._selectClassArr.length;i++){
							var _attr='';
							if(_this._selectClassArr[i]<10){
								_attr='0'+_this._selectClassArr[i];
							}else{
								_attr=_this._selectClassArr[i];
							}
							_data_selectClassJson[_attr]=[];
							if(_this._selectSubClassArr.length<1){
								$('.m_point').eq(1).html('Each class you choose shall contain at least one item. Otherwise, please delete the empty class in your list.');
								$('body,html').animate({scrollTop:0}, 500);
								$.dialog({
			    					content:'Error in your input. Please check and correct.',
			    					type:1,
			    					ok:'ok'
			    				});
								_switch=true;
								return false;
							}else{
								for(var j=0;j<_this._selectSubClassArr.length;j++){
									if(_this._selectSubClassArr[j].code.substring(0,2)==_attr){
										_data_selectClassJson[_attr].push(_this._selectSubClassArr[j].id);
										//_this._selectSubClassArr.splice(j,1);
									}
								}
							}
						}
						console.log(_data_selectClassJson);
						for(var attr in _data_selectClassJson){
							if(_data_selectClassJson[attr].length<1){
								$('.m_point').eq(1).html('Each class you choose shall contain at least one item. Otherwise, please delete the empty class in your list.');
								$('body,html').animate({scrollTop:0}, 500);
								$.dialog({
			    					content:'Error in your input. Please check and correct.',
			    					type:1,
			    					ok:'ok'
			    				});
								_switch=true;
								return false;
							}
						}
					}else{
						$('.m_point').eq(1).html('Please choose any class and child item.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					var data={'name':_name,'description':_description,'type':_type,'class':_class,'selectClassJson':_data_selectClassJson};
					console.log(data);
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:data,
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){		//设置成功
								//alert('成功');
								window.location.href='trademark_step3.html';
							}else{
								$.dialog({
			    					content:result.msg,
			    					type:0,
		        					messageCallback:function(){
		        						_switch=true;
										DispClose=true;
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
									DispClose=true;
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
		},
		trademark_step3_wrapper:function(){
			var _this=this;
			var _switch=true;
			$('.J_submit').click(function(){
				if(_switch){
					DispClose=false;
					$('.m_point').html('');
					_switch=false;
					var _img='',_pdf1='',_pdf2='';
					_img=$('.trademark_from .m_upload_img').attr('src');
					_pdf1=$('.trademark_from .trademark_from_list').eq(1).find('.m_upload_pdf em').attr('data-url');
					_pdf2=$('.trademark_from .trademark_from_list').eq(2).find('.m_upload_pdf em').attr('data-url');
					if(_img==''){
						$('.m_point').eq(0).html('Trademark Specimen cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_pdf1==''){
						$('.m_point').eq(1).html('Identity cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_pdf2==''){
						$('.m_point').eq(2).html('Attorney cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					var data={'img':_img,'pdf1':_pdf1,'pdf2':_pdf2};
					console.log(data);
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:data,
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							if(result.errcode==200){		//设置成功
								window.location.href='trademark_step4.html';
							}else{
								$.dialog({
			    					content:result.msg,
			    					type:0,
		        					messageCallback:function(){
		        						_switch=true;
										DispClose=true;
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
									DispClose=true;
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
		},
		trademark_step4_wrapper:function(){
			var _switch=true;
			$('.J_confirmOrder_btn').click(function(){
				if(_switch){
					_switch=false;
					$.dialog({
    					content:'Are you sure with all the information to confirm an order? Once confirmed, the order will be processed in the system and cannot be changed.',
    					ok:'Yes',
    					cancel:"No",
    					type:2,
    					messageCallback:function(){
							DispClose=false;
    						$.dialog({
		    					content:'Generating the order. Please wait…',
		    					type:0,
		    					messageCallback:function(){
		    						window.location.href='trademark_step5.html'
		    					}
		    				});
    					},
    					cancelCallback:function(){
    						_switch=true;
							DispClose=true;
    					}
    				});
				}
			});
		},
		trademark_step6_wrapper:function(){
			$('.J_pay_radio .m_label').bind('click',function(){
				if($(this).attr('data-value')!=1){					
					if($(this).attr('data-value')==2){
						$('.pay_point var').html('Western Union');
						$('.pay_point i').html('After the payment is made, please complete the Remittance Receipt in next page so that we can verify. Also, find this order in “My eMark” and you will see the Remittance Receipt. We may not proceed with the submission until verifying that you have paid. It may take 3-7 weekdays to verify the payment if you choose to pay via Western Union.');
					}					
					if($(this).attr('data-value')==3){
						$('.pay_point var').html('Check');
						$('.pay_point i').html('After the payment is made, please complete the Remittance Receipt in next page so that we can verify. Also, find this order in “My eMark” and you will see the Remittance Receipt. We may not proceed with the submission until verifying that you have paid. It may take 7-15 weekdays to verify the payment if you choose to pay via Check.');
					}					
					if($(this).attr('data-value')==4){
						$('.pay_point var').html('Visa');
						$('.pay_point i').html('After the payment is made, please complete the Remittance Receipt in next page so that we can verify. Also, find this order in “My eMark” and you will see the Remittance Receipt. We may not proceed with the submission until verifying that you have paid. It may take 7-15 weekdays to verify the payment if you choose to pay via Wire Transfer.');
					}
					$('.pay_point').slideDown();
				}else{
					$('.pay_point').slideUp();
				}
			});
			this.step6_ajax_func();
		},
		step1_ajax_func:function(){
			var _switch=true;
			$('.trademark_btn').click(function(){
				if(_switch){
					DispClose=false;
					$('.m_point').html('');
					_switch=false;
					var _form='',_name='',_type='',_num='',_addr='',_postcode='',_country='';
					_form=$('.m_radio').eq(0).find('.checked').attr('data-value');
					_name=$.trim($('.m_name').val());
					_type=$('.m_radio').eq(1).find('.checked').attr('data-value');
					_num=$.trim($('.m_num').val());
					_addr=$.trim($('.m_addr').val());
					_postcode=$.trim($('.m_postcode').val());
					_country=$.trim($('.m_country').val());
					if(_name==''){
						$('.m_point').eq(0).html('Name cannot be null.');
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
					if(_num==''){
						$('.m_point').eq(1).html($('.J_trademark_type i').html()+' cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					if(_addr==''){
						$('.m_point').eq(2).html('Address cannot be null.');
						$('body,html').animate({scrollTop:0}, 500);
						$.dialog({
	    					content:'Error in your input. Please check and correct.',
	    					type:1,
	    					ok:'ok'
	    				});
						_switch=true;
						return false;
					}
					/*if(_postcode==''){
						$('.m_point').eq(3).html('Postcode cannot be null.');
						_switch=true;
						return false;
					}*/
					var data={'form':_form,'name':_name,'type':_type,'num':_num,'addr':_addr,'postcode':_postcode,'country':_country};
					console.log(data);
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:data,
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){		//设置成功
								window.location.href='trademark_step2.html';
							}else{							//设置失败 
								if(result.errcode==101){			//result.data=101 --申请人已经存在于“已有联系人”
									$.dialog({
				    					content:'It detects the applicant already existed, please choose from"Frequent Applicant".',
				    					ok:'Noted',
				    					type:1,
			        					messageCallback:function(){
			        						_switch=true;
											DispClose=true;	
			        					}
				    				});
								}else{
									$.dialog({
				    					content:result.msg,
				    					type:0,
			        					messageCallback:function(){
			        						_switch=true;
											DispClose=true;	
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
	        						DispClose=true;	
	        					}
	        				});
						}
					});*/
				}
			});
			this.removePoint();
		},
		step1_select_func:function(){
			$('.selectMenu li').bind('click',function(){
				window.location.reload();
			});
			var _switch=true;
			$('.trademark_btn').click(function(){
				if(_switch){
					_switch=false;
					var _name='';
					_name=$('.selectOption').attr('data-value');
					/*$.ajax({
						url:"data.php"
						type:"POST",
						data:{'name':_name},
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':200};
							/*var result={'errcode':101};*/
							if(result.errcode==200){		//设置成功
								window.location.href='trademark_step2.html';
							}else{							//设置失败 
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
				}
			});
		}, 
		trademark_step3_handle:function(){
			$('.trademark_from .m_upload_box').hover(function(){
				if($(this).find('.m_upload_img').length>0){
					if($(this).find('.m_upload_img').attr('src')!=''){
						$(this).find('.m_upload_close').show();
					}
				}else{
					if($(this).find('.m_upload_pdf em').html()!=''){
						$(this).find('.m_upload_close').show();
					}
				}

			},function(){
				$(this).find('.m_upload_close').hide();
			});
			$('.trademark_from .m_upload_close').click(function(){
				if($(this).parents('.m_upload_box').find('.m_upload_img').length>0){
					$(this).parents('.m_upload_box').find('.m_upload_img').attr('src','');
					$('.J_show_upload_btn').setDisabled();
				}else{
					$(this).parents('.m_upload_box').find('.m_upload_pdf em').html('');
				}
			});
		},
		step6_ajax_func:function(){
			var _switch=true;
			$('.trademark_btn').click(function(){
				if($('.c_switch.checked').length>0){
					if(_switch){
						_switch=false;
						var _pay=$('.m_radio .checked').attr('data-value');
						if(_pay==1){
							$.dialog({
								content:'Did you pay?',
								ok:'Yes',
								cancel:"Failed",
								type:2,
								messageCallback:function(){
									window.location.href='trademark_step7.html';
								},
								cancelCallback:function(){
									_switch=true;
								}
							});
							$('#paypalsubmit').submit();
						}else{
							/*$.ajax({
								 url:"/Trademark/addpaytype",
								 type:"POST",
								 data:{'pay':_pay,'msid':_msid},
								 dataType:'json',
								 success:function(result) {*/
								//var result={'errcode':200};
									var result={'errcode':200};
									if(result.errcode==200){		//成功
										window.location.href='trademark_step7-2.html';
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
						}
					}
				}
			});
		},
		removePoint:function(){
			$('.c_input').keypress(function(){
				if($(this).parents('.trademark_from_list').find('.m_point').length>0){
					$(this).parents('.trademark_from_list').find('.m_point').html('');
				}
			});
		},
		checkFunc:function(){
			$(document).delegate('.c_switch','click',function(){
				$(this).toggleClass('checked');
				if($('.c_switch').hasClass('checked')){
					$('.trademark_btn').removeDisabled();
				}else if(!$('.c_switch').hasClass('checked')){
					$('.trademark_btn').setDisabled();
				}
			});
		},
		trademarkSteps:function(){
			$('.trademark_check_btn').click(function(){
				$(this).parents('.content').find('.trademark_check_btn').removeClass('active');
				$(this).addClass('active')
				if($(this).parent().hasClass('trademark_check_btn1')){
					if($('.trademark_handle').is(':hidden')){
						$('.trademark_handle').show();
						$('.trademark_class').hide();
					}
				}else{
					if($('.trademark_class').is(':hidden')){
						$('.trademark_class').show();
						$('.trademark_handle').hide();
					}
				}
			});
			$('.trademark_check_btn1 .trademark_check_btn').click();
			$('.J_steps_btn1').click(function(){
				$.dialog({
					content:'<span class="m_dialog_close">×</span>Certificate of Incorporation / Identity is required to indicate the background/identity of an applicant of trademark according to the Implementing Regulations of the Trademark Law of China. If the applicant is an individual, he/she shall provide a copy of certificate of identity, e.g. passport; if the applicant is a company, it shall provide a copy of certificate of incorporation, e.g. certificate of commercial registration. The above-mentioned documents shall be a scan copy with color in pdf format less than 2M, bearing the signature or seal of the applicant (for company, signature of a responsible person or seal of the company will do). You may upload such documents later.',
					type:0,
					autoHide:false,
					init:function(){
						$('.dialog_text').css({'font-size':'18px','line-height':'24px','text-align':'left'});
						$('.dialog_content').css({'top':'20%'});
						$('.dialog_content .m_dialog_close').css({'position':'absolute','right':'3px','top':'0'});
					}
				});
			});
			$('.J_steps_btn2').click(function(){
				$.dialog({
					content:'<span class="m_dialog_close">×</span>We offer a template of Power of Attorney for you to fill in, print, signed or sealed, scanned with color and revert to us by uploading (in the “Upload” step). If it takes long to make this available, we offer the template here for you to prepare in advance (and if you are not sure how to fill it, please see the <a href="poa.html" style="color:#ff4c4c;" target="_blank">Reference Sample</a>). You may start application once the documents are ready.<p style="text-align:center"><a href="javascript:;" class="trademark_download_link" target="_blank">Download</a></p>',
					type:0,
					autoHide:false,
					init:function(){
						$('.dialog_text').css({'font-size':'18px','line-height':'24px','text-align':'left'});
						$('.dialog_content').css({'top':'20%'});
						$('.dialog_content .m_dialog_close').css({'position':'absolute','right':'3px','top':'0'});
					}
				});
			});
			$('.J_steps_btn3').click(function(){
				$.dialog({
					content:'<span class="m_dialog_close">×</span>1. A clear specimen of your mark in jpg format is required. The file shall be less than 200KB, and the pixel between 400*400 and 1500*1500.<br/>2. If you prefer to upload a scan copy of specimen, it shall be scanned into a size between 5 cm*5 cm to 10 cm*10 cm in 24-colored, 300dpi-resolutioned parameters.<br/>3. Please leave a space no less than 3 mm around the specimen to avoid any defects in printing the publication or certificate of registration.',
					type:0,
					autoHide:false,
					init:function(){
						$('.dialog_text').css({'font-size':'18px','line-height':'24px','text-align':'left'});
						$('.dialog_content').css({'top':'20%'});
						$('.dialog_content .m_dialog_close').css({'position':'absolute','right':'3px','top':'0'});
					}
				});
			});
			$('.J_steps_btn4').click(function(){
				$.dialog({
					content:'<span class="m_dialog_close">×</span>E-mail:<a href="mailto:info@emarkchina.com">info@emarkchina.com</a>',
					type:0,
					autoHide:false,
					init:function(){
						$('.dialog_content .m_dialog_close').css({'position':'absolute','right':'3px','top':'0'});
					}
				});
			});
			$('.dialog_content .m_dialog_close').live('click',function(){
				$(this).parents('.dialog_box').remove();
			});
			var _switch=true;
			$('.trademark_btn').click(function(){
				if(_switch){
					_switch=false;
					/*$.ajax({
						url:"/Whetherlogin/whetherlogin"
						type:"POST",
						dataType:'json',
						success:function(result) {*/
							var result={'errcode':100};
							if(result.errcode==200){		//登录	
								window.location.href='trademark_step1.html';
							}else{							//未登录
								$.dialog({
			    					content:'You may not file application on our website unless sign in your account. Please sign in or create an account.',
			    					type:2,
			    					ok:'To index',
			    					cancel:'Sign in',
		        					messageCallback:function(){
		        						window.location.href='index.html';
		        					},
		        					cancelCallback:function(){
		        						window.location.href='login.html';
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
			});
		},
		//点击协议书出现弹窗
		knowledgeFunc:function(){
			$('.trademark_knowledge').click(function(){
				if($('.m_knowledge_dialog').length<1){
					$('body').append(_knowledge);
					scrollBar('.m_knowledge_dialog .m_wrapper');
				}
			});
			$(document).delegate('.m_dialog_close','click',function(){
				$(this).parents('.m_dialog_box').remove();
			});
		},
		//点击商标类型出现弹窗
		markTypesFunc:function(){
			$('.trademark_markTypes').click(function(){
				if($('.m_markTypes_dialog').length<1){
					$('body').append(_markTypes);
					scrollBar('.m_markTypes_dialog .m_wrapper');
				}
			});
			$(document).delegate('.m_dialog_close','click',function(){
				$(this).parents('.m_dialog_box').remove();
			});
		},
		//点击协议书出现弹窗
		agreementFunc:function(){
			$('.trademark_handle .m_square_text').click(function(){
				if($('.m_agreement').length<1){
					$('body').append(_agreement);
					if($('.trademark_steps_wrapper .c_switch').hasClass('checked')){
						$('.m_dialog_box .c_switch').addClass('checked');
					}
					scrollBar('.m_agreement .m_wrapper');
				}
			});
			$(document).delegate('.m_dialog_close','click',function(){
				if($(this).parents('.m_dialog_box').find('.c_switch.checked').length>0){
					$('.trademark_steps_wrapper .c_switch').addClass('checked');
					$('.trademark_btn').removeDisabled();
				}else{
					$('.trademark_steps_wrapper .c_switch').removeClass('checked');
					$('.trademark_btn').setDisabled();
				}
				$(this).parents('.m_dialog_box').remove();
			});
		},
		//点击所有分类出现弹窗
		allClassesFunc:function(){
			var _this=this;
			$('.trademark_class_link a:eq(0)').click(function(){
				if($('.m_class_dialog').length<1){
					$('body').append(_classes);
					var _html='';
					var jslength=0;
					for(var attr in _allClassJson){
						jslength++;
					}
					for(var i=1;i<=jslength;i++){
						_html+="<li class='m_class_list'>"+
									"<span class='m_class_icon J_class_icon' data-value='"+i+"'></span>"+
									"<div class='m_class_title' title='"+_allClassJson[i].title+"'><em>"+i+"</em> "+_allClassJson[i].title+"</div>"+
								"</li>";
					}
					$('.m_class_dialog .m_iscroll_content').html(_html);
					_this.setCheckedClass();
					scrollBar('.m_class_dialog .m_wrapper');
				}
			});
			$(document).delegate('.m_dialog_close','click',function(){
				$(this).parents('.m_dialog_box').remove();
			});
			$(document).delegate('.J_class_icon','click',function(){
				if(!$(this).parent().hasClass('checked')){
					var _data_value=$(this).attr('data-value');
					_this._selectClassArr.push(_data_value);
					console.log(_this._selectClassArr);
					if($(this).hasClass('trademark_class_icon')){
						$(this).parent().addClass('checked')
					}
					//$(this).parents('.m_dialog_box').remove();
					_this.setCheckedClass();
					_this.addCheckedClass();
					$('.m_point').eq(1).html('(You may choose from the recommended class(es) below as needed)');
				}
			});
		},
		setCheckedClass:function(){
			var _this=this;
			$(".J_class_icon").parent().removeClass('checked');
			var _selectClassArrLength=_this._selectClassArr.length;
			if(_selectClassArrLength>0){
				for(var k=0;k<_selectClassArrLength;k++){
					$(".J_class_icon[data-value="+_this._selectClassArr[k]+"]").parent().addClass('checked');
				}
			}
		},
		addCheckedClass:function(){
			var _this=this;
			var _selectClassArrLength=_this._selectClassArr.length;
			var _html='';
			var _titleHtml='';
			if($('.trademark_tab_list').length<1){
				_html+="<p class='trademark_class_count'>"+
							"<span>Class(es): <em>0</em></span>"+
							"<span class='ml68'>Official fee＋Service fee: <em>"+_this._service_charge+"</em></span>"+
						"</p>";
			}
			$('.J_tab_parent').append(_html);
			if(_this._selectClassArr.length%4==1){
				_titleHtml="<li class='trademark_tab_list'>"+
								"<div class='trademark_tab_nav fix'>"+
								"</div>"+
								"<ul class='trademark_tab_box'></ul>"+
							"</li>";
			}
			$('.trademark_tab').append(_titleHtml);
			$('.trademark_tab_nav:last').append("<span class='trademark_tab_title'>"+_this._selectClassArr[_selectClassArrLength-1]+"（Total <em>0</em>）<span class='trademark_class_icon' title='delete' data-value='"+_this._selectClassArr[_selectClassArrLength-1]+"'></span></span>");
			var _subListClass="<li class='trademark_tab_list_check'>"+
									"<div class='trademark_tab_search'>"+
										"<input type='text' class='c_input' placeholder='Key words'/>"+
									"</div>"+
									"<div class='trademark_tab_checkbox'>"+
									"</div>"+
								"</li>";
			$('.trademark_tab_box:last').append(_subListClass);
			$('.trademark_tab_title:last').addClass('active').siblings('.trademark_tab_title').removeClass('active');
			var _subListClassList="";
			for(var n=0;n<_allClassJson[_this._selectClassArr[_selectClassArrLength-1]].subClass.length;n++){
				_subListClassList+="<p class='fix'><input type='checkbox' class='tab_input' data-value='"+_allClassJson[_this._selectClassArr[_selectClassArrLength-1]].subClass[n].id+"'  data-num='"+_allClassJson[_this._selectClassArr[_selectClassArrLength-1]].subClass[n].listNum+"'/><span>【"+_allClassJson[_this._selectClassArr[_selectClassArrLength-1]].subClass[n].listNum+"】 "+_allClassJson[_this._selectClassArr[_selectClassArrLength-1]].subClass[n].text+"</span></p>";
			}
			$('.trademark_tab_checkbox:last').append(_subListClassList);
			$('.trademark_tab_list_check:last').show().siblings('.trademark_tab_list_check').hide();
			_this.countClassJsonFunc();
			_this.countClass();
		},
		countClass:function(){				//计算选择的类别及钱数
			var _this=this;
			$('.trademark_class_count span:eq(0) em').html(_this._selectClassArr.length);
			//钱数
			/*var _subClassNum=_this._selectSubClassArr.length;
			var _price=parseFloat(_this._service_charge);
			if(_subClassNum>_this._base_class_num){
				_price+=(_subClassNum-_this._base_class_num)*_this._class_charge2;
			}
			_price+=_subClassNum*_this._class_charge1;*/
			var _classNum=_this._selectClassArr.length;
			var _price=_classNum*_this._service_charge;
			for(var attr in _this._selectCountClassJson){
				var _length=_this._selectCountClassJson[attr].length;
				if(_length>_this._base_class_num){
					_price+=(_length-_this._base_class_num)*_this._class_charge2;
				}
			}
			$('.trademark_class_count span:eq(1) em').html('USD '+_price);
			
		},
		//点击支付须知出现弹窗
		payStatementFunc:function(){
			$('.m_square_text').click(function(){
				if($('.m_pay_dialog').length<1){
					$('body').append(_payStatement);
					if($('.trademark_step6_wrapper .c_switch').hasClass('checked')){
						$('.m_dialog_box .c_switch').addClass('checked');
					}
					scrollBar('.m_pay_dialog .m_wrapper');
				}
			});
			$(document).delegate('.m_dialog_close','click',function(){
				if($(this).parents('.m_dialog_box').find('.c_switch.checked').length>0){
					$('.trademark_step6_wrapper .c_switch').addClass('checked');
					$('.trademark_btn').removeDisabled();
				}else{
					$('.trademark_step6_wrapper .c_switch').removeClass('checked');
					$('.trademark_btn').setDisabled();
				}
				$(this).parents('.m_dialog_box').remove();
			});
		}
	}
	_trademark.init();
});
