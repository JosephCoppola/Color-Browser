"use strict";
var app = app || {};

app.Level = function(){

	//Ingame buttons 
	function Level(level,colors,time)
	{
		this.level = level;
		this.colors = colors;
		this.time = time;
		this.completed = false;
		this.remainingTime = this.time;
	};
	
	var l = Level.prototype;
	
		l.update = function(elapsedTime,guesses)
		{
			this.remainingTime = this.time - elapsedTime;
			
			if(this.colors.length == 0)
			{
				this.completed = true;
			}
		};
	
	// the "prototype" of this module
	return Level;
}(); 