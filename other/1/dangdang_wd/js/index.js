/*var position=null;
function ajaxBack(func){
	$.ajax({
	    type : "POST",
	    url: 'ask.php',
        dataType:'json',
        success: function (data) {
  	       if(data.status!=0){
      	    	position=data;
      	    }else{
      	    	ajaxBack();
	      	}
        },
        error:function(e){
            ajaxBack();
        }
	});
}*/
var position=[
			    {
			        "title": "1.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "1-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "1-2今天不行，下午四点钟我要开个会",
			        "option3": "1-3我不能再容许你早退了，你要顾及他人的想法",
			        "type": "沟通"
			    },
			    {
			        "title": "2.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "2-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "2-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "2-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "组织"
			    },
			    {
			        "title": "3.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "3-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "3-2.今天不行，下午四点钟我要开个会",
			        "option3": "3-3.我不能再容许你早退了，你要顾及他人的想法",
			        "type": "协作"
			    },
			    {
			        "title": "4.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "4-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "4-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "4-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "逻辑"
			    },
			    {
			        "title": "5.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "5-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "5-2.今天不行，下午四点钟我要开个会",
			        "option3": "5-3.我不能再容许你早退了，你要顾及他人的想法",
			        "type": "创新"
			    },
			    {
			        "title": "6.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "6-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "6-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "6-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "抗压"
			    },
			    {
			        "title": "7.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "7-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "7-2.今天不行，下午四点钟我要开个会",
			        "option3": "7-3.我不能再容许你早退了，你要顾及他人的想法",
			        "type": "逻辑"
			    },
			    {
			        "title": "8.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "8-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "8-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "8-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "组织"
			    },
			    {
			        "title": "9.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "9-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "9-2.今天不行，下午四点钟我要开个会",
			        "option3": "9-3.我不能再容许你早退了，你要顾及他人的想法",
			        "type": "沟通"
			    },
			    {
			        "title": "10.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "10-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "10-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "10-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "抗压"
			    },{
			        "title": "11.有位员工连续四次在周末向你要求他想提早下班，此时你会说：",
			        "option1": "11-1.你对我们相当重要，我需要你的帮助，特别是",
			        "option2": "11-2.今天不行，下午四点钟我要开个会",
			        "option3": "11-3.我不能再容许你早退了，你要顾及他人的想法",
			        "type": "协作"
			    },{
			        "title": "12.你刚好被聘为部门主管，你知道还有几个人关注这个职位，上班的第一天，你会：",
			        "option1": "12-1.把问题记在心上，但立即投入工作，并开始认",
			        "option2": "12-2.忽略这个问题，并认为情绪的波动很快会过去",
			        "option3": "12-3.找个别人谈话，以确认哪几个人有意竞争此职",
			        "type": "创新"
			    }
			];
var scoreClass={"沟通":0,"抗压":0,"创新":0,"协作":0,"组织":0,"逻辑":0};
loading([{'url':'img/arrow.png'},
		{'url':'img/btn_arrow.png'},
		{'url':'img/qiqiu.png'},
		{'url':'img/one_logo.png'},
		{'url':'img/share_bg.png'},
		{'url':'img/two_logo.png'},
		{'url':'img/bottom.gif'}],function(){
			$('#loading').hide();
			$('#startPage').show();
				init();
		});
