
"use strict";
var app = app || {};

app.buttonControls = function(){

	function difficulty(dif)
	{
		app.match.difficulty = !dif;
		
		if(!dif)
		{
			for(var i = 0; i < app.match.buttons.length; i++)
			{
				if(app.match.buttons[i].id == "Easy")
				{
					app.match.buttons[i] = new app.Button(50,25,"Hard","Hard","#DB0000","red",100,50,30,function(){app.buttonControls.difficulty(app.match.difficulty)});
				}
			}
		}
		else
		{
			for(var i = 0; i < app.match.buttons.length; i++)
			{
				if(app.match.buttons[i].id == "Hard")
				{
					app.match.buttons[i] = new app.Button(50,25,"Easy","Easy","green","#029B26",100,50,30,function(){app.buttonControls.difficulty(app.match.difficulty)});
				}
			}
		}
		console.log(app.match.difficulty);
	}
	
	// the "public interface" of this module
	return{
		difficulty : difficulty
	};
}(); 