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
	practiceButtons : [],
	menuButtons : [],
	dragging : false,
	selectedSlider : undefined,
	correct : false,
	correctCounter : 0,
	color : undefined,
	buttonControls : undefined, 
	mousePos : [],
	//Difficulty true: hard false: easy
	difficulty : true,
	//0 Menu, 1 Practice Matching, 2 Orbital Matching
	gameState : undefined,

	
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
			
			this.gameState = 0;
			
			this.practiceButtons[0] = new app.Button(this.ctx,50,25,"practice","Hard","#DB0000","red",100,50,30,function(){app.buttonControls.difficulty(app.match.difficulty)});

			//NEED FUNCTION TO POPULATE BUTTONS and CHANGE DO FUNCTIONS FOR OTHER BUTTONS
			this.menuButtons[0] = new app.Button(this.ctx,this.WIDTH * 1/2,this.HEIGHT * 1/4,"menu","Practice Mode","black","yellow",100,50,35,function(){app.buttonControls.practiceMode()});

			this.menuButtons[1] = new app.Button(this.ctx,this.WIDTH * 1/2,this.HEIGHT * 1/2,"menu","Orbital Mode","black","yellow",100,50,35,function(){app.buttonControls.practiceMode()});
			
			this.menuButtons[2] = new app.Button(this.ctx,this.WIDTH * 1/2,this.HEIGHT * 3/4,"menu","How To Play","black","yellow",100,50,35,function(){app.buttonControls.practiceMode()});

			this.canvas.onmousedown = this.doMouseDown;
			this.canvas.onmouseup = this.doMouseUp;
			this.canvas.onmousemove = this.doMouseMove;
			this.canvas.onmouseout = this.doMouseOut;
			
			//Set initial guess
			this.colorMatches = this.utils.setRandomColorAnswer();
			
			this.update();
	},
	
	//GAME LOOP
	update: function(){
		requestAnimationFrame(this.update.bind(this));
		
		if(this.gameState == 0)
		{
			//NEED FUNCTION
			for(var i=0; i < this.menuButtons.length;i++)
			{
				this.menuButtons[i].update(this.mousePos);
			}

			this.drawMainMenu(this.ctx);
		}
		else if(this.gameState == 1)
		{
			this.updateSprites();
		
			this.drawSprites();
		
			this.drawGUI(this.ctx);
		}
	},
	
	drawMainMenu: function(ctx){
		for(var i=0;i < this.menuButtons.length;i++)
		{
			this.menuButtons[i].draw(ctx);
		}
	},
	
	drawGUI: function(ctx){
	//GUI drawing here	
		for(var i=0; i < this.practiceButtons.length;i++)
		{
			this.practiceButtons[i].draw(ctx);
		}
	},
	
	updateSprites: function(){
		
		//If Hard checking the answer
		if(this.difficult)
		{
			this.correct = this.utils.checkAnswer(this.colorMatches,this.rgbValues,40);
		}
		else
		{
			this.correct = this.utils.checkAnswer(this.colorMatches,this.rgbValues,5);
		}
		
		if(this.correct && this.correctCounter == 300)
		{
			this.colorMatches = this.utils.setRandomColorAnswer();
			this.correct = false;
			this.correctCounter = 0;
		}
		
		for(var i=0; i < this.practiceButtons.length;i++)
		{
			this.practiceButtons[i].update(this.mousePos);
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
			//If hard mode
			if(this.difficulty)
			{
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3,200,this.utils.makeColor(this.colorMatches[0],this.colorMatches[1],this.colorMatches[2]));
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3,200,this.utils.makeColor(parseInt(this.rgbValues[0]), parseInt(this.rgbValues[1]), parseInt(this.rgbValues[2])));
			}
			else
			{
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3 + 75,200,this.utils.makeColor(this.colorMatches[0],this.colorMatches[1],this.colorMatches[2]));
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3 - 75,200,this.utils.makeColor(parseInt(this.rgbValues[0]), parseInt(this.rgbValues[1]), parseInt(this.rgbValues[2])));
			}
		}
	},
	
	//All mouse functions
	doMouseDown: function(e){
		console.log(e.type);
		
		app.match.dragging = true;
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		//console.log(mouse.x);
		for(var i = 1; i < 4; i++)
		{
		//debugger;
			if(app.utils.mouseContains(app.utils.mapValue(app.match.rgbValues[i - 1],0,255,app.utils.findSliderXStart(i),app.utils.findSliderXEnd(i)),380,15,15,mouse.x,mouse.y,5))
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

		var mouse = app.match.getMouse(e);

		if(app.match.dragging)
		{
			if(app.match.selectedSlider == 1)
			{
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

				if(mouse.x > app.utils.findSliderXStart(2) && mouse.x < app.utils.findSliderXEnd(2))
				{
					app.match.rgbValues[1] = app.utils.mapValue(mouse.x,app.utils.findSliderXStart(2),app.utils.findSliderXEnd(2),0,255);
				}
			}
			else if(app.match.selectedSlider == 3)
			{

				//debugger;
				if(mouse.x > app.utils.findSliderXStart(3) && mouse.x < app.utils.findSliderXEnd(3))
				{
					app.match.rgbValues[2] = app.utils.mapValue(mouse.x,app.utils.findSliderXStart(3),app.utils.findSliderXEnd(3),0,255);
					console.log(app.match.rgbValues[2]);
				}
			}
		}

		app.match.mousePos = mouse;

	},

	doMouseUp: function(e){
		//console.log("UP");
		app.match.dragging = false;
		app.match.selectedSlider = undefined;
	},
	
	doMouseOut: function(e){
		console.log("Out");
		app.match.dragging = false;
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