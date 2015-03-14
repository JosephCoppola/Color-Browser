// utils.js

"use strict";
var app = app || {};

app.Button = function(){

	function Button(x,y,id,string,color,width,height,fontSize)
	{
		this.x = x;
		this.y = y;
		this.id = id;
		this.string = string;
		this.color = color;
		this.width = width;
		this.height = height;
		this.fontSize = fontSize;
		
		this.utils = app.utils;
	};
	
	var b = Button.prototype;
	
		b.draw = function(ctx){
			ctx.save();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
			ctx.beginPath();
			ctx.arc(this.x,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.x + this.width,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
			ctx.fill();
			ctx.fillStyle = "black";
			ctx.font = this.utils.makeFont(this.fontSize, "sans-serif");
			ctx.textAlign="center";
			ctx.textBaseline = "middle";
			ctx.fillText(this.string,this.x + this.width/2,this.y + this.height/2);
			ctx.restore();
		};
		
		b.update = function(){
			//Check if they are being clicked
		};
	
	// the "prototype" of this module
	return Button;
}(); 
