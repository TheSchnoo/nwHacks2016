var userID = "4CQ4C6";
var refreshToken = "b97ad2b9df5ef557fcda6bdf03b32f8fc91c3737bc64dbee0d64deb33c3a5fd2";
var encodedDev = "MjI3R1Y0OjNjNmFjMGJjODkxOWU2ZjNhZDExMjI5YmM4YTk5MmMw";
var refreshURL = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=";
var accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY2NDEyNjcsInNjb3BlcyI6InJhY3QiLCJzdWIiOiI0Q1E0QzYiLCJhdWQiOiIyMjdHVjQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NTY2Mzc2Njd9.0OxCo49L_Rq1EwmwuMcOwhB2UZUZtdaKAlO3vKUN-cE";

// function getAuthToken(){
// }

getStepInfo();

function getStepInfo(){
	var URL = "https://api.fitbit.com/1/user/"+userID+"/activities/date/2016-02-27.json";
	console.log("Alvin");
 	var request = require('request');
	request({
		url: URL, 
		method: 'GET',
	}, //the callback function when something is successfully stored in elasticsearch
		function(error, response, body){
			if(error) {
	    		console.log(error);
			} else {
	    		console.log("success");
		  }
	   }
    );

}