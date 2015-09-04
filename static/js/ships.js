/* Properties to apply to a squadron that will transform it into a different type of ship
 */


/* Standard ship
 * - Squadron with standard ship can have up to 10000 ships
 */
function Squadron(xStart, yStart, sightRange, ID, size){

	exports = new BaseFleet(
		xStart,
		yStart,
		75,										   // sightRange
		ID,										   // player ID
		100,									   // HP
		(typeof size == 'undefined' ? 5000: size), // size
		50,										   // ATK
		60,										   // ATKRange
		5 										   // flySpeed
	);
	
	
	
	// Fields ---------------------------------------------------------------------------->
	
	
	// Fields ---------------------------------------------------------------------------!>

	
	
	// Methods --------------------------------------------------------------------------->
	
	exports.splitOff = function(player, removeAmount, xTarget, yTarget){
		// Make a new squadron at target location
		
		// Fails if removeAmount is greater than or equal to the size of the current squadron
		if( removeAmount < exports.size ){
			player.standardShips.push(new Squadron(xStart + xOffset, yStart + yOffset, new Standard(), player);
		} else {
			console.log("Not enough ships to make specified squadron.");
		}
		
		// Move the new squadron to its target location
	};
	
	exports.merge = function(player, targetIndex){
		// Merge 2 target squadrons
		// The squadron at targetIndex is merged with the player's currently selected squadron
		
		// Fails if the squadrons are the same
		if( player.selectedIndex == targetIndex){
			console.log("Cannot merge a squadron with itself");
			
		// Fails if squadrons are more than 25px apart
		} else if( distance( player.standardShips[player.selectedIndex], player.standardShips[targetIndex] ) > 25 ){
			console.log("Too far to merge safely.");
		} else {
			// Move the squadron at targetIndex to the selected squadron
			
			
			// When they collide, merge them
			
		}
		
		// Squadron at targetIndex is deleted
	};
	
	exports.takeDamage = function(amount){
		// Determine how many ships have been destroyed (whole number, floor)
		var lostShips = Math.floor( amount / 500 );
		
		// Subtract losses
		exports.HP -= amount;
		exports.size -= lostShips;
	};
	
	// Methods --------------------------------------------------------------------------!>
	
	
	
	return exports;
	
}


/* Flagship
 * - Squadron with flagship can have up to 500 ships
 * - Squadron with flagship cannot be split
 * - Can deploy scouts
 */
function Flagship(xStart, yStart, ID){
	
	exports = new BaseFleet(
		xStart,
		yStart,
		50,										   // sightRange
		ID,										   // player ID
		500,									   // HP
		500,									   // size
		75,										   // ATK
		45,										   // ATKRange
		4 										   // flySpeed
	);
	
	
	
	// Fields ---------------------------------------------------------------------------->
	
	exports.shield = 10000;
	exports.numScouts = 10;
	
	exports.deployedScouts = new Array();
	exports.selectedScout = -1;
	
	// Fields ---------------------------------------------------------------------------!>
	
	
	
	// Methods --------------------------------------------------------------------------->
	
	exports.regenerateScout = setInterval(function(){
		
		// Every 10 seconds, get an extra scout
		if(exports.numScouts < 15){
			exports.numScouts += 1;
		}
		
		// If the value overshoots, reset to 15
		if(exports.numScouts > 15){
			exports.numScouts = 15;
		}
		
	}, 10000);
	
	exports.deployScout = function(xLocation, yLocation){
		
	};
	
	exports.regenerateShield = setInterval(function(){
	
		// Every 4 seconds, regenerate 100 HP to the shield
		if(exports.shield < 10000){
			exports.shield += 100;
		}
		
		// If the value overshoots, reset to 10000
		if(exports.shield > 10000){
			exports.shield = 10000;
		}
		
	}, 4000);
	
	exports.takeDamage = function(amount){
		var leftover = 0;
	
		// Drain shield
		if( amount > exports.shield ){
			leftover = amount - exports.shield;
			exports.shield = 0;
			
			// Deal further damage if shield cannot absorb it all
			
			// Determine how many ships have been destroyed (whole number, floor)
			var lostShips = Math.floor( leftover / 500 );
			
			// Subtract losses
			exports.HP -= amount;
			exports.size -= lostShips;
		} else {
			exports.shield -= amount;
		}
	};
	
	// Methods --------------------------------------------------------------------------!>
	


	return exports;
	
}


/* Scouts
 * - Deployed by motherships
 */
function Scout(xStart, yStart, xTarget, yTarget, ID){
	// A ship starts out at the same place as the flagship from which it spawned
	exports = new BaseShip(xStart, yStart, 5000, 100, ID);
	
	
	// Fields ---------------------------------------------------------------------------->
	exports.xTarget = xTarget;
	exports.yTarget = yTarget;
	exports.sightRadius = 150; // 150px sight radius
	
	exports.lifetime = 0;
	exports.power = 10000; // Base explosion damage
	exports.blastRadius = 50; // 50px blast radius
	
	// Fields ---------------------------------------------------------------------------!>

	
	
	// Methods --------------------------------------------------------------------------->
	exports.drawScout = function(){
		// Scouts are circles with radius 3px
	
		canvas[0].ctx.beginPath();
		canvas[0].ctx.arc(exports.xStart, exports.yStart, 3, 0, 2 * Math.PI)
		canvas[0].ctx.fillStyle = players[ID].teamColor;
		canvas[0].ctx.fill();
		canvas[0].ctx.closePath();
	}
	
	
	exports.setLocation = function(){
		// Move the scout to its target coordinates at a speed of 10px/s
		// Only call this the first time the scout is created
		
		exports.move = true;
	}
	
	exports.regenerateHP = SetInterval(function(){
	
		// Every 4 seconds, regenerate 100 HP
		if(exports.HP < 5000){
			exports.HP += 100;
		}
		
		// If the value overshoots, reset to 10000
		if(exports.HP > 5000){
			exports.HP = 5000;
		}
		
	});
	
	exports.age = setInterval(function(){
		
		// Every 3 seconds, a scout "ages" if it has not yet hit 110
		if( exports.lifetime < 110 ){
			exports.lifetime += 1;
		}
		
	}, 3000);
	
	exports.detonate = function(){
		// A scout may detonate, dealing damage to all surrounding squadrons (including allies)
		// - Each squadron takes the same amount of damage
		// A scout may only detonate if it has aged past 10
		// - A scout's maximum age is 110
		// The age of the scout determines how much damage it does
		
		if(exports.lifetime < 10){
			console.log("Too early to detonate.");
		}
		
		return damage = exports.power * exports.lifetime / 100;
		// Afterwards, use listeners to determine if damage is dealt
	};
	
	// Methods --------------------------------------------------------------------------!>
	
	
	
	return exports;
	
}