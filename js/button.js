// utils.js

"use strict";
var app = app || {};

app.Button = function(){

	//Ingame buttons 
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
		this.drawLib = app.drawLib;
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
				//drawGameButton: function(ctx,x,y,width,height,string,centroid,outerColor,innerColor,fontSize,sizeMultipler)
				this.drawLib.drawGameButton(ctx,this.x,this.y,this.width,this.height,this.string,this.centroid,this.outerColor,this.innerColor,this.fontSize,.75);
			 }
			 else if(this.hover && !this.checked)
			 {
				this.drawLib.drawGameButton(ctx,this.x,this.y,this.width,this.height,this.string,this.centroid,this.outerColor,this.innerColor,this.fontSize + 4,.8);
			 }
			 else
			 {
			 	this.drawLib.drawGameButton(ctx,this.x,this.y,this.width,this.height,this.string,this.centroid,this.outerColor,this.outerColor,this.fontSize,.75);
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
