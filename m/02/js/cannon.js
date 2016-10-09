//炮
var CANNON_SIZE=[
	null,
	{w: 74, h: 74},
	{w: 74, h: 76},
	{w: 74, h: 76},
	{w: 74, h: 83},
	{w: 74, h: 85},
	{w: 74, h: 90},
	{w: 74, h: 94}
];
function Cannon(num){
	this.num=num;
	this.x=424;
	this.y=560;
	this.inow=0;
	this.timer=null;
	this.rotate=0;
}

Cannon.prototype.draw=function(gd){
	var w=CANNON_SIZE[this.num].w;
	var h=CANNON_SIZE[this.num].h;
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	gd.drawImage(json['cannon'+this.num],0,this.inow%5*h,w,h,-w/2,-h/2,w,h);

	gd.restore();
};
Cannon.prototype.fire=function(){
	var _this=this;
	clearInterval(this.timer);
	this.timer=setInterval(function(){
		_this.inow++;
		if(_this.inow==6){
			_this.inow=0;
			clearInterval(_this.timer)
		}
	},60)
};