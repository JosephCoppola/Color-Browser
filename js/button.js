// utils.js

"use strict";
var app = app || {};

app.Button = function(){

	function Button(x,y,id,string,outerColor,innerColor,width,height,fontSize,doFunction)
	{
		this.x = x;
		this.y = y;
		this.id = id;
		this.string = string;
		this.outerColor = outerColor;
		this.innerColor = innerColor;
		this.width = width;
		this.height = height;
		this.fontSize = fontSize;
		this.innerWidth = width * .75;
		this.innerHeight = height * .75;
		this.utils = app.utils;
		this.centroid = this.utils.getCentroid(x,y,width,height);
		this.innerX = this.centroid[0] - this.innerWidth/2;
		this.innerY = this.centroid[1] - this.innerHeight/2;
		this.checked = false;
		this.hover = false;
		this.idle = false;
		this.released = true;
		this.doFunction = doFunction;
	};
	
	var b = Button.prototype;
	
		b.draw = function(ctx){

			if(this.idle){
				this.innerWidth = this.width * .75;
				this.innerHeight = this.height * .75;
				this.innerX = this.centroid[0] - this.innerWidth/2;
				this.innerY = this.centroid[1] - this.innerHeight/2;
				ctx.save();
				//Outer
				ctx.fillStyle = this.outerColor;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				ctx.beginPath();
				ctx.arc(this.x,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.x + this.width,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				//Inner 
				ctx.fillStyle = this.innerColor;
				ctx.fillRect(this.innerX,this.innerY,this.innerWidth,this.innerHeight);
				ctx.beginPath();
				ctx.arc(this.innerX,this.innerY + this.innerHeight/2,this.innerHeight/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.innerX + this.innerWidth,this.innerY + this.innerHeight/2,this.innerHeight/2,0,2*Math.PI,false);
				ctx.fill();

				ctx.fillStyle = "black";
				ctx.font = "bold " + this.utils.makeFont(this.fontSize, "sans-serif");
				ctx.textAlign="center";
				ctx.textBaseline = "middle";
				ctx.fillText(this.string,this.x + this.width/2,this.y + this.height/2);
				ctx.restore();
			 }
			 else if(this.hover && !this.checked)
			 {
			 	this.innerWidth = this.width * .8;
				this.innerHeight = this.height * .8;
				this.innerX = this.centroid[0] - this.innerWidth/2;
				this.innerY = this.centroid[1] - this.innerHeight/2;
			 	ctx.save();
				//Outer
				ctx.fillStyle = this.outerColor;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				ctx.beginPath();
				ctx.arc(this.x,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.x + this.width,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				//Inner 
				ctx.fillStyle = this.innerColor;
				ctx.fillRect(this.innerX,this.innerY,this.innerWidth,this.innerHeight);
				ctx.beginPath();
				ctx.arc(this.innerX,this.innerY + this.innerHeight/2,this.innerHeight/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.innerX + this.innerWidth,this.innerY + this.innerHeight/2,this.innerHeight/2,0,2*Math.PI,false);
				ctx.fill();

				ctx.fillStyle = "black";
				ctx.font = "bold " + this.utils.makeFont(this.fontSize + 4, "sans-serif");
				ctx.textAlign="center";
				ctx.textBaseline = "middle";
				ctx.fillText(this.string,this.x + this.width/2,this.y + this.height/2);
				ctx.restore();
			 }
			 else
			 {
			 	this.innerWidth = this.width * .8;
				this.innerHeight = this.height * .8;
				this.innerX = this.centroid[0] - this.innerWidth/2;
				this.innerY = this.centroid[1] - this.innerHeight/2;
			 	ctx.save();
				//Outer
				ctx.fillStyle = this.innerColor;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				ctx.beginPath();
				ctx.arc(this.x,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.x + this.width,this.y + this.height/2,this.height/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.restore();
				
				ctx.fillStyle = "black";
				ctx.font = "bold " + this.utils.makeFont(this.fontSize, "sans-serif");
				ctx.textAlign="center";
				ctx.textBaseline = "middle";
				ctx.fillText(this.string,this.x + this.width/2,this.y + this.height/2);
				ctx.restore();
			 }
		};
		
		b.update = function(mouse){
			//Check if they are being clicked
			if(this.utils.mouseContains(this.x -this.height/2,this.y,this.height,this.width + this.height,mouse.x,mouse.y,0))
			{
				this.lastChecked;
				
				if(app.match.dragging)
				{
					console.log("clicked");
					this.checked = true;
					this.released = false;
					this.hover = false;
				}
				else
				{
					this.hover = true;
					this.released = true;
					this.checked = false;
				}
				
				if(this.released && !this.checked && this.lastChecked)
				{
					this.doFunction();
				}

				this.idle = false;
				
				this.lastChecked = this.checked;
			}
			else
			{
				this.hover = false;
				this.idle = true;
				this.checked = false;
			}
		};
	
	// the "prototype" of this module
	return Button;
}(); 
