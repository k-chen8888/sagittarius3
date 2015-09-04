/* This file contains classes from which ships are built
 * 
 * Main ship type (BaseShip) contains features common to Squadron, Flagship, and Scout
 * Main fleet (BaseFleet) contains features common to combat ships (Squadron and Flagship)
 */

function BaseShip(xStart, yStart, HP, sightRange, ID){
	
	exports = {};
	
	
	
	// Fields ---------------------------------------------------------------------------->
	
	exports.xStart = (typeof xStart == 'undefined' ? 0: xStart);
	exports.yStart = (typeof yStart == 'undefined' ? 0: xStart);
	exports.index = 0;
	exports.ID = 0;
	
	exports.HP = (typeof HP == 'undefined' ? 0: HP);
	exports.sightRange = (typeof sightRange == 'undefined' ? 0: sightRange);
	
	// Fields ---------------------------------------------------------------------------!>
	
	
	
	// Methods --------------------------------------------------------------------------->
	
	// Methods --------------------------------------------------------------------------!>
	
	
	
	return exports;
	
}


/* Combat type ships */

function BaseFleet(xStart, yStart, sightRange, ID, HP, size, ATK, ATKRange, flySpeed){
	
	exports = new BaseShip(xStart, yStart, HP, sightRange, ID);
	
	
	
	// Fields ---------------------------------------------------------------------------->
	
	exports.xOffset = 0;
	exports.yOffset = 0;
	
	// When commands are read off the stack, check moveMode/attackMode variables to see if this object moves
	// Objects start stationary, moveMode and AttackMode start out false
	exports.moveMode = false;
	exports.attackMode = false;
	
	exports.size = (typeof size == 'undefined' ? 0: size);
	exports.ATK = (typeof ATK == 'undefined' ? 0: ATK);
	exports.ATKRange = (typeof ATKRange == 'undefined' ? 0: ATKRange);
	exports.flySpeed = (typeof flySpeed == 'undefined' ? 0: flySpeed);
	
	// Fields ---------------------------------------------------------------------------!>

	
	
	// Methods --------------------------------------------------------------------------->
	
	exports.drawShip = function(){
		xCenter = exports.xStart + exports.xOffset;
		yCenter = exports.yStart + exports.yOffset;
		
		canvas[0].ctx.beginPath();
		canvas[0].ctx.moveTo(xCenter + shipLayout[0][0], yCenter + shipLayout[0][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[1][0], yCenter + shipLayout[1][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[2][0], yCenter + shipLayout[2][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[3][0], yCenter + shipLayout[3][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[4][0], yCenter + shipLayout[4][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[5][0], yCenter + shipLayout[5][1]);
		canvas[0].ctx.lineTo(xCenter + shipLayout[0][0], yCenter + shipLayout[0][1]);
		canvas[0].ctx.fillStyle = players[ID].teamColor;
		canvas[0].ctx.fill();
		canvas[0].ctx.closePath();
	};
	
	exports.drawProjectile = function(target){		
		// Get angle between this squadron and the target
		var angle = theta(exports, target);
		
		// Get the oriented projectile
		var coordinates = triangulate( theta );
		
		
		// Draw the projectile
		canvas[0].ctx.beginPath();
		
		canvas[0].ctx.fill();
		canvas[0].ctx.closePath();
	};
	
	exports.realFoV = function(){
		// Recalculate FoV based on size of the squadron
		
		return ( exports.sightRange + ( 25 * ( size - 4000 ) / 1000 ) );
	};
	
	exports.realATKRange = function(){
		// Recalculate ATKRange based on size of the squadron
		
		return ( exports.ATKRange + ( 25 * ( size - 4000 ) / 1000 ) );
	};
	
	exports.attack = function(target){
		// Attack a target
		// Cannot move while attacking
		
		var targetDistance = distance(exports, target);
		
		// Only attack when the target is within firing range of this ship
		while( targetDistance < exports.realATKRange() ){
		
			// Perform a damage calculation
			var amount = exports.size * exports.ATK;
			
			
			// The real attack range is the "yellow zone." Damage dealt here is reduced.
			if(targetDistance > exports.ATKRange){
				target.takeDamage(amount * .75);
			}
			
			// Attacks deal normal damage when in the "red zone," the standard attack range.
			else {
				target.takeDamage(amount);
			}
			
		}
		
	};
	
	exports.move = function(xTarget, yTarget){
		// Move one step towards the target
		// Called only when exports.moveMode = True
		// Cannot attack while moving
		
		// Get angle to target location
		var theta = Math.atan( -(yObject1 - yObject2) / (xObject1 - xObject2) )
		
		// Change the offsets
		exports.xOffset += exports.flySpeed * Math.acos( theta );
		exports.yOffset += exports.flySpeed * Math.asin( theta );
		
	};
	
	exports.attackMove = function(xTarget, yTarget, target, counter){
		// Alternate between stepping back towards a target location and taking shots at a target
		
		
		// Move on even steps
		if( counter % 2 == 0 ){
			exports.move( xTarget, yTarget );
		}
		
		// Attack on odd steps
		else {
			exports.attack( target );
		}
	};
	
	// Methods --------------------------------------------------------------------------!>
	
	
	
	return exports;
	
}