
"use strict";
var app = app || {};

app.buttonControls = function(){

	function difficulty(dif)
	{
		app.match.difficulty = !dif;
		
		if(!dif)
		{
			for(var i = 0; i < app.match.practiceButtons.length; i++)
			{
				if(app.match.practiceButtons[i].string == "Easy")
				{
					app.match.practiceButtons[i] = new app.Button(50,25,"practice","Hard","#DB0000","red",100,50,30,function(){app.buttonControls.difficulty(app.match.difficulty)});
				}
			}
		}
		else
		{
			for(var i = 0; i < app.match.practiceButtons.length; i++)
			{
				if(app.match.practiceButtons[i].string == "Hard")
				{
					app.match.practiceButtons[i] = new app.Button(50,25,"practice","Easy","green","#029B26",100,50,30,function(){app.buttonControls.difficulty(app.match.difficulty)});
				}
			}
		}
		console.log(app.match.difficulty);
	}

	function practiceMode()
	{
		app.match.gameState = 1; 
	}
	
	// the "public interface" of this module
	return{
		difficulty : difficulty,
		practiceMode : practiceMode
	};
}(); 