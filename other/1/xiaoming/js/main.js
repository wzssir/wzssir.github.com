/**
 * @info	  云小明场景应用
 * @authors   dongjianghao
 * @date      2014-10-14
 * @copyright 云途明志科技有限公司
 */
var imgData = [
	{'url':'http://yunxiaoming.qiniudn.com/img/bg.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/bg_top.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item1_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item1_2.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item1_3.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item2_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item2_bg.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item3_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item4_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item5_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item5_bg.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item6_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item6_dashed.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item7_1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item7_crack1.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item7_crack2.png'},
	{'url':'http://yunxiaoming.qiniudn.com/img/item7_crack3.png'}
];
// 读取图片元素
// setTimeout(function(){
	loadImg(imgData);
// },2000);

// 取消默认事件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function xiaoMingSlide(opts){
	this.wrap = opts.wrap;
	this.list = $(this.wrap).find('.list').eq(0);
	this.size = $(this.list).find('li').size();
	this.arrow = $('#slider_arr');
	this.bgm   = $('#bgm').get(0);
	this.musicIcon = $('.music').eq(0);
	this.music = true;
	this.footprint = 0;
	this.pmSwithc = true;

	this.init();
	this.slide();
	// this.findPM();	// 点击、脚印效果
}

xiaoMingSlide.prototype.init = function(){
	// this.windowHeight = window.innerHeight;
	// this.windowWidth = window.innerWidth;
	this.windowHeight = $('body').height();
	this.windowWidth = $('body').width();
	this.slideSwitch = true;
	this.index = 0;
	$('body').height(this.windowHeight);
}

xiaoMingSlide.prototype.slide = function(){
	var self = this;
	$(this.list).find('li').css({
		'height':self.windowHeight,
		'width':self.windowWidth
	});
	this.wrap.on('swipeUp',function(){
		if(self.slideSwitch){
			self.index++;
			self.goAnimate(self.index);
		}
	}).on('swipeDown',function(){
		if(self.slideSwitch){
			self.index--;
			self.goAnimate(self.index);
		}
	}).on('webkitTransitionEnd',function(){
		self.slideSwitch = true;
	});
	// element.addEventListener('webkitTransitionEnd', end, false);
}

xiaoMingSlide.prototype.goAnimate = function(index){
	var self = this;
	var size = self.size;
	self.index = index;
	self.slideSwitch = false;
	if(self.index >=size-1){
		self.slideSwitch = true;
		self.index = size-1;
	}else if(self.index < 0){
		self.slideSwitch = true;
		self.index = 0;
	}
	self.index == self.size-1 ? self.arrow.hide() : self.arrow.show();
	// self.list.find('.item').eq(self.index).addClass('active').siblings().removeClass('active');
	self.list.find('.item').eq(self.index).addClass('active');
	var oy = -(self.index*self.windowHeight);
	self.list.get(0).style.webkitTransform = 'translate3d(0,'+oy+'px,0)';
	self.setMusic();
	self.findPM(self.index);
}

xiaoMingSlide.prototype.setMusic = function(){
	var self = this;
	var musicSwith = true;
	// 滑动播放
	if(self.music){
		self.music = false;
		self.bgm.play();
		self.musicIcon.fadeIn();
	}
	// 点击
	self.musicIcon.on('click',function(e){
		e.preventDefault();
		if(musicSwith){
			self.bgm.pause();
			$(this).removeClass('music_rotate').addClass('stop');
			musicSwith = false;
		}else{
			self.bgm.play();
			$(this).addClass('music_rotate').removeClass('stop');
			musicSwith = true;
		}
	});
	// 设置自动播放
	self.bgm.addEventListener('ended', function () {
	setTimeout(function () { self.bgm.play(); }, 300);
	}, false);
}

xiaoMingSlide.prototype.findPM = function(idx){
	var self = this;
	if(idx == self.size -1 && self.pmSwithc){
		$(document).on('tap',function(){
		     // $('.footprint > .cell').eq(footprint).animate({opacity:1})
		     $('.footprint > .cell').eq(self.footprint).addClass('z-on');
		     if(self.footprint == 0){
		     	$('.item_7').find('.crack3').show();
		     }
		     if(self.footprint == 1){
		     	$('.item_7').find('.crack2').show();
		     }
		     if(self.footprint == 2){
		     	$('.item_7').find('.crack1').show();
		     	setTimeout(function(){
		     		$('.page1').fadeOut(1000);
		     		$('.page2').fadeIn(1000);
		     	},500);
		     	self.footprint == 2
		     	self.pmSwithc = false;
		     }
		     if(self.footprint > 2){
		     	return false;
		     }
			self.footprint+=1;
		});
	}
}

// 加载滑动效果
new xiaoMingSlide({
	'wrap' : $('#wrap')
});

function loadImg(imgData){
	var l=imgData.length;
	var jd=0;
	$.each(imgData,function(i){
		var newImg=new Image();
		newImg.onload = newImg.onerror =function(){
			jd+=100/l
			// $('#loadingNum').html(parseInt(jd));
			if(jd>99){
				// $('#loadingNum').html(100);
				showSlidePage();
			};
		}
		newImg.src=imgData[i].url;
	})
}

function showSlidePage(){
	setTimeout(function(){
		$('#loading').hide();
		$('.wrap').show();
		setTimeout(function(){
			$('.list').find('li').eq(0).addClass('active');
		},300)
	},300);
}
