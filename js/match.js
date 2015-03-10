// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";


var app = app || {};

app.match = {
	// CONSTANT properties
    WIDTH : 640, 
    HEIGHT: 480,
	SLIDERPADDING: 20,

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
			this.rgbValues[0] = "0"
			this.rgbValues[1] = "0"
			this.rgbValues[2] = "0"

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
		
		for(var i = 1; i < 4; i++) {
			
			var sliderColor;
			
			switch(i)
			{
				case 1: 
					sliderColor = "red"; 
					break;
				case 2: 
					sliderColor = "green"; 
					break;
				case 3: 
					sliderColor = "blue"; 
					break;
				default: 
					break;
			}
			
			this.drawLib.slider(this.ctx,this.WIDTH * (1/3 * i) - 180,380,sliderColor,app.utils.mapValue(this.rgbValues[i - 1],0,256,this.WIDTH * (1/3 * i) - 180,this.WIDTH * (1/3 * i) - 80,0));
		}
		
		this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3,200,"blue");
		this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3,200,"blue");
	},
}; // end app.match