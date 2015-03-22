// ship.js
// Dependencies: 
// Description: singleton object that is a module of app
// properties of the ship and what it needs to know how to do go here

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// the 'ship' object literal is now a property of our 'app' global variable
app.drawLib = {
		clear : function(ctx,x,y,w,h){
			ctx.clearRect(x,y,w,h);
		},
	 
		rect: function(ctx,x,y,w,h,col){
			ctx.save();
			ctx.fillStyle = col;
			ctx.fillRect(x,y,w,h);
			ctx.restore();
		},
		
		//Slider that will be made in canvas using initial x and y
		//with a set width of 100. Then depending on the current value the slider
		//will draw the rect where necessary
		slider: function(ctx,x,y,col,currVal){
			ctx.save();
			ctx.strokeStyle = "black";
			ctx.lineWidth = 8;
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+150,y);
			ctx.stroke();
			ctx.restore();
			this.rect(ctx,currVal,y - 7.5,15,15,col);
		},
		
		//Elements that will be drawn to the screen
		feedbackColor: function(ctx,x,y,col){
			ctx.save();
			ctx.fillStyle = col;
			ctx.beginPath();
			ctx.arc(x,y,60,0,2*Math.PI,false);
			ctx.fill();
			ctx.restore();
		},
		
		//Ingame Buttons
		drawGameButton: function(ctx,x,y,width,height,string,centroid,outerColor,innerColor,fontSize,sizeMultipler){
			var innerWidth = width * sizeMultipler;
			var innerHeight = height * sizeMultipler;
			var innerX = centroid[0] - innerWidth/2;
			var innerY = centroid[1] - innerHeight/2;
			ctx.save();
			//Outer
			ctx.fillStyle = outerColor;
			ctx.fillRect(x,y,width,height);
			ctx.beginPath();
			ctx.arc(x,y + height/2,height/2,0,2*Math.PI,false);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(x + width,y + height/2,height/2,0,2*Math.PI,false);
			ctx.fill();
			//Inner 
			ctx.fillStyle = innerColor;
			ctx.fillRect(innerX,innerY,innerWidth,innerHeight);
			ctx.beginPath();
			ctx.arc(innerX,innerY + innerHeight/2,innerHeight/2,0,2*Math.PI,false);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(innerX + innerWidth,innerY + innerHeight/2,innerHeight/2,0,2*Math.PI,false);
			ctx.fill();

			ctx.fillStyle = "black";
			//Global utils
			ctx.font = "bold " + app.utils.makeFont(fontSize, "sans-serif");
			ctx.textAlign="center";
			ctx.textBaseline = "middle";
			ctx.fillText(string,x + width/2,y + height/2);
			ctx.restore();
		}
	};