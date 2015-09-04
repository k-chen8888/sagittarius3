function Scout(xCenter, yCenter, source){
	var exports = {};
	
	// Fields ---------------------------------------------------------------------------->	
	exports.sightRange = 75; // Visible area
	exports.size = 3;
	
	exports.scoutHP = 250; // Integer , total possible HP, private
	exports.damageTaken = 0; // Integer, total damage sustained, private
	// Fields ---------------------------------------------------------------------------!>
	
	
	// Methods (private) ----------------------------------------------------------------->
	exports.xCenter = function(){
		return xCenter;
	}
	
	exports.yCenter = function(){
		return yCenter;
	}
	
	exports.drawScout = function(){
		scoutSprite(exports.xCenter, exports.yCenter, exports.size, source.color);
	}
	
	exports.drawScoutFoV = function(){
		FoV(exports.xCenter, exports.yCenter, exports.sightRange);
	}
	
	exports.eraseScout = function(){ // Take the squadron off the map; takes it out of array
		source.scouts.splice(scoutsInPlay.indexOf(exports), 1);
	};
	
	exports.takeDamage = function(source){ // Take battle damage from enemy ship
		exports.damageTaken += shipAtk * source.numShips;
		
		if(exports.damageTaken >= exports.scoutHP){
			exports.eraseScout();
		}
	};
	
	exports.collisionTest = function(target){ // Check if this scout will collide with another squadron (call only on moving squadrons)
		var xDistance = target.xCenter - exports.xCenter; // Scouts are stationary, so only need so check squadron collision
		var yDistance = exports.yCenter - target.yCenter;

		var quadrant = true;
		var xy = true;
		
		switch(quadrant){
			case xDistance == 0 && yDistance != 0:
				switch(xy){
					case yDistance > 0:
						if(yDistance <= 12){ // Distances are doubled because 2 halves of hitboxes are interacting
							return true;
						} else { return false; }
						
					case yDistance < 0:
						if(yDistance >= -12){
							return true;
						} else { return false; }
				}
			
			case yDistance == 0 && xDistance != 0:
				switch(xy){
					case xDistance > 0:
						if(xDistance <= 10){
							return true;
						} else { return false; }
						
					case xDistance < 0:
						if(xDistance >= -10){
							return true;
						} else { return false; }
				}
			
			case xDistance != 0 && yDistance != 0:
				switch(xy){
					case xDistance > 0 && yDistance > 0:
						if(xDistance <= 10 || yDistance <= 12){
							return true;
						} else { return false; }
						
					case xDistance > 0 && yDistance < 0:
						if(xDistance <= 10 || yDistance >= -12){
							return true;
						} else { return false; }

					case xDistance < 0 && yDistance > 0:
						if(xDistance >= -10 || yDistance <= 12){
							return true;
						} else { return false; }
					
					case xDistance < 0 && yDistance < 0:
						if(xDistance >= -10 || yDistance >= -12){
							return true;
						} else { return false; }
				}
			
			case xDistance == 0 && yDistance == 0:
				return true;
		}
	};
	// Fix for squadrons only checking other squadrons: Have the every scout in the FoV of the moving ship check for collision
	// Methods (private) ----------------------------------------------------------------!>
	
	source.scouts.push(exports);
	
	return exports;
}