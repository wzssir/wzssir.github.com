
;(function($){
	/*飞行动画，先慢后快*/
	$.extend( jQuery.easing ,{
		starFly: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
	});	
	$.fn.planetTravel = function( option ){
		var $obj = $(this);
		var opts = $.extend({},$.fn.planetTravel.defaults,option);		
		var viewSize ,maxWidth ,maxHeight  ;			
		checkSize();
		
		
		/*给 window 绑定缩放、滚动事件*/
		$(window).bind('resize.julying scroll.julying',function(e){
           checkSize(); 
        });
	
		function checkSize(){
			viewSize = getViewSize();
			maxWidth = viewSize[0];
			maxHeight = viewSize[1];
		};	
	
	};
	
})(jQuery);