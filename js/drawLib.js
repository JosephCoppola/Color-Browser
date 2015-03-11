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
			ctx.stroke();
			ctx.fill();
			ctx.restore();
		}
	};