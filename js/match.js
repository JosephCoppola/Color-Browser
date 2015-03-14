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
	buttons : [],
	dragging : false,
	selectedSlider : undefined,
	correct : false,
	correctCounter : 0,
	color : undefined,

	
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
			
			this.buttons[0] = new app.Button(50,25,"Test","Hard","red",100,50,25);
			
			this.canvas.onmousedown = this.doMouseDown;
			this.canvas.onmouseup = this.doMouseUp;
			this.canvas.onmousemove = this.doMouseMove;
			this.canvas.onmouseout = this.doMouseOut;
			
			//Set initial guess
			this.colorMatches = this.utils.setRandomColorAnswer();
			
			this.update();
	},
	
	update: function(){
		requestAnimationFrame(this.update.bind(this));
		
		this.updateSprites();
		
		this.drawSprites();
		
		this.drawGUI(this.ctx);
	},
	
	drawGUI: function(ctx){
	//GUI drawing here
		for(var i=0; i < this.buttons.length;i++){
			this.buttons[i].draw(ctx);
		}
	},
	
	updateSprites: function(){
		
		//If correct
		this.correct = this.utils.checkAnswer(this.colorMatches,this.rgbValues,40);
		//console.log(this.correctCounter);
		if(this.correct && this.correctCounter == 300)
		{
			this.colorMatches = this.utils.setRandomColorAnswer();
			this.correct = false;
			this.correctCounter = 0;
		}
		
		for(var i=0; i < this.buttons.length;i++){
			this.buttons[i].update();
		}
	
	},
	
	drawSprites: function(){
		this.drawLib.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		
		//Draw sliders
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
			
			this.drawLib.slider(this.ctx,this.utils.findSliderXStart(i),380,sliderColor,app.utils.mapValue(this.rgbValues[i - 1],0,255,this.utils.findSliderXStart(i),this.utils.findSliderXEnd(i)));
		}
		
		//Draw color circles
		if(this.correct)
		{
			this.correctCounter++;
			
			
			if(this.correctCounter == 50 || this.correctCounter == 150 || this.correctCounter == 250)
			{
				this.color = "green";
			}
			else if(this.correctCounter == 0 || this.correctCounter == 100 || this.correctCounter == 200)
			{
				this.color = "black";
			}
			
			
			this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3,200,this.color);
			this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3,200,this.color);
			
		}
		else
		{
			this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3,200,this.utils.makeColor(this.colorMatches[0],this.colorMatches[1],this.colorMatches[2]));
			this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3,200,this.utils.makeColor(parseInt(this.rgbValues[0]), parseInt(this.rgbValues[1]), parseInt(this.rgbValues[2])));
		}
	},
	
	//All mouse functions
	doMouseDown: function(e){
		console.log(e.type);
		
		app.dragging = true;
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		//console.log(mouse.x);
		for(var i = 1; i < 4; i++)
		{
		//debugger;
			if(app.utils.mouseContains(app.utils.mapValue(app.match.rgbValues[i - 1],0,255,app.utils.findSliderXStart(i),app.utils.findSliderXEnd(i)),380,15,15,mouse.x,mouse.y))
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
		if(app.dragging)
		{
			if(app.match.selectedSlider == 1)
			{
				var mouse = app.match.getMouse(e);

				if(mouse.x > app.utils.findSliderXStart(1) && mouse.x < app.utils.findSliderXEnd(1))
				{
					app.match.rgbValues[0] = app.utils.mapValue(mouse.x,app.utils.findSliderXStart(1),app.utils.findSliderXEnd(1),0,255);
				}
				//else if(mouse.x < app.utils.findSliderXStart(1))
				//{
				//	app.match.rgbValues[0] = 0;
				//}
			}
			else if(app.match.selectedSlider == 2)
			{
				var mouse = app.match.getMouse(e);

				if(mouse.x > app.utils.findSliderXStart(2) && mouse.x < app.utils.findSliderXEnd(2))
				{
					app.match.rgbValues[1] = app.utils.mapValue(mouse.x,app.utils.findSliderXStart(2),app.utils.findSliderXEnd(2),0,255);
				}
			}
			else if(app.match.selectedSlider == 3)
			{
				var mouse = app.match.getMouse(e);

				//debugger;
				if(mouse.x > app.utils.findSliderXStart(3) && mouse.x < app.utils.findSliderXEnd(3))
				{
					app.match.rgbValues[2] = app.utils.mapValue(mouse.x,app.utils.findSliderXStart(3),app.utils.findSliderXEnd(3),0,255);
					console.log(app.match.rgbValues[2]);
				}
			}
		}
	},

	doMouseUp: function(e){
		//console.log("UP");
		app.dragging = false;
		app.selectedSlider = undefined;
	},
	
	doMouseOut: function(e){
		console.log("Out");
		app.dragging = false;
		app.selectedSlider = undefined;
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