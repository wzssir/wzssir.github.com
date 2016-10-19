$(function(){
	$('.figure_wrap').each(function(){
		$(this).slide({ 
			titCell:".num ul" ,
		    mainCell:".figure_pic" , 
		    effect:"leftLoop", 
		    autoPlay:true, 
		    delayTime:700 , 
		    autoPage:true
		});
	});
	/*window.mySwiper=$('.figure_wrap').slide({ 
			titCell:".num ul" ,
		    mainCell:".figure_pic" , 
		    effect:"leftLoop", 
		    autoPlay:true, 
		    delayTime:700 , 
		    autoPage:true
		});	
	$(window).resize(function(){
		mySwiper.init();
	});*/
	$('.index_step li').hover(function(){
		var _index=$(this).index();
		$('.index_step .active').removeClass('active');
		$('.index_step_content .active').removeClass('active');
		$(this).addClass('active');
		$('.index_step_content p').eq(_index).addClass('active');
	});
	var _figureWidth=$('.index_step4_figure').width();
	$('.index_step4_nav a').click(function(){
		var _index=$(this).index();
		$('.index_step4_nav a').removeClass('active');
		$(this).addClass('active');
		$('.figure_ul').animate({'left':'-'+_figureWidth*_index},500);
	});
	$(window).scroll(function () {
		console.log($(window).scrollTop());
	  	if($(window).scrollTop()==0){
	  		$('.m_gotop').hide();
	  	}else{
	  		$('.m_gotop').show();
	  	}
	});
	$('.m_gotop').on('click', function(){
	    $('body,html').animate({scrollTop:0}, 500);
	});
});
