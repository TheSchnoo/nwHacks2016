var mockMode = true;
var app = angular.module('Brewmaster', ['ngMaterial']);

app.controller('AppCtrl', function($scope) {
	if (mockMode) {
		$scope.teamOne =
			{
			 	"teamName": "Java",
			 	"members": [
				 	{
				 		"name": "NullPointerException",
				 		"steps": 5004
				 	},
			 		{
			 			"name": "Syntax Error",
			 			"steps": 6001
			 		},
			 		{
			 			"name": "ArrayOutOfBounds",
			 			"steps": 1005
			 		},
			 		{
			 			"name": "Placeholder",
			 			"steps" : 11532
			 		},
			 		{
			 			"name": "Lazy Placeholder",
			 			"steps": 421
			 		}
			 	],
			 	"teamTotal": 24062
			}
		$scope.teamTwo = 
			{
			 	"teamName": "C++",
			 	"members": [
			 		{
			 			"name": "Does not compile",
			 			"steps": 9001
			 		},
			 		{
			 			"name": "Segmentation fault",
			 			"steps": 1432
			 		},
			 		{
			 			"name": "Memory leak",
			 			"steps": 5281
			 		},
			 		{
			 			"name": "Malloc",
			 			"steps": 5219
			 		},
			 		{
			 			"name": "Placeholder",
			 			"steps": 3152
			 		}
			 	],
			 	"teamTotal": 24085
			}
	  	} else {










	  		
	var myDataRef = new Firebase('https://glowing-heat-1885.firebaseio.com/');
      var teamJson;
      var teamTotal;
      myDataRef.on('value', function(snapshot) {
        var teamNumber = 1;
        var team1;
        var team2;
        snapshot.forEach(function (data) {
          teamJson = '{';
          teamJson += '"teamName" : "' + data.key() + '" ,'
                  + '"members": [';
          teamTotal = 0;
          getTeamInfo(data.key());	// data.key() here is the team name
          teamJosn += '],'
                  + '"teamTotal": "' + teamTotal + '" ,'
                  + '}';
          if (teamNumber == 1) {
            team1 = teamJson;
          } else {
            team2 = teamJson;
          }
            teamTotal = 0;
        });
        if (whichTeam == 1) {
          console.log(team1);
          return team1;
        } else if (whichTeam == 2) {
          return team2;
        }
        ;
      });

      function getTeamInfo(team){
      	myDataRef.child(team).on('value', function(snapshot) {
	        snapshot.forEach(function(data) {
              teamTotal+= data.child('steps').val();
              teamJson += '"name" : "' + data.key() + '" ,'
                      + '"steps" : "' + data.child('steps').val() + '" ,';
              displayChatMessage(data.key(), data.child('steps').val());		// data.key() here is the member name and 													 data.val() is the number of steps

	      	  	});
      	});
      };
      function displayChatMessage(name, value) {
      	debugger;
        $('<div/>').text(value).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
      function createJSON() {
        var teamTotal = 0;
        var teams = '{';
        //iterate through teams doing the following with each iteration
        teams += '"teamName" : "' + teamName + '" ,'
                + '"members": [';
        teamSteps = 0;
        //iterate through team members doing the following with each iteration
        teams += +'"name" : "' + name + '" ,'
                + '"steps" : "' + steps + '" ,';
        teamTotal += steps;
        teams += '],'
                + '"teamTotal": "' + teamTotal + '" ,'
                + '}';
        var jsonObject = JSON.parse(teams);
      }  		
	  	}

});