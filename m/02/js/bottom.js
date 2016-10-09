//炮台
function Bottom(){
	this.x=0;
	this.y=530;
}
Bottom.prototype.draw=function(gd){
	gd.save();
	gd.drawImage(json.bottom,0,0,765,70,this.x,this.y,765,70);
	gd.restore();
};
