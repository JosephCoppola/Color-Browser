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
	dragging : false,
	selectedSlider : undefined,
	
    // methods
	init : function() {
			console.log("app.match.init() called");
			// declare properties
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			this.rgbValues[0] = "0";
			this.rgbValues[1] = "0";
			this.rgbValues[2] = "0";
			
			this.canvas.onmousedown = this.doMousedown;
			this.canvas.onmouseup = this.doMouseUp;
			this.canvas.onmousemove = this.doMouseMove;
			
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
	
	doMousedown: function(e){
		console.log(e.type);
		
		app.dragging = true;
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		for(var i = 1; i < 4; i++)
		{
		//debugger;
			if(app.utils.mouseContains(app.utils.mapValue(app.match.rgbValues[i - 1],0,256,app.match.WIDTH * (1/3 * i) - 180,app.match.WIDTH * (1/3 * i) - 80),380,15,15,mouse.x,mouse.y))
			{
				if(i==1)
				{
					console.log("1");
					app.match.selectedSlider = 1;
				}
				else if(i==2)
				{
					console.log("2");
					app.match.selectedSlider = 2;
				}
				else
				{
					console.log("3");
					app.match.selectedSlider = 3;
				}
			}
		}
	},	
	
	doMouseMove: function(e){
		//console.log("Moving");
		if(app.dragging)
		{
			console.log("Dragging");
			if(app.match.selectedSlider == 3)
			{
				var mouse = app.match.getMouse(e);

				//debugger;
				if(mouse.x > app.match.WIDTH * (1/3 * 3) - 180 && mouse.x < app.match.WIDTH * (1/3 * 3) - 40)
				{
					app.match.rgbValues[2] = app.utils.mapValue(mouse.x,app.match.WIDTH * (1/3 * 3) - 180,app.match.WIDTH * (1/3 * 3) - 80,0,256);
				}
				//app.utils.clamp(app.utils.mapValue(app.match.rgbValues[2],0,256,app.match.WIDTH * (1/3 * 3) - 180,app.match.WIDTH * (1/3 * 3) - 80),app.match.WIDTH * (1/3 * 3) - 180,app.match.WIDTH * (1/3 * 3) - 80);
			}
		}
	},

	getMouse: function(e){
		var mouse = {}
		var rect = app.match.canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		//debugger;
		return mouse;
	},
}; // end app.match