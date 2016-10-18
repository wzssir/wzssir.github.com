// 图片数据
function loading(imgObj,func){
	var windHeight=$(window).height();
	$('#loading').css('height',windHeight+'px');
	var imgData = imgObj;
	Mcdonald = {
		init : function(){
			// 加载图片loading方法
			this.loadImg(imgData);
			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		},
		loadImg : function(imgData){
			var l=imgData.length;
			var jd=0;
			$.each(imgData,function(i){
				var newImg=new Image();
				newImg.onload = newImg.onerror =function(){
					jd+=100/l;
					$('#loadingNum').html(parseInt(jd));
					if(jd>99){
						$('#loadingNum').html(100);
						setTimeout(function(){ 
							//$('#loading').hide();
							if(typeof func == 'function') func();
							/*var wHeight = $('body').height();
							$('body').height(wHeight);*/
						},500)
					}
				}
				newImg.src=imgData[i].url;
			})
		}
	}
	Mcdonald.init();	
}