function init(){
	//每个职能下对应的职位
	var Job={'A':['仓储班组长','仓储主管','仓库经理'],
			 'B':['Java工程师','iOS工程师','PHP工程师'],
			 'C':['运营经理','招商经理','商务拓展经理'],
			 'D':['财务管理主管','财务管理助理','总账经理'],
			 'E':['行政经理','前台','行政助理'],
			 'F':['产品经理','招商经理','商务拓展经理']};
	//调用分享事件
	$('#enterBtn').on(clickEvtName,function(){
		$('#wrap').fadeIn();
		$('#startPage').addClass('on');
	});
	//点击职能和职位选项
    $('#wrap li').live(clickEvtName,function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        if($(this).parents('.step1').length>0){
            var name=$(this).attr('func');
            selectJob(name);
        }
    });
    //点击职能后职位联动
    function selectJob(name){
        var job=Job[name];
        var length=job.length;
        var str='';
        for(var i=0;i<length;i++){
            if(i==0){
                str+="<li class='active'>"+job[i]+"</li>";
            }else{
                str+="<li>"+job[i]+"</li>";
            }
        }
        $('.step2 ul').html(str);
    }
	//职能页的下一步按钮
	$('#selectBtn').on(clickEvtName,function(){
		$('.step1').hide();
		$('.step2').show();
	});
	//职位页的下一步按钮
	$('#nextSBtn').on(clickEvtName,function(){
		$('.step2').hide();
		$('.step3').show();
	});
	var num=0;		
	var flagBtn=false;
	askQuestion(num);
	//下一题按钮
	$('#nextQBtn').on(clickEvtName,function(){
		if(num<=12){
			if($('.step3 li.active').length<1){
				showDtail('请选择答案再继续');
			}else if(flagBtn){      //重新加载下一题题库
				score(num-1);
				flagBtn=false;
				if(num==11){
					$('#nextQBtn').text('完成');
				}else if(num==12){
					$('.step3').hide();
					//$('#gifImg').hide();
					//$('.step4').fadeIn();
					$('.step5').fadeIn();
					/* 显示右上角按钮 */
					tool(showOptionMenu);
					items = [
								["", scoreClass['沟通'], scoreClass['抗压'], scoreClass['创新'], scoreClass['协作'], scoreClass['组织'], scoreClass['逻辑'],] 
							];
					console.dir(items);
					radar(items);
					return false;
				}
				askQuestion(num);
			}
			else
				showDtail('正在加载下一题', true)
		}else{      
			showDtail('答题结束');
		}
	});
	//点击职能和职位选项
	$('.step3 li').live(clickEvtName,function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
	});
	function askQuestion(n){
		var title=position[n].title,
		    type=position[n].type,
		    option1=position[n].option1,
		    option2=position[n].option2,
		    option3=position[n].option3;
		//setTimeout(function(){
			$('#askQuestion h3').attr('type',type).html(title);
			$('#askQuestion ul li').eq(0).html(option1);
			$('#askQuestion ul li').eq(1).html(option2);
			$('#askQuestion ul li').eq(2).html(option3);
			$('.mask').hide();
			flagBtn=true;
			num+=1;
			$('.step3 li').removeClass('active');
		//},2000);
			
	}
	function score(oldnum){
		var prev_type=position[oldnum].type,
			old_score=scoreClass[prev_type],
		    add_score=parseInt($('.step3 li.active').attr('score'));
		scoreClass[prev_type]=old_score+add_score;
		console.dir(prev_type+','+old_score+','+add_score+','+scoreClass[prev_type]);
	}
	/* 隐藏右上角按钮 */
	/*document.addEventListener('WeixinJSBridgeReady', function(){
		WeixinJSBridge.call('hideOptionMenu');
	}, false);*/
	function hideOptionMenu(){
	    WeixinJSBridge.call('hideOptionMenu');
	}
	function showOptionMenu(){
	    WeixinJSBridge.call('showOptionMenu');
	}

	//tool(hideOptionMenu);
}
function tool(func){
	if (typeof WeixinJSBridge == "undefined"){
	    if( document.addEventListener ){
	        document.addEventListener('WeixinJSBridgeReady', func, false);
	    }else if (document.attachEvent){
	        document.attachEvent('WeixinJSBridgeReady', func); 
	        document.attachEvent('onWeixinJSBridgeReady', func);
	    }
	}else{
	    func();
	}
}
function radar(items){
	var rc = new html5jp.graph.radar("sample");
	if( ! rc ) { return; }
	var params = {
		aCap: ["沟通", "逻辑", "抗压", "协作", "创新", "组织"],
		aMax: 6,
		aMin: 0,
		aCapColor: '#e7242e',
		aCapFontFamily: '微软雅黑',
		aCapFontSize: '34px',    //类型字体大小
		sLabelFontSize: '20px',   //坐标字体大小
		//legendFontSize: '28px',  //右侧模块分类字体大小
		chartShape: "circle",
		faceColors: ["#ff7870"],
		aLinePositions: [0,1,2,3,4,5,6]
	};
	rc.draw(items, params);
}
