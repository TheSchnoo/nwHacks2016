var userID = "4CQ4C6";
var refreshToken = "e83a51588cad651691ee4942ec08e702266a012d0512de6e5cce4d6c4e50cd52";
var encodedDev = "MjI3R1Y0OjNjNmFjMGJjODkxOWU2ZjNhZDExMjI5YmM4YTk5MmMw";
var refreshURL = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=";
var accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY2NDk2OTYsInNjb3BlcyI6InJhY3QiLCJzdWIiOiI0Q1E0QzYiLCJhdWQiOiIyMjdHVjQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NTY2NDYwOTZ9.g5SELK98fO7iAMfbeqBDR-CZqLchrqTadiSgs2IYbKA";

function refreshAccessToken(){

	var URL = refreshURL+refreshToken;
 	var request = require('request');
	request({
		url: URL,
		headers: {
			'Authorization': 'Basic ' + encodedDev,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	}, //the callback function when something is successfully stored in elasticsearch
		function(error, response, body){
			if(error) {
	    		console.log(error);
			} else {
				var tokenJSON = JSON.parse(body);
				accessToken = tokenJSON.access_token;
				refreshToken = tokenJSON.refresh_token;
	    		console.log(refreshToken);
		  }
	   }
    );
}

function getStepInfo(accessTok){
	var stepsFitbit = 0;
	var URL = "https://api.fitbit.com/1/user/"+userID+"/activities/date/2016-02-27.json";
 	var request = require('request');
	request({
		url: URL,
		headers: {
			'Authorization': 'Bearer ' + accessToken

		},
		method: 'GET'
	}, //the callback function when something is successfully stored in elasticsearch
		function(error, response, body){
			if(error) {
	    		console.log(error);
			} else {
				var fitbitJSON = JSON.parse(body);
				var summaryFitbit = fitbitJSON.summary;
				stepsFitbit = summaryFitbit.steps;
		  }
	   }
    );
    return stepsFitbit;
}

// getStepInfo();
function setToFirebase(){
	var step = getStepInfo();
	// var promise = new Promise(function(resolve, reject){
	// 	steps = getStepInfo();
	// });
	// promise.then(function(result){
		// console.log(result);
		var https = require("https"),
	    data = {
		  	Team_1: {
			    Alvin: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Bro: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Helen: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Paul: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Wes: {
			    	steps: step,
			    	Token_info: {
		  				AccToken: accessToken,
		  				RefToken: refreshToken
		  			}
			    }
			},
			Team_2: {
			    Charmander: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    JigglyPuff: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Meowth: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Pika: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    },
			    Squirtle: {
			    	steps: 1,
			    	Token_info: {
		  				AccToken: 0,
		  				RefToken: 0
		  			}
			    }
			}
		};

		var req = https.request({ 
		    hostname: "glowing-heat-1885.firebaseio.com", 
		    method: "PUT", 
		    path: "/.json"
		});
		req.end(JSON.stringify(data));

	console.log("wes");
	// }, function(err){
	// 	console.log(err);
	// });
}

setToFirebase();


// TODO add refresh token to db
// TODO get refresh token from db
