function Projectile(source, target){
	var exports = {};
	
	// Fields ---------------------------------------------------------------------------->
	exports.source = source;
	exports.target = target;
	
	exports.projectileField = canvas[1].getContext('2d');
	
	exports.speed = 5; // Speed of projectile, constant
	exports.theta = source.angleTo(target); // Angle that the projectile points towards
	exports.dx = 5 * Math.cos(exports.theta); // Change in x coordinate, scaled by angle and speed
	exports.dy = -5 * Math.sin(exports.theta); // Change in y coordinate, scaled by angle and speed
	exports.index = source.shotsFired; // Array index of this projectile
	
	exports.location = [source.xCenter, source.yCenter]; // Starting location is center of source
	exports.targetLocation = [target.xCenter, target.yCenter]; // Starting location of target
	exports.distance = source.distanceTo(target); // Distance to target
	exports.distanceTraveled = 0; // Distance covered by projectile
	// Fields ---------------------------------------------------------------------------!>
	
	
	// Methods (private) ----------------------------------------------------------------->
	exports.shoot = function(){
		drawMissile(exports.source, exports.location[0], exports.location[1], exports.theta);
		
		if(exports.distanceTraveled > 0){
			exports.projectileMove;
		};
	};
	
	exports.projectileMove = setInterval(
		function(){
			canvas[1].ctx.clearRect(exports.location[0] - 5, exports.location[1] - 5, exports.location[0] + 5, exports.location[1] + 5);
			
			exports.location[0] = exports.location[0] + exports.dx;
			exports.location[1] = exports.location[1] + exports.dy;
			exports.distanceTraveled = exports.distanceTraveled + exports.speed;
			
			drawMissile(exports.source, exports.location[0], exports.location[1], exports.theta);
			
			exports.relocate();
			
			if(exports.distanceTraveled > exports.distance){
				clearInterval(exports.projectileMove);
				canvas[1].ctx.clearRect(exports.location[0] - 5, exports.location[1] - 5, exports.location[0] + 5, exports.location[1] + 5);
				
				// Deal damage if projectile ends up in hitbox (add if statement here)
				exports.target.takeDamage(exports.source);
			};
			
			/*
			if(allSquadrons[exports.target.player.playerIndex][allSquadrons]){ // Enemy squadron has already been defeated
				clearInterval(exports.projectileMove);
				canvas[1].ctx.clearRect(exports.location[0] - 5, exports.location[1] - 5, exports.location[0] + 5, exports.location[1] + 5);
			};*/
		},
		500
	);
	
	exports.relocate = function(){ // Recalculates distance to target
		exports.distance = source.distanceTo(target);
	}
	// Methods (private) ----------------------------------------------------------------!>
	
	source.projectiles.push(exports);
	
	return exports;
}