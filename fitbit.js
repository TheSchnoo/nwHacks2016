var userID = "4CQ4C6";
var refreshToken = "e83a51588cad651691ee4942ec08e702266a012d0512de6e5cce4d6c4e50cd52";
var encodedDev = "MjI3R1Y0OjNjNmFjMGJjODkxOWU2ZjNhZDExMjI5YmM4YTk5MmMw";
var today = "2016-02-28";
var refreshURL = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=";
var accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY2NTYyNjcsInNjb3BlcyI6InJhY3QiLCJzdWIiOiI0Q1E0QzYiLCJhdWQiOiIyMjdHVjQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NTY2NTI2Njd9.Kg6THtmzr-_qxUzjw58UIx8lBxlHtQGD6o4tEYBInJI";

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
	var https = require("https"),
    data = {
	  	Team_1: {
		    Alvin: {
		    	steps: step,
		    	img: "/images/alvin.jpg",
		    	Token_info: {
	  				AccToken: accessToken,
	  				RefToken: refreshToken
	  			}
		    },
		    Bro: {
		    	steps: 1,
		    	img: "/images/bro.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Helen: {
		    	steps: 1,
		    	img: "/images/helen.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Paul: {
		    	steps: 1,
		    	img: "/images/paul.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Wes: {
		    	steps: 1,
		    	img: "/images/wes.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    }
		},
		Team_2: {
		    Charmander: {
		    	steps: 1,
		    	img: "/images/charmander.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    JigglyPuff: {
		    	steps: 1,
		    	img: "/images/jigglypuff.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Meowth: {
		    	steps: 1,
		    	img: "/images/meowth.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Pika: {
		    	steps: 1,
		    	img: "/images/pika.jpg",
		    	Token_info: {
	  				AccToken: 0,
	  				RefToken: 0
	  			}
		    },
		    Squirtle: {
		    	steps: 1,
		    	img: "/images/squirtle.jpg",
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
}

getStepInfo();

// TODO add refresh token to db
// TODO get refresh token from db
