function Player(playerID, playerIndex, teamColor, missileColor){
	var exports = {};
	
	
	// Fields ---------------------------------------------------------------------------->	
	exports.playerID = playerID; // Player's ID
	
	// Associated colors
	exports.teamColor = teamColor;
	exports.missileColor = missileColor;
	
	exports.flagship = new Squadron(50, 50, new Mothership(), exports.playerID); // Flagship
	exports.standardShips = new Array(); // All other ships, maximum of 20
	exports.selectedIndex = 0; // Ship that is currently selected
	// Fields ---------------------------------------------------------------------------!>
	
	
	// Methods (private) ----------------------------------------------------------------->
	exports.forfeit = function(){
		// Game ends if mothership dies
		
		if(exports.flagship == 0){
			console.log("gg");
		}
	};
	
	exports.selectShip = function(i){ // Select a ship by index
		if( i < exports.standardShips.length && i > -1){
			exports.selectedIndex = i;
		}
	};
	// Methods (private) ----------------------------------------------------------------!>
	
	
	return exports;
}