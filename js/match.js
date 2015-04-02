"use strict";


var app = app || {};

app.match = {
	// CONSTANT properties
    WIDTH : 640, 
    HEIGHT: 480,
	SLIDERPADDING: 20,

	//Module
	app: undefined,
	//Array of RGB values i,i+1,i+2 is R,G,B
	colorMatches : [],
	//Canvas and ctx ref
    canvas: undefined,
    ctx: undefined,
    //Helper scripts
	drawLib: undefined,
	utils: undefined,
	buttonControls : undefined, 
	dt: 1/60.0,
	//Holds Slider Values
	rgbValues : [],
	//Button arrays for various game states
	practiceButtons : [],
	menuButtons : [],
	//Alpha values used to draw practice mode background
	backgroundAlphas : [],
	//Slider Logic
	dragging : false,
	selectedSlider : undefined,
	//Correct Logic
	correct : false,
	correctCounter : 0,
	correctGuesses : 0,
	//color : undefined,
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
			this.practiceButtons[1] = new app.Button(this.ctx,50,this.HEIGHT - 70,"practice","Skip","green","#009900",100,50,30,function(){app.buttonControls.skipColor()});
			this.practiceButtons[2] = new app.Button(this.ctx,this.WIDTH - 150,this.HEIGHT - 70,"practice","Pause","#0000cc","blue",100,50,30,function(){app.buttonControls.pause()});
			
			//NEED FUNCTION TO POPULATE BUTTONS and CHANGE DO FUNCTIONS FOR OTHER BUTTONS
			this.menuButtons[0] = new app.Button(this.ctx,this.WIDTH * 1/2,this.HEIGHT * 1/3,"menu","Practice Mode","white","yellow",100,50,35,function(){app.buttonControls.practiceMode()});
			this.menuButtons[1] = new app.Button(this.ctx,this.WIDTH * 1/2,(this.HEIGHT * 1/3) + (this.HEIGHT * 1/4) ,"menu","Orbital Mode","white","yellow",100,50,35,function(){app.buttonControls.practiceMode()});
			this.menuButtons[2] = new app.Button(this.ctx,this.WIDTH * 1/2,(this.HEIGHT * 1/3) + (this.HEIGHT * 1/2),"menu","How To Play","white","yellow",100,50,35,function(){app.buttonControls.practiceMode()});

			this.canvas.onmousedown = this.doMouseDown;
			this.canvas.onmouseup = this.doMouseUp;
			this.canvas.onmousemove = this.doMouseMove;
			this.canvas.onmouseout = this.doMouseOut;
			
			//Set initial guess
			this.colorMatches = this.utils.setRandomColorAnswer();
			//Set initial alphas
			this.backgroundAlphas = this.utils.checkAnswer(this.colorMatches,this.rgbValues,0,this.difficulty).alphas;
			
			this.update();
	},
	
	//GAME LOOP
	update: function(){
		requestAnimationFrame(this.update.bind(this));
		
		//Main Menu
		if(this.gameState == 0)
		{
			this.drawLib.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);

			//Draw menu background
			this.drawLib.drawMenuBackground(this.ctx,this.WIDTH,this.HEIGHT);

			//NEED FUNCTION Check buttons
			for(var i=0; i < this.menuButtons.length;i++)
			{
				this.menuButtons[i].update(this.mousePos);
			}
		}
		else if(this.gameState == 1)
		{
			this.updatePractice();
			
			this.drawLib.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);

			this.drawLib.drawPracticeBackground(this.ctx,this.WIDTH,this.HEIGHT,this.backgroundAlphas);

			this.drawPractice();
		}

		this.drawGUI(this.ctx);
	},
		
	drawGUI: function(ctx){
	//GUI drawing here	

		if(this.gameState == 0)
		{
			for(var i=0;i < this.menuButtons.length;i++)
			{
				this.menuButtons[i].draw(ctx);
			}
		}
		else if(this.gameState == 1)
		{
			//CorrectGuesses
			//drawScore: function(ctx,x,y,score,fontsize)
			this.drawLib.drawScore(this.ctx,this.WIDTH * .76,this.HEIGHT * .1,this.correctGuesses,27);
			
			for(var i=0; i < this.practiceButtons.length;i++)
			{
				this.practiceButtons[i].draw(ctx);
			}
		}
	},
	
	updatePractice: function(){
		

		var correctAndAlphas = [];

		if(this.difficulty)
		{
			//If Hard checking the answer
			//ADJUST LEEWAY FOR HARD MODE
			correctAndAlphas = this.utils.checkAnswer(this.colorMatches,this.rgbValues,5,this.difficulty);
		}
		else
		{
			correctAndAlphas = this.utils.checkAnswer(this.colorMatches,this.rgbValues,10,this.difficulty);
		}

		//Set correct if not already correct, used for radius animation
		//of Practice GUESS Feedback color circle in drawLib 
		if(!this.correct)
		{
			this.correct = correctAndAlphas.correct;
		}

		this.backgroundAlphas = correctAndAlphas.alphas;
		
		if(this.correct && this.correctCounter == 300)
		{
			this.canvas.onmousemove = this.doMouseMove;
			this.canvas.onmousedown = this.doMouseDown;
			this.correct = false;
			this.correctCounter = 0;
			this.correctGuesses++;
			for(var i = 0; i < this.rgbValues.length; i++)
			{
				this.rgbValues[i] = 0;
			}
		}

		if(this.correct && this.correctCounter == 0)
		{
			this.colorMatches = this.utils.setRandomColorAnswer();
		}
		
		for(var i=0; i < this.practiceButtons.length;i++)
		{
			this.practiceButtons[i].update(this.mousePos);
		}
	
	},
	
	//Draw sprites for the practice mode
	drawPractice: function(){
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
		//If correct
		if(this.correct)
		{
			//Prevent input during correct animation
			this.canvas.onmousemove = null;
			this.canvas.onmousedown = null;
			this.drawLib.drawCorrectAnimation(this.ctx,this.correctCounter,this.WIDTH);	

			this.correctCounter++;
		}
		else
		{
			//If hard mode
			if(this.difficulty)
			{
				//Draw the two circles
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3,200,60,this.utils.makeColor(this.colorMatches[0],this.colorMatches[1],this.colorMatches[2]));
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3,200,60,this.utils.makeColor(parseInt(this.rgbValues[0]), parseInt(this.rgbValues[1]), parseInt(this.rgbValues[2])));
			}
			else
			{
				//Draw the two circles next to each other
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 1/3 + 75,200,60,this.utils.makeColor(this.colorMatches[0],this.colorMatches[1],this.colorMatches[2]));
				this.drawLib.feedbackColor(this.ctx,this.WIDTH * 2/3 - 75,200,60,this.utils.makeColor(parseInt(this.rgbValues[0]), parseInt(this.rgbValues[1]), parseInt(this.rgbValues[2])));
			}
		}
	},
	
	//All mouse functions
	doMouseDown: function(e){
		app.match.dragging = true;
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		for(var i = 1; i < 4; i++)
		{
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
		app.match.dragging = false;
		app.match.selectedSlider = undefined;
	},
	
	doMouseOut: function(e){
		app.match.dragging = false;
		app.selectedSlider = undefined;
	},
	
	getMouse: function(e){
		var mouse = {}
		var rect = app.match.canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		return mouse;
	},
}; // end app.match