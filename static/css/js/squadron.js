function Squadron(xStart, yStart, numShips, player, isMothership, isSecond, xSpeed, ySpeed){ // Base class for creating squadrons
	var exports = {};
	
	// Fields ---------------------------------------------------------------------------->
	var xCenterOriginal = xStart; // Integer, px value, original abscissa, public
	var yCenterOriginal = yStart; // Integer, px value, original ordinate, public
	
	exports.xCenter = xStart; // Current abscissa
	exports.yCenter = yStart; // Current ordinate
	
	exports.player = player; // Player that owns squadron
	
	exports.rotated = isSecond; // Tells the program to use the second form of draw to render player 2 ships
	
	exports.sightRange = 50; // Visible area
	exports.atkRange = exports.sightRange * 1.5; // Weapon range
	
	exports.numShips = numShips;
	exports.squadronHP = shipHP * exports.numShips; // Integer , total possible HP, private
	exports.squadronAtk = shipAtk * exports.numShips; // Integer , total possible attack power, private
	exports.damageTaken = 0; // Integer, total damage sustained, private
	
	exports.isMothership = isMothership; // Boolean flag for the mothership, private
	
	// Movement speeds, change on implementation
	exports.dx = xSpeed;
	exports.dy = ySpeed;
	
	// Mothership can deploy scouts to expand FoV
	exports.numScouts = 5;
	exports.scouts = [];
	
	// Ships can fire projectiles
	exports.projectiles = [];
	exports.shotsFired = 0;
	// Fields ---------------------------------------------------------------------------!>
	
	
	// Methods --------------------------------------------------------------------------->
	exports.drawSquadron = function(){ // Puts squadron on the field
		if(exports.rotated){
			squadronSprite2(exports.xCenter, exports.yCenter, exports.player.teamColor);
		} else {
			squadronSprite1(exports.xCenter, exports.yCenter, exports.player.teamColor);
		}
	};
	
	exports.drawFoV = function(){ // Delimits squadron's FoV
		canvas[0].ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		FoV(exports.xCenter, exports.yCenter, exports.sightRange);
	};
	
	exports.recallSquadron = function(deployed){ // Assimilates a deployed squadron into this one
		exports.numShips += deployed.numShips;
		exports.squadronHP += deployed.squadronHP;
		exports.damageTaken += deployed.damageTaken;
		deployed.eraseSquadron();
		return true; // By returning true, it allows the attack to terminate in the outside loop
	};
	
	exports.eraseSquadron = function(){ // Take the squadron off the map; takes it out of array
		var toDelete = allSquadrons[player.playerIndex].indexOf(exports);
		allSquadrons[player.playerIndex][toDelete] = 0;
	};
	
	exports.distanceTo = function(target){
		return Math.sqrt(Math.pow((target.xCenter - exports.xCenter), 2) + Math.pow((target.yCenter - exports.yCenter), 2));
	};
	
	exports.angleTo = function(target){
		return Math.atan( -(target.yCenter - exports.yCenter) / (target.xCenter - exports.xCenter) );
	};
	
	exports.testMove = function(){ // Test object's movements (not for actual use)
		exports.xCenter += exports.dx;
		exports.yCenter += exports.dy;
	};
	
	exports.moveInSpace = function(xTarget, yTarget){ // Move to a target point on the map
		for(var i = 0; i < allSquadrons[player.playerIndex].length; i++){ // Check for squadron to squadron collisions; stop the squadron if there is one
			if(i != allSquadrons[player.playerIndex].indexOf(exports) && exports.targetIsVisible(allSquadrons[i]) && exports.collisionTest(allSquadrons[i])){
				exports.dx = 0;
				exports.dy = 0;
				return;
			}
			
			for(var j = 0; j < allSquadrons[player.playerIndex][i].scouts.length; i++){
				if(exports.targetIsVisible(allSquadrons[player.playerIndex][i].scouts[j]) && allSquadrons[player.playerIndex][i].scouts[j].collisionTest(exports)){
					exports.dx = 0;
					exports.dy = 0;
					return;
				}
			}
		}
		
		// Perform the movement (runs if no collision)
		exports.xCenter += exports.dx;
		exports.yCenter += exports.dy;
	};
	
	exports.incShips = function(source, inc){ // Add ships from a source to the squadron
		if(source.squadronHP - inc * shipHP <= 0 || source.player.playerID != exports.player.playerID){ // Not doable
			console.log("You can't do that!");
		} else {
			source.ships -= inc;
			source.squadronHP -= inc * shipHP;
			this.ships += inc;
			this.squadronHP += inc * shipHP;
		}
	};
	
	exports.projectileTest = function(target){
		if(target != 0){
			var p = new Projectile(exports, target);
			exports.projectiles[exports.projectiles.indexOf(p)].shoot();
		} else {
			console.log("Target has already been eliminated.");
		}
	};
	
	exports.openFire = function(target){ // Attack target enemy ship
		if(target == 0){ return false; } // By returning false, it allows the attack to terminate in the outside loop
		if(exports.targetIsVisible(target) == false){ return false; }
		
		var distance = exports.distanceTo(target);
		
		if(distance <= exports.atkRange && target.player.playerID != exports.player.playerID){ // Insert attack loop here
			return target.takeDamage(exports);
		} else {
			return false; // Out of range... end attack loop
		}
	};
	
	exports.takeDamage = function(source){ // Take battle damage from enemy ship
		var incoming = source.squadronAtk;
		
		// Scale down using crowdedness factor
		var crowdedness = .5 + (source.numShips / 750) / 2;
		if(crowdedness >= 1){ crowdedness = 1; }
		
		var surprise = (Math.floor(Math.random()*11) - 10) / 10 // Surprise factor, 10% chance critical hit and 10% chance damage decrease
		
		if(surprise > -.2){ 
			exports.damageTaken += incoming * crowdedness * ( 1 + surprise );
		} else {
			exports.damageTaken += incoming * crowdedness;
		}
		
		console.log(surprise)
		console.log(incoming * crowdedness);
		console.log(crowdedness);
		console.log(exports.damageTaken);
		
		var casualties = Math.floor(incoming * crowdedness / shipHP);
		exports.numShips -= casualties;
		exports.squadronHP = shipHP * exports.numShips;
		
		if(exports.numShips <= 0){
			exports.eraseSquadron();
		}
		
		return true; // By returning true, it allows the ship to attempt to continue attacking, so long as the target remains in range
	};
	
	exports.deployScout = function(xTarget, yTarget){ // Mothership only; sets scouts to expand FoV
		if(isMothership == true){
			var newScout = new Scout(xTarget, yTarget, exports);
			exports.numScouts--;
			
			return true;
		} else{ return false; }
	};
	
	exports.showDataBox = function(){ // Shows summary data for the squadron in a floating dialog box
		
	};
	
	exports.collisionTest = function(target){ // Check if this squadron will collide with another squadron (call only on moving squadrons)
		var xDistance = target.xCenter - exports.xCenter;
		var yDistance = exports.yCenter - target.yCenter;

		var quadrant = true;
		var xy = true;
		
		switch(quadrant){
			case xDistance == 0 && yDistance != 0: // Lies on y-axis
				switch(xy){
					case yDistance > 0: // Positive y
						if(yDistance <= 20){ // Distances are doubled because 2 halves of hitboxes are interacting
							return true;
						} else { return false; }
						
					case yDistance < 0: // Negative y
						if(yDistance >= -20){// Two box halves to the below
							return true;
						} else { return false; }
				}
			
			case yDistance == 0 && xDistance != 0: // Lies on x-axis
				switch(xy){
					case xDistance > 0: // Positive x
						if(xDistance <= 16){ // Two box halves to the right
							return true;
						} else { return false; }
						
					case xDistance < 0: // Negative x
						if(xDistance >= -16){ // Two box halves to the left
							return true;
						} else { return false; }
				}
			
			case xDistance != 0 && yDistance != 0: // Somewhere in 2d space
				switch(xy){
					case xDistance > 0 && yDistance > 0: // Q1
						if(xDistance <= 16 || yDistance <= 20){ // Need to check both x and y of hitbox overlap
							return true;
						} else { return false; }

					case xDistance < 0 && yDistance > 0: // Q2
						if(xDistance >= -16 || yDistance <= 20){
							return true;
						} else { return false; }
					
					case xDistance < 0 && yDistance < 0: // Q3
						if(xDistance >= -16 || yDistance >= -20){
							return true;
						} else { return false; }
						
					case xDistance > 0 && yDistance < 0: // Q4
						if(xDistance <= 16 || yDistance >= -20){
							return true;
						} else { return false; }
				}
			
			case xDistance == 0 && yDistance == 0: // At origin
				return true;
		}
	};
	
	exports.selectSquadron = function(xCoords, yCoords, allSquadrons){
		
	};
	
	// Loop through the array of targets outside the method
	exports.targetIsVisible = function(target){ // Check to see if target squadron or scout falls in target squadron's FoV
		var distance = exports.distanceTo(target);
				
		if(distance < exports.sightRange){
			return true;
		}
		
		return false;
	};
	
	// Methods (private) ----------------------------------------------------------------!>
	
	allSquadrons[player.playerIndex].push(exports);
	
	return exports;
}