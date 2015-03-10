// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";


var app = app || {};

app.match = {
	// CONSTANT properties
    WIDTH : 640, 
    HEIGHT: 480,

	colorMatches : [],
    canvas: undefined,
    ctx: undefined,
	drawLib: undefined,
	utils: undefined,
	dt: 1/60.0,
	app: undefined,
	rgbValues : [],
	sliders : [],
	
    // methods
	init : function() {
			console.log("app.match.init() called");
			// declare properties
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			this.rgbValues.red = "0"
			this.rgbValues.green = "0"
			this.rgbValues.blue = "0"

			this.update();
			
	},
	
	update: function(){
		requestAnimationFrame(this.update.bind(this));
		this.updateSprites();
		
		this.drawSprites();
	},
	
	updateSprites: function(){
	
	},
	
	drawSprites: function(){
		this.drawLib.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		
		//Sliders (ctx,x,y,col,currVal,maxX) forLoop needed
		this.drawLib.slider(this.ctx,50,300,"red",app.utils.mapValue(this.rgbValues.red,0,256,50,150),150);
		this.drawLib.slider(this.ctx,170,300,"green",app.utils.mapValue(this.rgbValues.green,0,256,170,270),150);
		this.drawLib.slider(this.ctx,280,300,"blue",app.utils.mapValue(this.rgbValues.blue,0,256,280,380),150);
	},
}; // end app.match