// 图片数据
var imgData = [
	{'url':'images/arr.png'},
	{'url':'images/background.png'},
	{'url':'images/logo.png'},
	{'url':'images/logo_icon.png'},
	{'url':'images/orientation.png'},
	{'url':'images/share_bg.png'},
	{'url':'images/step1_bg1.png'},
	{'url':'images/step1_bg2.png'},
	{'url':'images/step2_bg1.png'},
	{'url':'images/step2_bg2.png'},
	{'url':'images/step2_bg3.png'},
	{'url':'images/step2_num0.png'},
	{'url':'images/step2_num1.png'},
	{'url':'images/step2_num2.png'},
	{'url':'images/step2_num3.png'},
	{'url':'images/step2_num4.png'},
	{'url':'images/step2_num5.png'},
	{'url':'images/step2_num6.png'},
	{'url':'images/step2_num7.png'},
	{'url':'images/step2_num8.png'},
	{'url':'images/step2_num9.png'},
	{'url':'images/step3_arr.png'},
	{'url':'images/step3_bg1.png'},
	{'url':'images/step3_bg2.png'},
	{'url':'images/step3_icon1.png'},
	{'url':'images/step3_icon2.png'},
	{'url':'images/step3_icon3.png'},
	{'url':'images/step3_icon4.png'},
	{'url':'images/step3_icon5.png'},
	{'url':'images/step3_icon6.png'},
	{'url':'images/step3_icon7.png'},
	{'url':'images/step3_icon8.png'},
	{'url':'images/step4_bg1.png'},
	{'url':'images/step4_bg2.png'},
	{'url':'images/step4_bg3.png'},
	{'url':'images/step4_bg4.png'},
	{'url':'images/step5_bg1.png'},
	{'url':'images/step5_bg2.png'},
	{'url':'images/step5_bg3.png'},
	{'url':'images/step5_bg4.png'},
	{'url':'images/step5_bg5.png'},
	{'url':'images/step5_bg6.png'},
	{'url':'images/step5_bg7.png'},
	{'url':'images/step5_bg8.png'},
	{'url':'images/step5_bg9.png'},
	{'url':'images/step5_bg10.png'},
	{'url':'images/step5_bg11.png'},
	{'url':'images/step5_bg12.png'},
	{'url':'images/step7_bg1.png'},
	{'url':'images/step7_bg2.png'},
	{'url':'images/step7_bg3.png'}
];
loadImg(imgData);
function swiperFun(){
	var mySwiper = new Swiper('#scroller',{mode:'vertical',autoResize:false});
	// 滑动回调
	mySwiper.addCallback('SlideChangeStart', function(swiper){
		console.log(swiper.activeIndex);
		$('.swiper-slide').eq(swiper.activeIndex).addClass('active');
		if(swiper.activeIndex==1){
			setTimeout(function(){
				$('.step2').addClass('on');
			},1500);
			lotteryFun();
		}
		if($('.swiper-slide').eq(swiper.activeIndex).hasClass('step7')){
			$('.m_bottom').hide();
		}else{
			$('.m_bottom').show();
		}
	});
	$('.step4_text .positionSpan').on(clickEvtName,function(e){
		e.stopPropagation();
		e.preventDefault(); 
		var _this=this;
		if($('.step4_mark').hasClass('active')){
			return false;
		}else{
			var _text=$(_this).find('span').html();
			var _html="<div class='step4_mark translate active'>"+
					"<div class='step4_text step4_text4'><span>"+_text+"</span></div>"+
				"</div>";
			$('.step4').append(_html);
		}
	});
	$(document).on(clickEvtName,function(){
		$('.step4_mark').remove();
	});
	var _switch=true;
	$('.step7_bg2').on('touchend',function(){
		setTimeout(function(){
			$('.step7_bg2').hide();
			$('.step7_bg3').animate({'opacity':1},1000);
			setTimeout(function(){
				$('.step7_bg3').on('touchstart',function(){
					$('.m_share').fadeIn();
				});
			},1000);
			$('.m_share').on('touchstart',function(){
				$(this).fadeOut();
			});
			if(_switch){
				_switch=false;
				$.ajax({
					url:"data.php",
					success:function(result) {
					},
					error : function(e){
					}
				});
			}
		},1000);
	});
}
function loadImg(imgData){
	var l=imgData.length;
	var jd=0;
	$.each(imgData,function(i){
		var newImg=new Image();
		newImg.onload = newImg.onerror =function(){
			jd+=100/l;
			if(jd>99){
				setTimeout(function(){
					$('#loading').hide();
					$('.swiper-wrapper,.m_bottom').show();
					_height = $(window).height();
					swiperFun();
					$('.swiper-slide').eq(0).addClass('active');
					// 执行滑动
					document.addEventListener('touchmove', function (e) { e.preventDefault();},false);
					//step3_bg2
					var step3Height=$('.step3_bg2').height();
					$('.step3_bg2').width(step3Height*477/506);
				},200);
			};
		};
		newImg.src=imgData[i].url;
	})
}

function lotteryFun(){
var LOTTERY_ITEM   = $('.step2_num'),
    LOTTERY_SIZE   = LOTTERY_ITEM.size(),
    LOTTERY_HEIGHT = LOTTERY_ITEM.height(),
    LOTTERY_ITEM_HEIGHT = LOTTERY_HEIGHT*10,
    LOTTERY_I      = 0,
    LOTTERY_TIMER = {},
    LOTTERY_SWITCH = true,
    LOTTERY_STOP_SWITCH = true,
    mobileNumarr=[],
    mobileNum = '28752';
    LOTTERY_ITEM.find('ol').height(LOTTERY_ITEM_HEIGHT);
    LOTTERY_ITEM.find('ol>li').height(LOTTERY_HEIGHT);

    lotteryTimerGo();
    setTimeout(function(){
    	lotterNumber();
        setTimeout(function(){
            setTimeout(function(){
                LOTTERY_SWITCH = true;
            },500)
        },500);
    },1000);

    function lotteryTimerGo(){
	    setTimeout(function(){
	        lotteryRoll(LOTTERY_I);
	        LOTTERY_I++;
	        LOTTERY_I >= LOTTERY_SIZE ? LOTTERY_I = 0 : lotteryTimerGo();
	    },100)
	}

	function lotteryRoll(j){
	    var i = 0,
	        _this = LOTTERY_ITEM.eq(j),
	        _thisOl = _this.find('ol');
	    LOTTERY_TIMER[j] = setInterval(function(){
	        i-=30;
	        i < - LOTTERY_ITEM_HEIGHT + LOTTERY_HEIGHT ? i=0 : i;
	        _thisOl.css('top',i);
	        if(LOTTERY_STOP_SWITCH){
	            //console.log(LOTTERY_I);
	            if(j == LOTTERY_I && parseInt(_thisOl.css('top')) + mobileNumarr[j] * LOTTERY_HEIGHT >= 0){
	                LOTTERY_I++;
	                _thisOl.css('top', parseInt(mobileNumarr[j]) * -LOTTERY_HEIGHT);
	                clearInterval(LOTTERY_TIMER[j]);
	            }
	        }
	    },30);
	}

	function lotterNumber(){
	    for(var i = 0; i < mobileNum.length; i++){
	        mobileNumarr.push(mobileNum.charAt(i));
	    };
	    LOTTERY_STOP_SWITCH = true;
	}

}
