function Player(playerID, playerIndex, teamColor, missileColor){
	var exports = {};
	
	// Fields ---------------------------------------------------------------------------->	
	exports.playerID = playerID; // Player's ID
	
	// Associated colors
	exports.teamColor = teamColor;
	exports.missileColor = missileColor;
	
	exports.playerIndex = playerIndex; // Index of array containing player's ships
	exports.mothershipIndex = 0; // Index of the player's mothership, set in a method
	
	exports.selectedIndex = 0; // Index of the ship that the player currently has selected
	exports.targetIndex = -1; // Index of ship that the player is currently targeting
	// Fields ---------------------------------------------------------------------------!>
	
	
	// Methods (private) ----------------------------------------------------------------->
	exports.forfeit = function(allSquadrons){
		if(allSquadrons[playerIndex][exports.mothershipIndex] == 0){ // Game ends if mothership dies
			console.log("gg");
		}
	};
	
	exports.selectShip = function(allSquadrons, i){ // Select a ship by index
		if(allSquadrons[playerIndex][i].player.playerID == exports.playerID){
			exports.selectedIndex = i;
		}
	};
	// Methods (private) ----------------------------------------------------------------!>
	
	return exports;
}