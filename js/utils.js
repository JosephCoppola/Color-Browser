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
	
	//Find the sliders far left x position using a parameter to represent which slider it is
	function findSliderXStart(i){
		return app.match.WIDTH * (1/3 * i) - 180;
	}
	
	 function findSliderXEnd(i){
		return app.match.WIDTH * (1/3 * i) - 40;
	}
	
	function mouseContains(x,y,height,width,mouseX,mouseY,leeway){
		
		//console.log("x:" + x + " y:" + y + " MX:" + mouseX + " MY:" + mouseY);
		
		if(mouseX < x + width + leeway && mouseX > x - leeway && mouseY < y + height + leeway && mouseY > y - leeway)
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
	  
	  console.log(redAnswer + " "+ greenAnswer + " " + blueAnswer);
	  
	  return color;
	}
	
	function checkAnswer(colorMatches,rgbValues,leeway)
	{
		var redC,greenC,blueC;
		if(rgbValues[0] <= colorMatches[0] + leeway && rgbValues[0] >= colorMatches[0] - leeway)
		{
			redC = true;
		}
		if(rgbValues[1] <= colorMatches[1] + leeway && rgbValues[1] >= colorMatches[1] - leeway)
		{
			greenC = true;
		}
		if(rgbValues[2] <= colorMatches[2] + leeway && rgbValues[2] >= colorMatches[2] - leeway)
		{
			blueC = true;
		}
		
		if(redC && greenC && blueC)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function makeFont(size,type)
	{
		return (size + "px " + type);
	}

	function getCentroid(x,y,width,height)
	{
		var centroid = [];

		centroid[0] =  x + width/2;
		centroid[1] = y + height/2;

		return centroid; 
	}
	
	// the "public interface" of this module
	return{
		clamp : clamp,
		getRandom : getRandom,
		getRandomInt : getRandomInt,
		mapValue : mapValue,
		mouseContains : mouseContains,
		makeColor : makeColor,
		setRandomColorAnswer: setRandomColorAnswer,
		findSliderXStart : findSliderXStart,
		findSliderXEnd : findSliderXEnd,
		checkAnswer : checkAnswer,
		makeFont : makeFont,
		getCentroid : getCentroid
	};
}(); 
