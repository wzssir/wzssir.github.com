//死鱼
function Diefish(num){
	this.num=num;
	this.x=0;
	this.y=0;
	this.rotate=0;
	this.inow=0;
	this.move();
}
Diefish.prototype.draw=function(gd){
	var h=FISH_SIZE[this.num].h;
	var w=FISH_SIZE[this.num].w;
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	if(this.rotate>=135 && this.rotate<225){
		gd.scale(1,-1);
	}
	gd.drawImage(json['fish'+this.num],0,4*h+this.inow%4*h,w,h,0,0,w,h);
	gd.restore();
};
Diefish.prototype.move=function(gd){
	var _this=this;
	setInterval(function(){
		_this.inow++;
	}, 100)
}
