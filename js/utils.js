// utils.js

"use strict";
var app = app || {};

app.utils = function(){

	var dragging = false;

	/*
	Function Name: clamp(val, min, max)
	Return Value: returns a value that is constrained between min and max (inclusive) 
	*/
	function clamp(val, min, max){
	//debugger;
	console.log(val + " " + max);
		return Math.max(min, Math.min(max, val));
	}
	
	/*
		Function Name: getRandom(min, max)
		Return Value: a floating point random number between min and max
	*/
	function getRandom(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	//Sends in a current value with its current range and map it within a new range
	function mapValue(value,fromLow,fromHigh,toLow,toHigh){
		//console.log("V:" + value + " Low:" + fromLow + " High:" + fromHigh + " toLow:" + toLow + " toHigh:" + toHigh);
		//console.log((value-fromLow) * (toHigh - toLow)/(fromHigh - fromLow) + toLow);
		return(value-fromLow) * (toHigh - toLow)/(fromHigh - fromLow) + toLow;
	}
	
	function makeColor(red, green, blue){
   			var color='rgb('+red+','+green+','+blue+')';
			//console.log(color);
   			return color;
	}
	
	function mouseContains(x,y,height,width,mouseX,mouseY){
		
		//console.log("x:" + x + " y:" + y + " MX:" + mouseX + " MY:" + mouseY);
		
		if(mouseX < x + width + 5 && mouseX > x - 5 && mouseY < y + height + 5 && mouseY > y - 5)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/*
		Function Name: getRandomInt(min, max)
		Return Value: a random integer between min and max
	*/
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	//Sets a random guess color that also prevents white color to be a guess color
	function setRandomColorAnswer()
	{
	  var redAnswer = this.getRandomInt(-50,255);
	  var greenAnswer = this.getRandomInt(-50,255);
	  var blueAnswer =  this.getRandomInt(-50,255);
	  
	  var possibleWhite = 0;
	  
	  if(redAnswer < 0)
	  {
		redAnswer = 0;
	  }
	  else if(redAnswer > 100)
	  {
		possibleWhite++;
	  }
	  if(greenAnswer < 0)
	  {
		greenAnswer = 0;
	  }
	  else if(greenAnswer > 100)
	  {
		possibleWhite++;
	  }
	  if(blueAnswer < 0)
	  {
		blueAnswer = 0;
	  }
	  else if(blueAnswer > 100)
	  {
		possibleWhite++;
	  }

	  if(possibleWhite == 3)
	  {
		var randomColorToZero = Math.random(0,2);
		
		switch(randomColorToZero)
		{
		  case 0: redAnswer = 0; break;
		  case 1: greenAnswer = 0; break;
		  case 2: blueAnswer = 0; break;
		  default: break;
		}
	  }
	  
	  var color = [redAnswer,greenAnswer,blueAnswer];
	  
	  //console.log(redAnswer + " "+ greenAnswer + "" + blueAnswer);
	  
	  return color;
}
	
	// the "public interface" of this module
	return{
		clamp : clamp,
		getRandom : getRandom,
		getRandomInt : getRandomInt,
		mapValue : mapValue,
		mouseContains : mouseContains,
		makeColor : makeColor,
		setRandomColorAnswer: setRandomColorAnswer
	};
}(); 
