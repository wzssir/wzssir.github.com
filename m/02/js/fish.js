//鱼
var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];
function Fish(num){
	this.num=num;
	this.x=0;
	this.y=0;
	this.speed=1;
	this.rotate=0;
	this.inow=0;
	this.collR=FISH_SIZE[num].collR;

	this.move();
}
Fish.prototype.draw=function(gd){
	var h=FISH_SIZE[this.num].h;
	var w=FISH_SIZE[this.num].w;
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	//根据角度，修改阴影位置
	if(this.rotate>=135 && this.rotate<225){
		gd.scale(1,-1);
	}
	gd.drawImage(json[aImg[this.num-1]],0,this.inow%4*h,w,h,0,0,w,h);
	gd.restore();
};

Fish.prototype.move=function(){
	var _this=this;
	
	setInterval(function (){
		var speedX=Math.cos(d2a(_this.rotate))*_this.speed;
		var speedY=Math.sin(d2a(_this.rotate))*_this.speed;
	//鱼动
		_this.x+=speedX;
		_this.y+=speedY;
	}, 30)
	//鱼摆尾
	setInterval(function(){
		_this.inow++;
	}, 200)
};

Fish.prototype.catch=function(x,y){
	var fx=this.x+30;
	var fy=this.y+30;

	var c=Math.sqrt((x-fx)*(x-fx)+(y-fy)*(y-fy));

	if(c<this.collR){
		return true;
	}else{
		return false;
	}
};