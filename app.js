
var app = angular.module("Brewmaster", ["ngMaterial", "firebase"]);

app.controller('AppCtrl', function($scope, $firebaseObject) {

	var myDataRef = new Firebase('https://glowing-heat-1885.firebaseio.com/');
	var obj = $firebaseObject(myDataRef);
	var teamJson;
	var teamTotal = 0;
	var members = [];
	var teamOne = {};
	// console.log("team one: " + teamOne);
	// console.log($scope.teamOne);
	// $scope.teamTwo = {};

	setScopeTeams();
	// console.log($scope.teamOne);

	// function activate() {
	// 	setScopeTeams();
	// }

	function setScopeTeams(){

		obj.$loaded().then(function(){
			// console.log(obj);
			var teamOne = obj.Team_1;
			teamJson = {};
			teamJson.teamName = "Team 1";
			getAllMembers(teamOne);
			teamJson.members = members;
			members = [];
			teamJson.teamTotal = teamTotal;
			teamTotal = 0;
			$scope.teamOne = teamJson;

			var teamTwo = obj.Team_2;
			teamJson = {};
			teamJson.teamName = "Team 2";
			getAllMembers(teamTwo);
			teamJson.members = members;
			members = [];
			teamJson.teamTotal = teamTotal;
			$scope.teamTwo = teamJson;

		  	
		});




			// $scope.teamOne = result;
			// on('value', function(snapshot) {
			// console.log(snapshot);
			// var teamNumber = 1;
			// var team1;
			// var team2;
			// snapshot.forEach(function(data) {

		 //  		var team;
	  // 			team = "Team 1";
	  // 			teamJson = {};
		 //  		teamJson.teamName = team;
		 //  		// console.log(teamJson.teamName);
		
		 //  		getAllMembers(data.key())
		 //  			.then(function(result) {
	  // 				console.log('result is:', result);
		 //  		});

		 //  		teamJson.teamTotal = teamTotal;
		 //  		teamTotal = 0;
		 //  		teamJson.members = members;
		 //  		members = [];
		 //  		// console.log(teamJson);
		 //  		$scope.teamOne = teamJson;
		 //  		return (teamJson);
			  	
			//  });
		}




	  		// } else {
	  		// 	team = "Team 2";
	  		// 	teamJson = {};
		  	// 	teamJson.teamName = team;
		  	// 	getAllMembers(data.key());
		  	// 	teamJson.teamTotal = teamTotal;
		  	// 	teamJson.members = members;
		  	// 	members = [];
		  	// 	// console.log(teamJson);
		  	// 	$scope.teamTwo = teamJson;
		  	// 	console.log($scope.teamTwo);
	  		// }

	    //   });



	function getAllMembers(team){
		// myDataRef.child(team).on('value', function() {
			for (key in team) {
				teamTotal+= team[key]['steps'];
				var member = {};
				member.name = key;
				member.steps = team[key]['steps'];
				member.img = team[key]['img']
				members.push(member);

				
			}

      }
	  	

});