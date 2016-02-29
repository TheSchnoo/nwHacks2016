var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://glowing-heat-1885.firebaseio.com/");
var userID = "4CQ4C6";
var refreshToken = "93aa6e837ec39de03c318f28da93d9d4b36219aca447554049a2293568772ee6";
var encodedDev = "MjI3R1Y0OjNjNmFjMGJjODkxOWU2ZjNhZDExMjI5YmM4YTk5MmMw";
var today = "2016-02-28";
var refreshURL = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=";
var accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY3MDU4NzcsInNjb3BlcyI6InJhY3QiLCJzdWIiOiI0Q1E0QzYiLCJhdWQiOiIyMjdHVjQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NTY3MDIyNzd9.sxMIfmQkIpMVpA84aDADEySB9b7hYE5SGnUDrIdYbLE";

function start(){
	setInterval(getStepInfo, 25000);
}

function refreshAccessToken(refToken){

	var URL = refreshURL+refToken;
 	var request = require('request');
	request({
		url: URL,
		headers: {
			'Authorization': 'Basic ' + encodedDev,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	},
		function(error, response, body){
			if(error) {
	    		console.log(error);
			} else {
				var tokenJSON = JSON.parse(body);
				setAccessTokenFirebase(tokenJSON.access_token);
				setRefreshTokenFirebase(tokenJSON.refresh_token);
		  }
	   }
    );
}

function setAccessTokenFirebase(acc){
	accessToken = acc;
	return;
}

function setRefreshTokenFirebase(refresh){
	refreshToken = refresh;
	return;
}

function getStepInfo(){
	var URL = "https://api.fitbit.com/1/user/"+userID+"/activities/date/"+today+".json";
 	var request = require('request');
	request({
		url: URL,
		headers: {
			'Authorization': 'Bearer ' + accessToken

		},
		method: 'GET'
	},
		function(error, response, body, callback){
			if(error) {
	    		console.log(error);
			} else {
				var fitbitJSON = JSON.parse(body);
				var summaryFitbit = fitbitJSON.summary;
				stepsFitbit = summaryFitbit.steps;
				setToFirebase(stepsFitbit);
		  }
	   }
    )
}

function setToFirebase(steps){
	var step = steps;
	var Team1Ref = myFirebaseRef.child("Team_2");
	var alvinRef = Team1Ref.child("Charmander");
	alvinRef.update({
		"steps": step
	});
}

start();
