/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};


app.KEYBOARD = {

};

app.keydown = {};

app.IMAGES = {
	
};

window.onload = function(){
	console.log("window.onload called");
	app.match.app = app;
	app.match.drawLib = app.drawLib;
	app.match.utils = app.utils;
	
	app.match.init();
}